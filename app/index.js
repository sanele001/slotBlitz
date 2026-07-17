'use client';
import React, { useState, useEffect } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { LargeImageCard } from '../components/slot/largeImageCard';
import { SmallImageCard } from '../components/slot/smallImageCard';
import { FaCrown } from 'react-icons/fa';
import HomeNav from '../components/ui/nav/nav';
import HeroBanner from '../components/ui/heroBanner';
import SlotCard from '../components/slot/slotCard';
import ReviewCard from '../components/reviews/reviewCard';
import DisplayGroups from '../lib/displayGroups';
import EmblaCarousel from '../components/carousel/carousel';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';

/////////////////////////////////////////////////////////////

const MOCK_SLOTS = [
	{
		id: '1',
		title: 'Mega Fortune Dreams',
		provider: 'NetEnt',
		rating: 4.6,
		imageUrl: '/images/slots/mega-fortune.jpg',
		slug: 'mega-fortune-dreams',
		badge: { text: 'HOT', type: 'hot' },
	},
	{
		id: '1',
		title: 'Mega Fortune Dreams',
		provider: 'NetEnt',
		rating: 4.6,
		imageUrl: '/images/slots/mega-fortune.jpg',
		slug: 'mega-fortune-dreams',
		badge: { text: 'HOT', type: 'hot' },
	},
	{
		id: '2',
		title: 'Starburst',
		provider: 'NetEnt',
		rating: 4.8,
		imageUrl: '/images/slots/starburst.jpg',
		slug: 'starburst',
		badge: { text: 'NEW', type: 'new' },
	},
	{
		id: '3',
		title: "Gonzo's Quest",
		provider: 'NetEnt',
		rating: 4.7,
		imageUrl: '/images/slots/gonzos-quest.jpg',
		slug: 'gonzos-quest',
		badge: { text: 'FEATURED', type: 'featured' },
	},
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Home = ({ slodataProps }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [mounted, setMounted] = useState(false);
	const featuredGroup = new DisplayGroups(slodataProps, 6).featuredGroup();
	const topRatedGroup = new DisplayGroups(slodataProps, 9).topGamesGroup();

	useEffect(() => {
		setMounted(true);
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
				<section className='px-1 py-3 items-center'>
					{/* <h3 className='text-2xl font-bold text-white mb-8'>Featured Games</h3>
					<div className='grid grid-cols-3 gap-2 bg-dark w-[80%] m-auto'>
						{filteredGames.map((game, index) => (
							<SlotCard2 game={mygame} />
						))}
						{filteredGames.length === 0 && (
							<div className='col-span-full text-center text-gray-400 py-12'>
								No games found matching "{searchTerm}"
							</div>
						)}
					</div> */}
					<div className='mx-auto max-w-7xl border border-white/[0.06] bg-[#090710] rounded-3xl p-6'>
						{/* Header */}
						<div className='mb-6 flex items-center justify-between'>
							<div className='flex items-center gap-2 text-amber-500'>
								<FaCrown className='h-5 w-5' />
								<h2 className='text-xl font-bold text-white tracking-wide'>
									Featured Games
								</h2>
							</div>
							<Link
								href='/games'
								className='text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1'>
								View all games
							</Link>
						</div>

						<div className='grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3'>
							{MOCK_SLOTS.map((game) => (
								<LargeImageCard key={game.id} game={game} />
							))}
						</div>
					</div>
				</section>

				{/* toprated section */}
				<section className='px-6 py-3'>
					<div className='mx-auto max-w-7xl border border-white/[0.06] bg-[#090710] rounded-3xl p-6'>
						{/* Header */}
						<div className='mb-6 flex items-center justify-between'>
							<div className='flex items-center gap-2 text-amber-500'>
								<FaCrown className='h-5 w-5' />
								<h2 className='text-xl font-bold text-white tracking-wide'>
									Top Ranking Games
								</h2>
							</div>
							<Link
								href='/games'
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
					<div className='mx-auto max-w-7xl border border-white/[0.06] bg-[#090710] rounded-3xl p-6'>
						{/* Header */}
						<div className='mb-6 flex items-center justify-between'>
							<div className='flex items-center gap-2 text-amber-500'>
								<FaCrown className='h-5 w-5' />
								<h2 className='text-xl font-bold text-white tracking-wide'>
									Featured Games
								</h2>
							</div>
							<Link
								href='/games'
								className='text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1'>
								View all games
							</Link>
						</div>

						<div className='grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2'>
							{MOCK_SLOTS.map((game) => (
								<SmallImageCard />
							))}
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default Home;
