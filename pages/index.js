import React, { useState, useEffect } from 'react';
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
				<nav className='flex items-center justify-between px-6 py-4 bg-dark-light'>
					<div className='flex items-center space-x-2'>
						<motion.h1
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className='text-2xl font-bold text-primary'>
							SlotBlitz
						</motion.h1>
					</div>

					<div className='flex items-center space-x-4'>
						<div className='relative'>
							<input
								type='text'
								placeholder='Search slots...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='px-4 py-2 pl-10 bg-dark rounded-full text-white focus:outline-none focus:ring-2 focus:ring-primary'
							/>
							<FaSearch className='absolute left-3 top-3 text-gray-400' />
						</div>
						<FaBell className='text-gray-400 hover:text-primary cursor-pointer' />
						<FaUser className='text-gray-400 hover:text-primary cursor-pointer' />
					</div>
				</nav>

				{/* Hero Section */}

				<motion.section
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='px-6 py-12'
					id={styles['home-page']}>
					<div className='max-w-4xl mx-auto text-center'>
						<h2 className='text-5xl font-bold text-white mb-6'>
							Discover the Best Online Slots
						</h2>
						<p className='text-xl text-gray-400 mb-8'>
							Expert reviews, free demos, and detailed information about the
							latest slot games
						</p>
					</div>
				</motion.section>

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
								<div className='bg-dark h-48 mb-4 rounded-lg flex items-center justify-center'>
									<Image
										src={game.image}
										alt={game.title}
										width={400}
										height={200}
										className='w-full h-full object-cover'
									/>
								</div>
								<h4 className='text-xl font-bold text-white mb-2'>
									{game.title}
								</h4>
								<p className='text-gray-400'>{game.description}</p>
								<Link
									href={`/games/${game.slug}`}
									className='mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-opacity-80 transition-colors inline-block'>
									View Details
								</Link>
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
							<motion.div
								key={review.title}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className='bg-dark p-6 rounded-xl'>
								<div className='flex items-start space-x-4'>
									<div className='bg-dark-light w-24 h-24 rounded-lg flex items-center justify-center'>
										<span className='text-gray-600 text-sm text-center px-2'>
											{review.title}
										</span>
									</div>
									<div>
										<h4 className='text-xl font-bold text-white mb-2'>
											{review.title}
										</h4>
										<div className='flex items-center mb-2'>
											{[...Array(5)].map((_, i) => (
												<span key={i} className='text-yellow-500'>
													★
												</span>
											))}
										</div>
										<p className='text-gray-400'>{review.description}</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</section>
			</div>
		</>
	);
};

export default Home;
