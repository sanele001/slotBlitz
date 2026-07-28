'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaStar, FaFire, FaArrowLeft } from 'react-icons/fa';
import { HiOutlineTrendingUp } from 'react-icons/hi';

/**
 * GameFrame
 * ---------
 * Iframe holder used to play a game from a direct link.
 * Shows a themed loading state (provider / RTP / volatility meta)
 * while the iframe loads, then reveals the game.
 *
 * Drop this into any route, e.g. app/play/[slug]/page.tsx
 */

interface GameMeta {
	gameName: string;
	provider: string;
	demoGameLink: string;
	rtp: number; // e.g. 96.5
	volatility: 'Low' | 'Medium' | 'High';
	iframeUrl: string;
}

interface GameFrameProps {
	game?: GameMeta;
}

export default function GameFrame({ game }: GameFrameProps) {
	const [progress, setProgress] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (isLoaded) return;

		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					return 100;
				}
				return prev + 4;
			});
		}, 60);

		return () => clearInterval(interval);
	}, [isLoaded]);

	useEffect(() => {
		if (progress >= 100) {
			setIsLoaded(true);
		}
	}, [progress]);

	return (
		<div className='relative w-full max-w-3xl mx-auto rounded-3xl border border-red-500/30 bg-[#150b1e]/50 p-6 sm:p-8 shadow-2xl overflow-hidden'>
			{/* Header */}
			<div className='text-center mb-6'>
				<h1 className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight'>
					{isLoaded ? game.gameName : 'Demo Mode'}
				</h1>
				<div className='mt-2 flex items-center justify-center gap-3 text-sm text-white/70 flex-wrap'>
					<span className='flex items-center gap-1'>
						<FaStar className='w-4 h-4 text-red-400' />
						{game.provider}
					</span>
					<span className='w-px h-4 bg-white/20' />
					<span className='flex items-center gap-1'>
						<HiOutlineTrendingUp className='w-4 h-4 text-red-400' />
						RTP {game.rtp}%
					</span>
					<span className='w-px h-4 bg-white/20' />
					<span className='flex items-center gap-1'>
						<FaFire className='w-4 h-4 text-orange-400' />
						{game.volatility} Volatility
					</span>
				</div>
			</div>

			{/* Frame area */}
			<div className='relative rounded-2xl border border-red-500/40 bg-black/40 aspect-video overflow-hidden'>
				{!isLoaded ? (
					<div className='absolute inset-0 flex flex-col items-center justify-center gap-4 px-8'>
						<div className='w-full max-w-sm h-2 rounded-full bg-white/10 overflow-hidden'>
							<div
								className='h-full bg-gradient-to-r from-red-500 to-orange-400 transition-all duration-150 ease-linear'
								style={{ width: `${progress}%` }}
							/>
						</div>
						<p className='text-white/60 text-sm'>Game Loading...</p>
					</div>
				) : (
					<iframe
						src={game.demoGameLink}
						title={game.gameName}
						className='absolute inset-0 w-full h-full'
						allow='fullscreen'
						allowFullScreen
					/>
				)}
			</div>

			{/* Footer */}
			<div className='text-center mt-6'>
				<p className='text-white/50 text-sm mb-4'>
					This is a demo version for entertainment purposes only.
				</p>

				<Link
					href='/'
					className='inline-flex items-center gap-2 rounded-xl bg-red-500 hover:bg-red-600 transition-colors text-white font-semibold px-6 py-3'>
					<FaArrowLeft className='w-4 h-4' />
					Back to Home
				</Link>
			</div>
		</div>
	);
}
