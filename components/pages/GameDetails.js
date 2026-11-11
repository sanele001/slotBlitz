'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import Footer from '../siteComponets/footer/Footer';
import VerticalGameInfoCard from '../games/verticalGameInfoCard';
import { usefetchPublicImage } from '../../app/hooks/games/useFetchPublicImage';
import GameImageCard from '../games/gameImageCard';
import GameDetailsCard from '../games/gameDetailsCard';
import KeyFeaturesSection from '../games/keyFeaturesSection';
import { GameCTAButtons } from '../games/gameCTAButtons';
import WhyPlayersLoveIt from '../games/WhyPlayersLoveIt';

// The game is loaded on the server (app/games/[slug]/page.tsx) and passed in.
// This stays a client component only because of the framer-motion animation.
const GameDetails = ({ game, slug }) => {
	const publicImage = usefetchPublicImage(game.imageSquare);

	return (
		<>
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
								imageSrc={game.imageSquare || publicImage}
								imageLandscape={game.imageLandscape}
								title={game.gameName}
								rating={4.8}
								provider='Games Global'
							/>
							<GameDetailsCard game={game}>
								<GameCTAButtons slug={slug} />
							</GameDetailsCard>
							<VerticalGameInfoCard game={game} />
						</div>

						<WhyPlayersLoveIt />

						{/* Key Features Section */}
						<KeyFeaturesSection features={game.feature} />
					</motion.div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default GameDetails;
