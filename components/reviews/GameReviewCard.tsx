import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

/**
 * GameReviewCard
 * --------------
 * Review summary card: thumbnail on the left, category badge, title,
 * star rating, byline, description, and two CTA buttons on the right.
 */

interface GameReviewCardProps {
	thumbnail: string;
	category: string;
	title: string;
	rating: number; // out of 5
	author: string;
	updatedDate: string;
	description: string;
	playUrl: string;
	providerUrl: string;
}

type ReviewProps = {
	gameReview: GameReviewCardProps;
};

const ACCENT = '#fb226b';

function StarRating({ rating }: { rating: number }) {
	const fullStars = Math.round(rating);
	return (
		<div className='flex items-center gap-1'>
			{Array.from({ length: 5 }).map((_, i) => (
				<FaStar
					key={i}
					className='w-4 h-4'
					style={{
						color: i < fullStars ? '#f5b400' : 'rgba(255,255,255,0.15)',
					}}
				/>
			))}
		</div>
	);
}

export default function GameReviewCard({ gameReview }: ReviewProps) {
	const {
		thumbnail,
		category,
		title,
		rating,
		author,
		updatedDate,
		description,
		playUrl,
		providerUrl,
	} = gameReview;
	return (
		<div className='mx-auto max-w-7xl   rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row gap-6'>
			{/* Thumbnail */}
			<div className='relative w-full aspect-[16/9] md:w-72 md:aspect-auto md:h-auto md:flex-shrink-0 overflow-hidden rounded-xl'>
				<Image
					src={thumbnail}
					alt={title}
					fill
					className='object-cover'
					sizes='(max-width: 768px) 100vw, 288px'
				/>
			</div>

			{/* Content */}
			<div className='flex-1 min-w-0'>
				<span
					className='inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide'
					style={{
						color: ACCENT,
						backgroundColor: 'rgba(251,34,107,0.12)',
					}}>
					{category}
				</span>

				<h2 className='mt-3 text-xl font-extrabold leading-tight text-white sm:text-2xl lg:text-3xl'>
					{title}
				</h2>

				<div className='mt-3 flex flex-wrap items-center gap-2'>
					<StarRating rating={rating} />
					<span className='text-sm font-semibold text-white'>
						{rating.toFixed(1)} / 5
					</span>
				</div>

				<p className='mt-2 text-sm text-white/50'>
					By <span className='font-semibold text-white/70'>{author}</span> ·
					Updated {updatedDate}
				</p>

				<p className='mt-4 text-sm leading-relaxed text-white/60 sm:text-base'>
					{description}
				</p>

				<div className='mt-6 flex flex-col gap-3 sm:flex-row'>
					<a
						href={playUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-colors'
						style={{ backgroundColor: ACCENT }}>
						Play Now
						<FiExternalLink className='h-4 w-4' />
					</a>

					<a
						href={providerUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5'>
						Visit Provider
						<FiExternalLink className='h-4 w-4' />
					</a>
				</div>
			</div>
		</div>
	);
}
