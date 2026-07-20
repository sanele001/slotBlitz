'use client';
import React, { useState, useEffect } from 'react';
import DisplayGroups from '../../lib/displayGroups';
import { dummyData } from '../../dummydata';
import { LargeImageCard } from '../slot/largeImageCard';
import FliudHeroSection from '../siteComponets/Hero/fluidHero';
import FilterBar from '../siteComponets/filter/FilterBar';
import Head from 'next/head';
import Link from 'next/link';

const test = JSON.parse(JSON.stringify(dummyData));

const Slots = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [mounted, setMounted] = useState(false);
	const featuredGroup = new DisplayGroups(test, 10).featuredGroup();

	const filteredGames = featuredGroup.filter((game) =>
		game.gameName.toLowerCase().includes(searchTerm.toLowerCase()),
	);
	return (
		<>
			<Head>
				<title>Slot Reviews - Best Online Slots - more than 6000 slots</title>
				<meta
					name='description'
					content='Discover and review the best online slot games'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{/* main holder */}
			<div className='min-h-screen bg-dark'>
				<FliudHeroSection />
				<FilterBar />
				<section className='px-1 py-3 items-center'>
					<div className='mx-auto max-w-7xl border border-white/[0.06]  rounded-3xl p-6'>
						{/* Header */}
						<div className='mb-6 flex items-center justify-between'>
							<div className='flex items-center gap-2 text-red'>
								<p className='text-sm font-light text-red-600 tracking-wide'>
									1,002 games found
								</p>
							</div>
							<Link
								href='/games'
								className='text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1'>
								View all games
							</Link>
						</div>

						<div className='grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3'>
							{filteredGames.map((game) => (
								<LargeImageCard key={game.gameId} game={game} />
							))}
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default Slots;
