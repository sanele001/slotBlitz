'use client';
import React, { useState, useEffect } from 'react';
import { usefetchgame } from '../hooks/games/useFetch';
import { motion } from 'framer-motion';
import { singleSlotUrl, requestOptions } from '../config/api';
import Head from 'next/head';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import VerticalGameInfoCard from '../../components/games/verticalGameInfoCard';
import { FaArrowLeft } from 'react-icons/fa';
import GameImageCard from '../../components/games/gameImageCard';
import GameDetailsCard from '../../components/games/gameDetailsCard';
import KeyFeaturesSection from '../../components/games/keyFeaturesSection';
import { GameCTAButtons } from '../../components/games/gameCTAButtons';

const GamePage = () => {
	const params = useParams();
	const [mounted, setMounted] = useState(false);
	const [selectedGame, setSelectedGame] = useState(null);
	const slug = params?.slug;

	useEffect(() => {
		let call = true;

		async function getGame() {
			if (call) {
				const resp = await usefetchgame(slug);
				setSelectedGame(resp);
				setMounted(true);
			}
		}

		getGame();

		return () => {
			call = false;
		};
	}, [slug]);

	if (!selectedGame) {
		return (
			<div className='min-h-screen bg-dark flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-4xl text-white mb-4'>
						{!mounted ? 'game loading' : 'Game Not Found'}
					</h1>
					<Link href='/' className='text-red-500 hover:text-red-400'>
						Return to Home
					</Link>
				</div>
			</div>
		);
	}

	return (
		<>
			<Head>
				<title>{selectedGame.gameName} - Slot Review</title>
				<meta name='description' content={selectedGame.gameName} />
			</Head>

			<div className='min-h-screen bg-dark'>
				<div className='container mx-auto px-4 md:px-6 py-6 md:py-8'>
					{/* Back Button */}
					<Link
						href='/'
						className='inline-flex items-center gap-2 text-red-500 hover:text-red-400 mb-8 transition-colors'>
						<FaArrowLeft className='h-4 w-4' />
						<span>Back to Games</span>
					</Link>

					{/* Main Content */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className='border border-white/[0.06] rounded-3xl p-0px md:p-5'>
						{/* Layout: Image on left, Details on right (stacks on mobile) */}
						<div className=' flex max-w-7xl flex-col items-start gap-6 md:flex-row '>
							<GameImageCard
								imageSrc={selectedGame.imageSquare}
								title={selectedGame.gameName}
								rating={4.8}
								provider='Games Global'
							/>
							<GameDetailsCard game={selectedGame}>
								<GameCTAButtons slug={slug} />
							</GameDetailsCard>
							<VerticalGameInfoCard game={selectedGame} />
						</div>

						{/* Key Features Section */}
						<KeyFeaturesSection features={selectedGame.feature} />
					</motion.div>
				</div>
			</div>
		</>
	);
};

export default GamePage;
