'use client';
import React, { useEffect, useState } from 'react';
import Footer from '../siteComponets/footer/Footer';
import Loader from '../siteComponets/loader/Loader';
import { useFilterSlots } from '../../app/hooks/games/useFilter';
import { useFetchSlotCount } from '../../app/hooks/games/useFetch';
import { LargeImageCard } from '../slot/largeImageCard';
import { gameConfig } from '../../app/config/game';
import FliudHeroSection from '../siteComponets/Hero/fluidHero';
import FilterBar from '../siteComponets/filter/FilterBar';
import Head from 'next/head';

const Slots = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [mounted, setMounted] = useState(false);
	const [filteredGames, setFilteredGames] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [count, setCount] = useState(100);
	const handleFilterOption = async (select: string) => {
		const resp = await useFilterSlots(select);
		setFilteredGames(resp);
	};

	useEffect(() => {
		setMounted(true);
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
		setCount(filteredGames.length);
		useFetchSlotCount().then(setPageCount);
	}, [filteredGames]);

	const handlePageClick = async (data: { selected: number }) => {
		const selectedPage = data.selected;
		setCurrentPage(selectedPage);
		const offset = selectedPage * gameConfig.sortingInfo.itemsPerPage;
		const resp = await useFilterSlots(
			'clear',
			gameConfig.sortingInfo.itemsPerPage,
			offset,
		);
		setFilteredGames(resp);
		window.scrollTo(0, 0);
	};

	const totalPages = Math.max(
		1,
		Math.ceil(pageCount / gameConfig.sortingInfo.itemsPerPage),
	);
	const pageItems: Array<number | 'start-ellipsis' | 'end-ellipsis'> = (() => {
		if (totalPages <= 6) {
			return Array.from({ length: totalPages }, (_, index) => index);
		}

		if (currentPage < 3) {
			return [0, 1, 2, 3, 4, 'end-ellipsis', totalPages - 1];
		}

		if (currentPage >= totalPages - 3) {
			return [
				0,
				'start-ellipsis',
				totalPages - 5,
				totalPages - 4,
				totalPages - 3,
				totalPages - 2,
				totalPages - 1,
			];
		}

		return [
			0,
			'start-ellipsis',
			currentPage - 1,
			currentPage,
			currentPage + 1,
			'end-ellipsis',
			totalPages - 1,
		];
	})();
	const goToPage = async (nextPage: number) => {
		if (nextPage < 0 || nextPage >= totalPages) return;
		await handlePageClick({ selected: nextPage });
	};

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
				<FliudHeroSection heroProps={gameConfig.fluideHeroProps.slots} />
				<FilterBar selectFilter={handleFilterOption} />

				<section className='px-1 py-3 items-center'>
					<div className='mx-auto max-w-7xl border border-white/[0.06]  rounded-3xl p-6'>
						{/* Header */}
						<div className='mb-6 flex items-center justify-between'>
							<div className='flex items-center gap-2 text-red'>
								<p className='text-sm font-bold text-primary tracking-wide'>
									Games shown: {count ? count : 0} of 600+
								</p>
							</div>
						</div>

						{filteredGames.length === 0 ? <Loader /> : ''}

						<div className='grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3'>
							{filteredGames.map((game) => (
								<LargeImageCard key={game.gameId} game={game} />
							))}
						</div>
					</div>
					<div className='pagination-shell'>
						<div className='pagination-mobile flex md:hidden'>
							<button
								type='button'
								className='pagination-mobile__button'
								disabled={currentPage === 0}
								onClick={() => goToPage(currentPage - 1)}>
								&lt; Prev
							</button>
							<div className='pagination-mobile__meta'>
								Page {currentPage + 1} of {totalPages}
							</div>
							<button
								type='button'
								className='pagination-mobile__button'
								disabled={currentPage >= totalPages - 1}
								onClick={() => goToPage(currentPage + 1)}>
								Next &gt;
							</button>
						</div>

						{mounted ? (
							<div className='pagination hidden md:flex'>
								<button
									type='button'
									className='pagination__nav pagination__nav--prev'
									disabled={currentPage === 0}
									onClick={() => goToPage(currentPage - 1)}>
									<span className='pagination__nav-link'>&lt; previous</span>
								</button>

								{pageItems.map((item) =>
									typeof item === 'number' ? (
										<button
											key={item}
											type='button'
											className={`pagination__item ${
												currentPage === item ? 'pagination__item--active' : ''
											}`}
											onClick={() => goToPage(item)}>
											<span className='pagination__link'>{item + 1}</span>
										</button>
									) : (
										<span
											key={item}
											className='pagination__break'
											aria-hidden='true'>
											...
										</span>
									),
								)}

								<button
									type='button'
									className='pagination__nav pagination__nav--next'
									disabled={currentPage === totalPages - 1}
									onClick={() => goToPage(currentPage + 1)}>
									<span className='pagination__nav-link'>next &gt;</span>
								</button>
							</div>
						) : null}
					</div>
				</section>
			</div>
			<Footer />
		</>
	);
};

export default Slots;
