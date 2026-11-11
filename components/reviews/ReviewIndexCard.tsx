import Link from "next/link";
import { FaStar, FaUserCircle } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi2";

/**
 * ReviewCard
 * ----------
 * Row-style review card for a reviews listing page. Image sits to the
 * left of the content on desktop; on mobile the image stacks on top
 * with the text underneath.
 */

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

const ACCENT = "#fb226b";
const FALLBACK_IMAGE = "/images/newsFallback.jpg";

export default function ReviewIndexCard({ review }: { review: Review }) {
  const {
    reviewSlug,
    title,
    provider,
    rating,
    imageUrl,
    type,
    author,
    description,
  } = review;
  const thumbnail = imageUrl?.trim() || FALLBACK_IMAGE;

  return (
    <Link
      href={`/review/${encodeURIComponent(reviewSlug)}`}
      className="group flex flex-col sm:flex-row items-stretch gap-4 sm:gap-6 rounded-2xl border border-white/10  p-4 hover:border-white/20 transition-colors"
    >
      {/* Thumbnail — on top on mobile, left column from sm up */}
      <div className="relative w-full sm:w-44 h-40 sm:h-28 shrink-0 rounded-xl overflow-hidden">
        <img
          src={thumbnail}
          alt={title || "Game thumbnail"}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {type && (
            <span
              className="text-[11px] font-bold uppercase tracking-wide rounded-full px-3 py-1"
              style={{
                color: ACCENT,
                backgroundColor: "rgba(251,34,107,0.12)",
              }}
            >
              {type}
            </span>
          )}
          {provider && (
            <span className="text-[11px] font-bold uppercase tracking-wide rounded-full px-3 py-1 bg-white/5 text-white/50">
              {provider}
            </span>
          )}
        </div>

        <h3 className="mt-2 text-lg sm:text-xl font-extrabold text-white leading-snug">
          {title || "Untitled Game"}
        </h3>

        <div className="mt-1 flex items-center gap-4 flex-wrap text-sm">
          {typeof rating === "number" && (
            <span className="flex items-center gap-1.5 text-white font-semibold">
              <FaStar className="w-3.5 h-3.5" style={{ color: "#f5b400" }} />
              {rating.toFixed(1)} / 5
            </span>
          )}
          {author && (
            <span className="flex items-center gap-1.5 text-white/50">
              <FaUserCircle className="w-3.5 h-3.5" />
              Reviewed by {author}
            </span>
          )}
        </div>

        {description && (
          <p className="mt-2 text-sm text-white/50 leading-relaxed line-clamp-2 sm:line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* CTA */}
      <div className="flex sm:items-center shrink-0">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors group-hover:bg-[rgba(251,34,107,0.1)]"
          style={{ color: ACCENT, borderColor: "rgba(251,34,107,0.4)" }}
        >
          Read Review
          <HiArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
