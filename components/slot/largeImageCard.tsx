import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaCrown } from 'react-icons/fa';

interface SlotGame {
	id: string;
	title: string;
	provider: string;
	rating: number;
	maxRating?: number; // Defaults to 5
	imageUrl: string;
	slug: string;
	badge?: {
		text: string;
		type: 'hot' | 'new' | 'featured';
	};
}

const MOCK_SLOTS: SlotGame[] = [
	{
		id: '1',
		title: 'Mega Fortune Dreams',
		provider: 'NetEnt',
		rating: 4.6,
		imageUrl: '/images/slots/mega-fortune.jpg', // Replace with your actual public folder path
		slug: 'mega-fortune-dreams',
		badge: { text: 'HOT', type: 'hot' },
	},
	{
		id: '2',
		title: 'Starburst',
		provider: 'NetEnt',
		rating: 4.8,
		imageUrl: '/images/slots/starburst.jpg',
		slug: 'starburst',
		badge: { text: 'NEW', type: 'new' },
	},
];

interface SlotCardProps {
	game: SlotGame;
}

export const LargeImageCard: React.FC<SlotCardProps> = ({ game }) => {
	const {
		title,
		provider,
		rating,
		maxRating = 5,
		imageUrl,
		slug,
		badge,
	} = game;

	const getBadgeStyles = (type?: string) => {
		switch (type) {
			case 'hot':
				return 'bg-[#ef4444] text-white';
			case 'new':
				return 'bg-[#10b981] text-white';
			case 'featured':
				return 'bg-[#8b5cf6] text-white';
			default:
				return 'bg-blue-500 text-white';
		}
	};

	return (
		<div className='group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0c0a14] p-3 transition-all duration-300 hover:border-white/[0.15] hover:bg-[#120f1f] hover:shadow-2xl hover:shadow-black/60 w-full'>
			{/* 
        Responsive Image Container:
        - Mobile: Tall portrait aspect ratio (aspect-[4/5])
        - Desktop (md): Wide landscape aspect ratio (md:aspect-[21/9])
      */}
			<div className='relative aspect-[4/5] md:aspect-[21/9] w-full overflow-hidden rounded-xl bg-[#1a162b]'>
				<Image
					src='https://static.freedemo.games/images/games/gates-of-olympus-super-scatter/gates-of-olympus-super-scatter-rectangle.webp'
					alt={title}
					fill
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					className='object-cover transition-transform duration-500 ease-out group-hover:scale-105'
					priority
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />

				{/* Badge */}
				{badge && (
					<span
						className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wider ${getBadgeStyles(badge.type)}`}>
						{badge.text}
					</span>
				)}
			</div>

			{/* 
        Responsive Content Wrapper:
        - Mobile: Stacks vertically (flex-col) with gaps
        - Desktop (md): Horizontal layout (md:flex-row md:items-center md:justify-between)
      */}
			<div className='mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3.5 md:gap-4 px-1 pb-1'>
				{/* Title, Provider & Rating */}
				<div className='flex flex-col min-w-0'>
					<h3 className='truncate text-base font-semibold text-white tracking-wide transition-colors group-hover:text-red-400'>
						{title}
					</h3>

					<div className='mt-1.5 flex items-center gap-2 text-sm text-gray-400'>
						<span className='truncate'>{provider}</span>
						<span className='text-gray-700'>•</span>
						<div className='flex items-center gap-1.5'>
							<FaStar className='h-3.5 w-3.5 text-amber-500' />
							<span className='font-semibold text-gray-200'>{rating}</span>
							<span className='text-gray-500'>/{maxRating}</span>
						</div>
					</div>
				</div>

				{/* 
          Responsive CTA Button:
          - Mobile: Full width (w-full), smaller padding and text
          - Desktop (md): Auto width (md:w-auto), larger padding
        */}
				<Link
					href={`/reviews/${slug}`}
					className='flex w-full md:w-auto shrink-0 items-center justify-center rounded-xl bg-[#e54b4b] px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-semibold text-white transition-all duration-200 hover:bg-[#f05a5a] active:scale-[0.98]'>
					View Review
				</Link>
			</div>
		</div>
	);
};
