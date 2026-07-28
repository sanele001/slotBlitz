import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usefetchgame } from '../../hooks/games/useFetch';
import { singleSlotUrl, requestOptions } from '../../config/api';
import styles from '../../../styles/localStyle.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaArrowLeft, FaDollarSign, FaSpinner } from 'react-icons/fa';
import GameFrame from '../../../components/slot/GameFrame';

const DemoGame = () => {
	const params = useParams();
	const [mounted, setMounted] = useState(false);
	const [balance, setBalance] = useState(1000);
	const [selectedGame, setSelectedGame] = useState(null);
	const [bet, setBet] = useState(1);
	const [isSpinning, setIsSpinning] = useState(false);
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
				<title>Play {selectedGame.gameName} Demo - Slot Review</title>
			</Head>

			<div className={`min-h-screen bg-dark ${styles.demobg}`}>
				<div className='container mx-auto px-4 py-8'>
					<Link
						href={`/games/${slug}`}
						className='inline-flex items-center text-primary hover:text-primary-dark mb-8'>
						<FaArrowLeft className='mr-2' />
						Back to Game Info
					</Link>

					<GameFrame game={selectedGame} />
				</div>
			</div>
		</>
	);
};

export default DemoGame;
