'use client';
import React, { useEffect, useState } from 'react';
import DisplayGroups from '../../lib/displayGroups';
import Footer from '../siteComponets/footer/Footer';
import Loader from '../siteComponets/loader/Loader';
import { useFilterSlots } from '../../app/hooks/games/useFilter';
import { LargeImageCard } from '../slot/largeImageCard';
import FliudHeroSection from '../siteComponets/Hero/fluidHero';
import FilterBar from '../siteComponets/filter/FilterBar';
import Head from 'next/head';
import Link from 'next/link';

const Slots = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [mounted, setMounted] = useState(false);
	const [filteredGames, setFilteredGames] = useState([]);
	const [count, setcount] = useState(100);
	const handleFilterOption = async (select: string) => {
		const resp = await useFilterSlots(select);
		setFilteredGames(resp);
	};

	useEffect(() => {
		let call = true;
		if (call) {
			async function loadSlots() {
				const resp = await useFilterSlots('clear');
				setFilteredGames(resp);
			}

			loadSlots();
		}

		return () => {
			call = false;
		};
	}, []);

	useEffect(() => {
		setcount(filteredGames.length);
	}, [filteredGames]);

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
				<FilterBar selectFilter={handleFilterOption} />

				<section className='px-1 py-3 items-center'>
					<div className='mx-auto max-w-7xl border border-white/[0.06]  rounded-3xl p-6'>
						{/* Header */}
						<div className='mb-6 flex items-center justify-between'>
							<div className='flex items-center gap-2 text-red'>
								<p className='text-sm font-light text-red-600 tracking-wide'>
									{count} games found
								</p>
							</div>
							<Link
								href='/games'
								className='text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1'>
								View all games
							</Link>
						</div>

						{filteredGames.length === 0 ? <Loader /> : ''}

						<div className='grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3'>
							{filteredGames.map((game) => (
								<LargeImageCard key={game.gameId} game={game} />
							))}
						</div>
					</div>
				</section>
			</div>
			<Footer />
		</>
	);
};

export default Slots;
