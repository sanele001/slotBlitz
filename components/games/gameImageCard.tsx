'use client';

import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

export interface GameCardProps {
	imageSrc: string;
	title: string;
	rating: number;
	maxRating?: number;
	provider: string;
	onClick?: () => void;
	className?: string;
}

export default function GameImageCard({
	imageSrc,
	title,
	rating,
	maxRating = 5,
	provider,
	onClick,
	className = '',
}: GameCardProps) {
	return (
		<div
			onClick={onClick}
			className={`group w-full max-w-[280px] sm:max-w-xs mx-auto select-none ${
				onClick ? 'cursor-pointer' : ''
			} ${className}`}>
			<div className='relative aspect-[1/1] w-full overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-lg shadow-black/40 transition-transform duration-300 ease-out group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-black/60'>
				<Image
					src={imageSrc}
					alt={title}
					fill
					sizes='(max-width: 640px) 35vw, (max-width: 1024px) 15vw, 280px'
					className='object-cover'
					priority
				/>
				<div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />
			</div>

			<div className='mt-2 flex items-center gap-2 px-1 text-xs sm:text-sm'>
				<span className='flex items-center gap-1 font-semibold text-white'>
					<FaStar className='h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400' />
					{rating.toFixed(1)}/{maxRating.toFixed(1)}
				</span>
				<span className='text-neutral-500'>|</span>
				<span className='truncate text-neutral-400'>{provider}</span>
			</div>
		</div>
	);
}
