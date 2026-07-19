import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { dummyData } from '../../../dummydata';
import { findGameBySlug } from '../../../lib/fetcher';
import styles from '../../../styles/localStyle.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaArrowLeft, FaDollarSign, FaSpinner } from 'react-icons/fa';
import GameFrame from '../../../components/slot/GameFrame';
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

			<div className={`min-h-screen bg-dark ${styles.demobg}`}>
				<div className='container mx-auto px-4 py-8'>
					<Link
						href={`/games/${slug}`}
						className='inline-flex items-center text-primary hover:text-primary-dark mb-8'>
						<FaArrowLeft className='mr-2' />
						Back to Game Info
					</Link>

					<GameFrame game={game} />
				</div>
			</div>
		</>
	);
};

export default DemoGame;
