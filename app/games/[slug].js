import React, { useState, useEffect } from 'react';
import { dummyData } from '../../dummydata';
import { findGameBySlug } from '../../lib/fetcher';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaArrowLeft, FaStar, FaDollarSign, FaBolt } from 'react-icons/fa';
const test = JSON.parse(JSON.stringify(dummyData));

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

	if (!game) {
		return (
			<div className='min-h-screen bg-dark flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-4xl text-white mb-4'>Game Not Found</h1>
					<Link href='/' className='text-primary hover:text-primary-dark'>
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
				<div className='container mx-auto px-4 py-8'>
					<Link
						href='/'
						className='inline-flex items-center text-primary hover:text-primary-dark mb-8'>
						<FaArrowLeft className='mr-2' />
						Back to Games
					</Link>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className='bg-dark-light rounded-xl p-8'>
						<div className='flex flex-col md:flex-row gap-8'>
							<div className='w-full md:w-1/3'>
								<div className=' rounded-lg h-64 flex items-center justify-center mb-4'>
									<div
										style={{ backgroundImage: `url(${game.imageSquare})` }}
										className='w-full h-full  bg-contain bg-center bg-no-repeat'></div>
								</div>
								<div className='flex items-center justify-between mb-4'>
									<div className='flex items-center'>
										<FaStar className='text-yellow-500 mr-2' />
										<span className='text-white'>{game.slotRank}/5.0</span>
									</div>
									<span className='text-gray-400'>{game.vendorName}</span>
								</div>
							</div>

							<div className='w-full md:w-2/3'>
								<h1 className='text-4xl font-bold text-white mb-4'>
									{game.gameName}
								</h1>
								<p className='text-gray-400 mb-6'>{game.reliaseDateComment}</p>

								<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
									<div className='bg-dark p-4 rounded-lg'>
										<div className='text-primary mb-2'>RTP</div>
										<div className='text-white font-bold'>{game.rtp}</div>
									</div>
									<div className='bg-dark p-4 rounded-lg'>
										<div className='text-primary mb-2'>Volatility</div>
										<div className='text-white font-bold'>
											{game.volatility}
										</div>
									</div>
									<div className='bg-dark p-4 rounded-lg'>
										<div className='text-primary mb-2'>Min Bet</div>
										<div className='text-white font-bold'>${game.minBet}</div>
									</div>
									<div className='bg-dark p-4 rounded-lg'>
										<div className='text-primary mb-2'>Max Bet</div>
										<div className='text-white font-bold'>${game.maxBet}</div>
									</div>
								</div>

								<div className='mb-8'>
									<h2 className='text-2xl font-bold text-white mb-4'>
										Key Features
									</h2>
									<ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										{game.features.map((feature, index) => (
											<li
												key={index}
												className='flex items-center text-gray-400'>
												<FaBolt className='text-primary mr-2' />
												{feature}
											</li>
										))}
									</ul>
								</div>

								<Link href={`/games/demo/${slug}`}>
									<button className='w-full md:w-auto px-8 py-3 bg-primary text-white rounded-full hover:bg-opacity-80 transition-colors'>
										Play Demo
									</button>
								</Link>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</>
	);
};

export default GamePage;
