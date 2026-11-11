"use client";

import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaArrowRight, FaSlidersH, FaStar, FaUser } from "react-icons/fa";
import { gameConfig } from "../../app/config/game";
import FliudHeroSection from "../siteComponets/Hero/fluidHero";
import Footer from "../siteComponets/footer/Footer";
import Loader from "../siteComponets/loader/Loader";
import ReviewIndexCard from "../reviews/ReviewIndexCard";

const REVIEWS_PER_PAGE = 10;
const FALLBACK_IMAGE = "/images/newsFallback.jpg";

interface Review {
  reviewSlug: string;
  title?: string | null;
  provider?: string | null;
  rating?: number | null;
  imageUrl?: string | null;
  type?: string | null;
  author?: string | null;
  description?: string | null;
}

interface ReviewsResponse {
  reviews: Review[];
  total: number;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  const totalPages = Math.max(1, Math.ceil(total / REVIEWS_PER_PAGE));

  const loadReviews = useCallback(async (page: number) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/reviews?page=${page}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to fetch reviews.");
      }

      const reviewsResponse = result as ReviewsResponse;
      setReviews(reviewsResponse.reviews);
      setTotal(reviewsResponse.total);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Unable to fetch reviews.",
      );
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    void loadReviews(1);
  }, [loadReviews]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    void loadReviews(page);
    window.scrollTo(0, 0);
  };

  const pageItems: Array<number | "start-ellipsis" | "end-ellipsis"> = (() => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, "end-ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "start-ellipsis",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "start-ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "end-ellipsis",
      totalPages,
    ];
  })();

  return (
    <>
      <Head>
        <title>Game Reviews - SlotBlitz</title>
        <meta
          name="description"
          content="Browse expert reviews of online slot games."
        />
      </Head>
      <div className="min-h-screen bg-dark">
        <FliudHeroSection heroProps={gameConfig.fluideHeroProps.reviews} />

        <section className="px-1 py-3">
          <div className="mx-auto max-w-7xl rounded-3xl border border-white/[0.06] p-6">
            <div className="mb-4 flex items-center justify-between border-b border-white/[0.08] px-1 pb-5">
              <p className="flex items-center gap-3 text-base font-bold tracking-wide text-primary">
                <FaStar aria-hidden="true" className="h-6 w-6" />
                Reviews shown: {reviews.length} of {total}
              </p>
              <div className="hidden items-center gap-3 rounded-full border border-white/[0.14] px-4 py-3 text-sm font-medium text-white sm:flex">
                <FaSlidersH aria-hidden="true" className="h-4 w-4" />
                <span>Sort by: Most Recent</span>
                <span aria-hidden="true" className="text-white/70">
                  ▼
                </span>
              </div>
            </div>

            {loading ? (
              <Loader />
            ) : error ? (
              <p role="alert" className="py-8 text-center text-red-400">
                {error}
              </p>
            ) : reviews.length === 0 ? (
              <p className="py-8 text-center text-white/60">
                No reviews are available yet.
              </p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review, index) => {
                  return (
                    <ReviewIndexCard
                      key={`${review.reviewSlug}-${index}`}
                      review={review}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination-shell">
              <div className="pagination-mobile flex md:hidden">
                <button
                  type="button"
                  className="pagination-mobile__button"
                  disabled={currentPage === 1 || loading}
                  onClick={() => goToPage(currentPage - 1)}
                >
                  &lt; Prev
                </button>
                <div className="pagination-mobile__meta">
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  type="button"
                  className="pagination-mobile__button"
                  disabled={currentPage >= totalPages || loading}
                  onClick={() => goToPage(currentPage + 1)}
                >
                  Next &gt;
                </button>
              </div>

              {mounted && (
                <div className="pagination hidden md:flex">
                  <button
                    type="button"
                    className="pagination__nav pagination__nav--prev"
                    disabled={currentPage === 1 || loading}
                    onClick={() => goToPage(currentPage - 1)}
                  >
                    <span className="pagination__nav-link">&lt; previous</span>
                  </button>

                  {pageItems.map((item) =>
                    typeof item === "number" ? (
                      <button
                        key={item}
                        type="button"
                        aria-current={currentPage === item ? "page" : undefined}
                        className={`pagination__item ${
                          currentPage === item ? "pagination__item--active" : ""
                        }`}
                        disabled={loading}
                        onClick={() => goToPage(item)}
                      >
                        <span className="pagination__link">{item}</span>
                      </button>
                    ) : (
                      <span
                        key={item}
                        className="pagination__break"
                        aria-hidden="true"
                      >
                        ...
                      </span>
                    ),
                  )}

                  <button
                    type="button"
                    className="pagination__nav pagination__nav--next"
                    disabled={currentPage === totalPages || loading}
                    onClick={() => goToPage(currentPage + 1)}
                  >
                    <span className="pagination__nav-link">next &gt;</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}
