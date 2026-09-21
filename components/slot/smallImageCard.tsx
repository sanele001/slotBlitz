import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
//import { SmallSlotGame } from './types';

export interface SmallSlotGame {
	id: string;
	title: string;
	provider: string;
	rating: number;
	imageUrl: string;
	reviewSlug: string;
	slug: string;
	rtpTag?: string; // e.g., "High RTP"
	volatilityTag?: string; // e.g., "Volatility: High"
}

interface SmallImageCardProps {
	game: SmallSlotGame;
}

export const SmallImageCard: React.FC<SmallImageCardProps> = ({ game }) => {
	const {
		title,
		provider,
		rating,
		imageUrl,
		reviewSlug,
		rtpTag = 'High RTP',
		volatilityTag = 'Volatility: High',
	} = game;

	return (
		<div className='group relative flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-[#0c0a14] p-3 transition-all duration-300 hover:border-white/[0.15] hover:bg-[#120f1f] hover:shadow-2xl hover:shadow-black/60 w-full max-w-xl'>
			{/* Small Square Thumbnail */}
			<div className='relative h-28 w-28 md:h-32 md:w-32 shrink-0 overflow-hidden rounded-xl bg-[#1a162b]'>
				<Image
					src={imageUrl}
					alt={title}
					fill
					unoptimized
					sizes='(max-width: 768px) 112px, 128px'
					className='object-cover transition-transform duration-500 ease-out group-hover:scale-105'
					priority
				/>
			</div>

			{/* Right Side Details Content */}
			<div className='flex flex-1 flex-col min-w-0 h-full justify-between py-0.5'>
				{/* Row 1: Title, Provider & Rating */}
				<div className='flex items-start justify-between gap-2'>
					<div className='min-w-0'>
						<h3 className='truncate text-base font-semibold text-white tracking-wide transition-colors group-hover:text-red-400'>
							{title}
						</h3>
						<p className='mt-0.5 truncate text-sm text-gray-400'>{provider}</p>
					</div>

					{/* Star Rating aligned to the top right */}
					<div className='flex items-center gap-1 shrink-0 bg-white/[0.02] px-2 py-0.5 rounded-md border border-white/[0.04]'>
						<FaStar className='h-3.5 w-3.5 text-amber-500' />
						<span className='text-sm font-bold text-gray-200'>
							{rating.toFixed(1)}
						</span>
					</div>
				</div>

				{/* Row 2: Metadata Tags (RTP & Volatility) */}
				<div className='mt-2.5 flex flex-wrap gap-2'>
					{rtpTag && (
						<span className='rounded-lg bg-[#10b981]/[0.08] border border-[#10b981]/[0.15] px-2.5 py-1 text-xs font-semibold text-[#10b981]'>
							{rtpTag}
						</span>
					)}
					{volatilityTag && (
						<span className='rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-xs font-medium text-gray-300'>
							{volatilityTag}
						</span>
					)}
				</div>

				{/* Row 3: Outlined Call to Action Button */}
				<div className='mt-3'>
					<Link
						href={`/review/${reviewSlug}`}
						className='inline-flex items-center justify-center rounded-xl border border-[#fb226b]/[0.4] px-5 py-1.5 text-xs font-semibold text-primary transition-all duration-200 hover:border-[#e54b4b] hover:bg-[#e54b4b]/[0.06] active:scale-[0.98]'>
						Read Review
					</Link>
				</div>
			</div>
		</div>
	);
};
