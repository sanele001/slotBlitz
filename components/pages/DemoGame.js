import React from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import styles from '../../styles/localStyle.module.css';
import GameFrame from '../slot/GameFrame';

// The game is loaded on the server (app/games/demo/[slug]/page.tsx) and passed in.
const DemoGame = ({ game, slug }) => (
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
);

export default DemoGame;
