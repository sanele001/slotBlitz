'use client';
import React, { useState, useEffect } from 'react';
import { LargeImageCard } from '../components/slot/largeImageCard';
import { SmallImageCard } from '../components/slot/smallImageCard';
import { FaCrown } from 'react-icons/fa';
import HeroSection from '../components/siteComponets/Hero/hero';
import DisplayGroups from '../lib/displayGroups';
import EmblaCarousel from '../components/carousel/carousel';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/siteComponets/footer/Footer';
import searchtest from './hooks/games/useDebounce';

const hero = require('../assets/mainbg.png');

const Home = ({ slotDataProps, reviewDataProps }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [mounted, setMounted] = useState(false);
	const featuredGroup = new DisplayGroups(slotDataProps, 9).featuredGroup();
	const topRatedGroup = new DisplayGroups(slotDataProps, 9).topGamesGroup();

	const filteredGames = featuredGroup.filter((game) =>
		game.gameName.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	useEffect(() => {
		console.log('dfdfdfdfdfdffdf');
	}, [searchtest]);

	return (
		<>
			<Head>
				<title>Slot Reviews - Best Online Slots-casino</title>
				<meta
					name='description'
					content='Discover and review the best online slot games'
				/>
				<meta
					name='google-site-verification'
					content='Ghaq_wRV7wkV7dc9rkLSnRLGoKQapLYBTLGiEjZ3FUY'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='min-h-screen bg-dark'>
				{/* Hero Section */}
				<HeroSection heroImageSrc={hero} />

				{/* Featured Games */}
				<section className='px-1 py-3 items-center'>
					<div className='mx-auto max-w-7xl border border-white/[0.06]  rounded-3xl p-6'>
						{/* Header */}
						<div className='mb-6 flex items-center justify-between'>
							<div className='flex items-center gap-2 text-amber-500'>
								<FaCrown className='h-5 w-5' />
								<h2 className='text-xl font-bold text-white tracking-wide'>
									Featured Games
								</h2>
							</div>
							<Link
								href='/slots'
								className='text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1'>
								View all games
							</Link>
						</div>

						<div className='grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-3'>
							{filteredGames.map((game, index) => (
								<LargeImageCard key={index} game={game} />
							))}
						</div>
					</div>
				</section>

				{/* toprated section */}
				<section className='px-6 py-3'>
					<div className='mx-auto max-w-7xl border border-white/[0.06]  rounded-3xl p-6'>
						{/* Header */}
						<div className='mb-6 flex items-center justify-between'>
							<div className='flex items-center gap-2 text-amber-500'>
								<FaCrown className='h-5 w-5' />
								<h2 className='text-xl font-bold text-white tracking-wide'>
									Top Games
								</h2>
							</div>
							<Link
								href='/slots'
								className='text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1'>
								View all games
							</Link>
						</div>

						<div>
							<EmblaCarousel slides={topRatedGroup} options={{ loop: true }} />
						</div>
					</div>
				</section>

				{/* Latest Reviews */}
				<section className='px-1 py-3 items-center'>
					<div className='mx-auto max-w-7xl border border-white/[0.06] rounded-3xl p-6'>
						{/* Header */}
						<div className='mb-6 flex items-center justify-between'>
							<div className='flex items-center gap-2 text-amber-500'>
								<FaCrown className='h-5 w-5' />
								<h2 className='text-xl font-bold text-white tracking-wide'>
									Expert Reviews
								</h2>
							</div>
							<Link
								href='/slots'
								className='text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1'>
								View all games
							</Link>
						</div>

						<div className='grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2'>
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
