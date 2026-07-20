'use client';
import React, { useState, useEffect } from 'react';
import { dummyData } from '../../dummydata';
import { findGameBySlug } from '../../lib/fetcher';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import VerticalGameInfoCard from '../../components/games/verticalGameInfoCard';
import { FaArrowLeft } from 'react-icons/fa';
import GameImageCard from '../../components/games/gameImageCard';
import GameDetailsCard from '../../components/games/gameDetailsCard';
import KeyFeaturesSection from '../../components/games/keyFeaturesSection';
import { GameCTAButtons } from '../../components/games/gameCTAButtons';
import { features } from 'process';

const test = JSON.parse(JSON.stringify(dummyData));

const myfeatures = [
	{ title: 'Wild', description: 'Substitutes for other symbols' },
	{ title: 'Multiplier', description: 'Increase your winnings' },
	{
		title: 'Feature: Substitution Symbols',
		description: 'Special symbols expand wins',
	},
	{
		title: 'Free Spins Mode Choosing',
		description: 'Choose your free spins mode',
	},
	{ title: 'Achievements', description: 'Unlock exciting achievements' },
	{ title: 'Free Spins', description: 'Trigger exciting free spins' },
	{ title: 'Scatter symbols', description: 'Trigger bonus features' },
	{
		title: 'Random Wilds / Additional Wilds',
		description: 'More wilds, more wins',
	},
	{
		title: 'Free Spins Multiplier',
		description: 'Multiply your free spins wins',
	},
	{ title: 'RTP range', description: '96.86% return to player' },
	{
		title: 'Immersive Storyline',
		description: 'Engaging vampire romance theme',
	},
	{ title: 'Mobile Optimized', description: 'Seamless play on any device' },
];

const GamePage = () => {
	const params = useParams();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const slug = params?.slug;
	const game = findGameBySlug(test, slug);

	if (!mounted) {
		return null;
	}

	debugger;
	if (!game) {
		return (
			<div className='min-h-screen bg-dark flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-4xl text-white mb-4'>Game Not Found</h1>
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
				<title>{game.gameName} - Slot Review</title>
				<meta name='description' content={game.reliaseDateComment} />
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
								imageSrc={game.imageSquare}
								title={game.gameName}
								rating={4.8}
								provider='Games Global'
							/>
							<GameDetailsCard game={game}>
								<GameCTAButtons slug={slug} />
							</GameDetailsCard>
							<VerticalGameInfoCard game={game} />
						</div>

						{/* Key Features Section */}
						<KeyFeaturesSection features={myfeatures} />
					</motion.div>
				</div>
			</div>
		</>
	);
};

export default GamePage;
