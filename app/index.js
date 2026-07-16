'use client';
import React, { useState, useEffect } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import HomeNav from '../components/ui/nav/nav';
import HeroBanner from '../components/ui/heroBanner';
import SlotCard from '../components/slot/slotCard';
import ReviewCard from '../components/reviews/reviewCard';
import DisplayGroups from '../lib/displayGroups';
import EmblaCarousel from '../components/carousel/carousel';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';

const Home = ({ slodataProps }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [mounted, setMounted] = useState(false);
	const featuredGroup = new DisplayGroups(slodataProps, 6).featuredGroup();
	const OPTIONS = { loop: true };
	const SLIDE_COUNT = 5;
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

	useEffect(() => {
		setMounted(true);
		console.log(featuredGroup.length);
	}, []);

	const filteredGames = featuredGroup.filter((game) =>
		game.gameName.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	if (!mounted) {
		return null;
	}

	return (
		<>
			<Head>
				<title>Slot Reviews - Best Online Slots</title>
				<meta
					name='description'
					content='Discover and review the best online slot games'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='min-h-screen bg-dark'>
				{/* Navigation */}
				<HomeNav />

				{/* Hero Section */}
				<HeroBanner />

				{/* Featured Games */}
				<section className='px-6 py-12'>
					<h3 className='text-2xl font-bold text-white mb-8'>Featured Games</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredGames.map((game, index) => (
							<motion.div
								key={game.id}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								whileHover={{ y: -10 }}
								className='bg-dark-light p-4 rounded-2xl'>
								{/* slot card */}
								<SlotCard game={game} />
							</motion.div>
						))}
						{filteredGames.length === 0 && (
							<div className='col-span-full text-center text-gray-400 py-12'>
								No games found matching "{searchTerm}"
							</div>
						)}
					</div>
				</section>

				{/* toprated section */}
				<section className='px-6 py-12'>
					<h3 className='text-2xl font-bold text-white mb-8'>
						Top Rated Games
					</h3>
					<div>
						<EmblaCarousel slides={SLIDES} options={OPTIONS} />
					</div>
				</section>

				{/* Latest Reviews */}
				<section className='px-6 py-12 bg-dark-light'>
					<h3 className='text-2xl font-bold text-white mb-8'>Latest Reviews</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{[
							{
								title: 'Starburst XXXtreme',
								key: 'starburst-xxx',
								description:
									'A high-volatility upgrade to the classic Starburst with massive multipliers...',
							},
							{
								title: 'Book of Dead',
								key: 'book-of-dead',
								description:
									'Join Rich Wilde on an Egyptian adventure with expanding symbols...',
							},
						].map((review, index) => (
							<ReviewCard review={review} key={review.key} />
						))}
					</div>
				</section>
			</div>
		</>
	);
};

export default Home;
