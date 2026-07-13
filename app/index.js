'use client';

import React, { useState, useEffect } from 'react';
import HomeNav from '../components/ui/nav/nav';
import HeroBanner from '../components/ui/heroBanner';
import SlotCard from '../components/slot/slotCard';
import ReviewCard from '../components/reviews/reviewCard';
import Image from 'next/image';
import styles from '../styles/localStyle.module.css';
import { motion } from 'framer-motion';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';
import Head from 'next/head';
import Link from 'next/link';
import diamondsImage from '../assets/Diamonds.jpg';
import gatesOlympusImage from '../assets/40diomond.png';
import jackpotWorldImage from '../assets/jackpotWorld.png';

const games = [
	{
		slug: 'mega-fortune-dreams',
		title: 'Diamonds',
		image: diamondsImage,
		description:
			'Experience the thrill of progressive jackpots and luxurious symbols in this NetEnt classic.',
	},
	{
		slug: 'starburst',
		title: '40 Diamonds Plus',
		image: gatesOlympusImage,
		description:
			'A dazzling journey through space with expanding wilds and respins.',
	},
	{
		slug: 'gonzos-quest',
		title: 'Jackpot World',
		image: jackpotWorldImage,
		description:
			'Join Gonzo on his quest for El Dorado with avalanche multipliers.',
	},
];

const Home = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const filteredGames = games.filter((game) =>
		game.title.toLowerCase().includes(searchTerm.toLowerCase()),
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
								key={game.slug}
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

				{/* Latest Reviews */}
				<section className='px-6 py-12 bg-dark-light'>
					<h3 className='text-2xl font-bold text-white mb-8'>Latest Reviews</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{[
							{
								title: 'Starburst XXXtreme',
								description:
									'A high-volatility upgrade to the classic Starburst with massive multipliers...',
							},
							{
								title: 'Book of Dead',
								description:
									'Join Rich Wilde on an Egyptian adventure with expanding symbols...',
							},
						].map((review, index) => (
							<ReviewCard review={review} />
						))}
					</div>
				</section>
			</div>
		</>
	);
};

export default Home;
