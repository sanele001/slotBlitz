import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { dummyData } from '../../../dummydata';
import { findGameBySlug } from '../../../lib/fetcher';
import Head from 'next/head';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaArrowLeft, FaDollarSign, FaSpinner } from 'react-icons/fa';
const test = JSON.parse(JSON.stringify(dummyData));

const DemoGame = () => {
	const params = useParams();
	const [mounted, setMounted] = useState(false);
	const [balance, setBalance] = useState(1000);
	const [bet, setBet] = useState(1);
	const [isSpinning, setIsSpinning] = useState(false);

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
				<title>Play {game.gameName} Demo - Slot Review</title>
			</Head>

			<div className='min-h-screen bg-dark'>
				<div className='container mx-auto px-4 py-8'>
					<Link
						href={`/games/${slug}`}
						className='inline-flex items-center text-primary hover:text-primary-dark mb-8'>
						<FaArrowLeft className='mr-2' />
						Back to Game Info
					</Link>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className='bg-dark-light rounded-xl p-8 max-w-4xl mx-auto'>
						<div className='text-center mb-8'>
							<h1 className='text-3xl font-bold text-white mb-2'>
								{game.title}
							</h1>
							<p className='text-gray-400'>Demo Mode</p>
						</div>

						<div className='bg-dark rounded-xl p-4 mb-8 '>
							<iframe
								src={game.demoGameLink}
								className='w-full h-[25rem] rounded-lg'></iframe>
						</div>

						<div className='text-center text-gray-400 text-sm'>
							<p>{game.gameName}</p>
							<p className='mt-2'>
								This is a demo version for entertainment purposes only.
							</p>
							<Link
								href='/'
								className='inline-flex items-center text-primary hover:text-primary-dark mt-5'>
								<FaArrowLeft className='mr-2' />
								Back to Home
							</Link>
						</div>
					</motion.div>
				</div>
			</div>
		</>
	);
};

export default DemoGame;
