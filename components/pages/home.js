"use client";
import React from "react";
import { LargeImageCard } from "../slot/largeImageCard";
import { SmallImageCard } from "../slot/smallImageCard";
import { FaCrown } from "react-icons/fa";
import HeroSection from "../siteComponets/Hero/hero";
import EmblaCarousel from "../carousel/carousel";
import Link from "next/link";
import Footer from "../siteComponets/footer/Footer";
import BonusCalculatorTeaser from "../tools/BonusCalculatorTeaser";

const hero = require("../../assets/mainbg.png");

const Home = ({ slotDataProps, reviewDataProps }) => {
  const featuredGroup = slotDataProps.slice(0, 9);
  const topRatedGroup = slotDataProps.slice(0, 9);

  return (
    <>
      <div className="min-h-screen bg-dark">
        {/* Hero Section */}
        <HeroSection heroImageSrc={hero} />

        {/* Featured Games */}
        <section className="px-1 py-3 items-center">
          <div className="mx-auto max-w-7xl border border-white/[0.06]  rounded-3xl p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-500">
                <FaCrown className="h-5 w-5" />
                <h2 className="text-xl font-bold text-white tracking-wide">
                  Featured Games
                </h2>
              </div>
              <Link
                href="/slots"
                className="text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              >
                View all games
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-3">
              {featuredGroup.map((game, index) => (
                <LargeImageCard key={index} game={game} />
              ))}
            </div>
          </div>
        </section>
        {/* Bonus Calculator */}
        <section className="px-1 py-3 items-center">
          <div className="mx-auto max-w-7xl   rounded-3xl">
          <BonusCalculatorTeaser/>
          </div>
          
        </section>

        {/* toprated section */}
        <section className="px-6 py-3">
          <div className="mx-auto max-w-7xl border border-white/[0.06]  rounded-3xl p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-500">
                <FaCrown className="h-5 w-5" />
                <h2 className="text-xl font-bold text-white tracking-wide">
                  Top Games
                </h2>
              </div>
              <Link
                href="/slots"
                className="text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              >
                View all games
              </Link>
            </div>

            <div>
              <EmblaCarousel slides={topRatedGroup} options={{ loop: true }} />
            </div>
          </div>
        </section>

        {/* Latest Reviews */}
        <section className="px-1 py-3 items-center">
          <div className="mx-auto max-w-7xl border border-white/[0.06] rounded-3xl p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-500">
                <FaCrown className="h-5 w-5" />
                <h2 className="text-xl font-bold text-white tracking-wide">
                  Expert Reviews
                </h2>
              </div>
              <Link
                href="/slots"
                className="text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              >
                View all games
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2">
              {reviewDataProps.map((game) => (
                <SmallImageCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
