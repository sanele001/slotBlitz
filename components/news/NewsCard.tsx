import Link from 'next/link';
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi2';

/**
 * NewsCard
 * --------
 * Card for a news/articles listing page. Meant to be used in a grid,
 * e.g. `<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">`.
 */

interface NewsArticle {
	slug: string;
	thumbnail: string;
	category: string;
	title: string;
	excerpt: string;
	date: string;
	readTime: string;
}

const ACCENT = '#fb226b';

export default function NewsCard({ article }: { article?: NewsArticle }) {
	const { slug, thumbnail, category, title, excerpt, date, readTime } = article;

	return (
		<Link
			href={`/news/${slug}`}
			className='group flex flex-col rounded-2xl border border-white/10 bg-[#0c0714] overflow-hidden hover:border-white/20 transition-colors'>
			{/* Thumbnail */}
			<div className='relative w-full aspect-video shrink-0 overflow-hidden'>
				<img
					src={thumbnail}
					alt={title}
					loading='lazy'
					className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
				/>
				<span
					className='absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wide rounded-full px-3 py-1 backdrop-blur-sm'
					style={{ color: ACCENT, backgroundColor: 'rgba(251,34,107,0.15)' }}>
					{category}
				</span>
			</div>

			{/* Content */}
			<div className='flex flex-col flex-1 p-4 sm:p-5'>
				<h3 className='text-base sm:text-lg font-bold text-white leading-snug line-clamp-2 group-hover:text-white/90'>
					{title}
				</h3>

				<p className='mt-2 text-sm text-white/50 leading-relaxed line-clamp-2'>
					{excerpt}
				</p>

				<div className='mt-4 flex items-center justify-between pt-4 border-t border-white/10'>
					<div className='flex items-center gap-3 text-xs text-white/40'>
						<span className='flex items-center gap-1'>
							<FaRegCalendarAlt className='w-3.5 h-3.5' />
							{date}
						</span>
						<span className='flex items-center gap-1'>
							<FaRegClock className='w-3.5 h-3.5' />
							{readTime}
						</span>
					</div>

					<span
						className='flex items-center gap-1 text-xs font-semibold transition-transform group-hover:translate-x-0.5'
						style={{ color: ACCENT }}>
						Read More
						<HiArrowRight className='w-3.5 h-3.5' />
					</span>
				</div>
			</div>
		</Link>
	);
}
