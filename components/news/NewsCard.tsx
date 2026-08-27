'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FaRegCalendarAlt, FaRegClock, FaTimes } from 'react-icons/fa';
import { HiArrowRight, HiOutlineExternalLink } from 'react-icons/hi';

/**
 * NewsCard
 * --------
 * Card for a news/articles listing page. Clicking "Read More" opens a
 * modal with the full summary and a link to the original source
 */

interface NewsArticle {
	thumbnail: string;
	category: string;
	title: string;
	excerpt: string;
	content: string;
	sourceUrl: string;
	sourceName: string;
	date: string;
	readTime: string;
}

// Mock data — replace with real article content

const ACCENT = '#fb226b';

function ArticleModal({
	article,
	onClose,
}: {
	article: NewsArticle;
	onClose: () => void;
}) {
	const dialogRef = useRef<HTMLDivElement>(null);

	// Close on Escape, lock background scroll while open
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') onClose();
		}
		document.addEventListener('keydown', handleKeyDown);
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = '';
		};
	}, [onClose]);

	return createPortal(
		<div
			className='fixed inset-0 z-[9999] flex items-center justify-center p-4'
			onMouseDown={(e) => {
				// Close only when clicking the backdrop, not the dialog itself
				if (e.target === e.currentTarget) onClose();
			}}>
			{/* Backdrop */}
			<div className='absolute inset-0 bg-black/70 backdrop-blur-sm' />

			{/* Dialog */}
			<div
				ref={dialogRef}
				role='dialog'
				aria-modal='true'
				aria-labelledby='article-modal-title'
				className='relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#150b1e] shadow-2xl'>
				<div className='relative w-full aspect-video shrink-0'>
					<img
						src={article.thumbnail}
						alt={article.title}
						loading='lazy'
						className='h-full w-full rounded-t-2xl object-cover'
					/>
					<button
						onClick={onClose}
						aria-label='Close'
						className='absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors'>
						<FaTimes className='w-3.5 h-3.5' />
					</button>
					<span
						className='absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wide rounded-full px-3 py-1 backdrop-blur-sm'
						style={{ color: ACCENT, backgroundColor: 'rgba(251,34,107,0.15)' }}>
						{article.category}
					</span>
				</div>

				<div className='p-5 sm:p-6'>
					<h2
						id='article-modal-title'
						className='text-lg sm:text-xl font-extrabold text-white leading-snug'>
						{article.title}
					</h2>

					<div className='mt-2 flex items-center gap-3 text-xs text-white/40'>
						<span className='flex items-center gap-1'>
							<FaRegCalendarAlt className='w-3.5 h-3.5' />
							{article.date}
						</span>
						<span className='flex items-center gap-1'>
							<FaRegClock className='w-3.5 h-3.5' />
							{article.readTime}
						</span>
					</div>

					<p className='mt-4 text-sm text-white/60 leading-relaxed'>
						{article.content}
					</p>

					<div className='mt-6 flex items-center gap-3 flex-wrap'>
						<a
							href={article.sourceUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-colors'
							style={{ backgroundColor: ACCENT }}>
							Read Full Article
							<HiOutlineExternalLink className='w-4 h-4' />
						</a>
						<button
							onClick={onClose}
							className='rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/5 transition-colors'>
							Close
						</button>
					</div>

					<p className='mt-4 text-xs text-white/30'>
						Source: {article.sourceName}
					</p>
				</div>
			</div>
		</div>,
		document.body,
	);
}

export default function NewsCard({ article }: { article?: NewsArticle }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { thumbnail, category, title, excerpt, date, readTime } = article;
	debugger;
	return (
		<>
			<div className='group flex flex-col rounded-2xl border border-white/10 bg-[#0c0714] overflow-hidden hover:border-white/20 transition-colors'>
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
					<h3 className='text-base sm:text-lg font-bold text-white leading-snug line-clamp-2'>
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

						<button
							onClick={() => setIsModalOpen(true)}
							className='flex items-center gap-1 text-xs font-semibold transition-transform hover:translate-x-0.5'
							style={{ color: ACCENT }}>
							Read More
							<HiArrowRight className='w-3.5 h-3.5' />
						</button>
					</div>
				</div>
			</div>

			{isModalOpen && (
				<ArticleModal article={article} onClose={() => setIsModalOpen(false)} />
			)}
		</>
	);
}
