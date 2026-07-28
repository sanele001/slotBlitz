'use client';

import { FaStar } from 'react-icons/fa';
import type { Slot } from '../../types/slot';

export interface GameStat {
	label: string;
	value: string | number;
	valueColor?: string;
}

export interface GameDetailsProps {
	game: Slot;
	className?: string;
	children?: React.ReactNode;
}

const defaultStatColors = [
	'text-red-500',
	'text-amber-400',
	'text-emerald-400',
	'text-fuchsia-400',
];

export default function GameDetailsCard({
	game,
	className = '',
	children,
}: GameDetailsProps) {
	const badgeLabel = game.badge;
	const stats: GameStat[] = [
		{ label: 'RTP', value: game.rtp },
		{ label: 'Volatility', value: game.volatility },
		{ label: 'Min Bet', value: game.minBet },
		{ label: 'Max Bet', value: game.maxBet },
	];

	return (
		<div
			className={`relative w-full max-w-xl overflow-hidden rounded-2xl  p-6 sm:p-8 ${className}`}>
			<div className='pointer-events-none absolute inset-0'>
				<div className='absolute -top-10 right-10 h-40 w-40 rounded-full bg-fuchsia-600/10 blur-3xl' />
				<div className='absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-red-500/10 blur-3xl' />
			</div>

			<div className='relative'>
				<div className='mb-4 inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3 py-1.5 ring-1 ring-inset ring-violet-400/30'>
					<FaStar className='h-3.5 w-3.5 text-violet-400' />
					<span className='text-xs sm:text-sm font-medium text-violet-300'>
						{badgeLabel}
					</span>
				</div>

				<h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white'>
					{game.gameName}
				</h2>

				<p className='mt-3 max-w-md text-sm sm:text-base leading-relaxed text-neutral-400'>
					{game.description}
				</p>

				<div className='mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4'>
					{stats.map((stat, i) => (
						<div
							key={stat.label}
							className='rounded-xl bg-white/5 px-4 py-3 ring-1 ring-inset ring-white/10'>
							<p className='text-xs sm:text-sm text-neutral-400'>
								{stat.label}
							</p>
							<p
								className={`mt-1 text-lg sm:text-xl font-bold ${stat.valueColor ?? defaultStatColors[i % defaultStatColors.length]}`}>
								{stat.value}
							</p>
						</div>
					))}
				</div>
			</div>
			{children}
		</div>
	);
}
