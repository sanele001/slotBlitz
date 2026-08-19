'use client';

import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { IoSearch, IoGameController } from 'react-icons/io5';

/**
 * SearchDropdown
 * --------------
 * Reusable search input that shows a filtered dropdown of matching
 * games as the user types. Each result links to /games/[game-slug].
 *
 * The results list is rendered via a React Portal directly into
 * document.body, positioned with `fixed` coordinates computed from the
 * input's on-screen location. This makes it immune to any ancestor's
 * z-index stacking context, overflow:hidden, or transform — the classic
 * causes of a dropdown getting visually "hidden" inside a mobile menu,
 * a card, or any other nested container.
 */

interface Game {
	gameSlug: string;
	gameName: string;
}

interface SearchDropdownProps {
	games?: Game[];
	placeholder?: string;
	className?: string;
	handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	clearsearch?: () => void;
}

export default function SearchDropdown({
	games,
	clearsearch,
	placeholder = 'Search slots...',
	handleSearchChange,
	className = '',
}: SearchDropdownProps) {
	const [query, setQuery] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [rect, setRect] = useState<{
		top: number;
		left: number;
		width: number;
	} | null>(null);
	const [mounted, setMounted] = useState(false);

	const wrapperRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLUListElement>(null);

	// Portals need `document` — only available client-side after mount
	useEffect(() => {
		setMounted(true);
	}, []);

	// Recalculate the input's position whenever the dropdown opens, and
	// keep it in sync on scroll/resize while it's open.
	useLayoutEffect(() => {
		if (!isOpen) return;

		function updateRect() {
			const el = wrapperRef.current;
			if (!el) return;
			const bounds = el.getBoundingClientRect();
			setRect({ top: bounds.bottom, left: bounds.left, width: bounds.width });
		}

		updateRect();
		window.addEventListener('scroll', updateRect, true);
		window.addEventListener('resize', updateRect);
		return () => {
			window.removeEventListener('scroll', updateRect, true);
			window.removeEventListener('resize', updateRect);
		};
	}, [isOpen]);

	// Close on click outside — checks both the input wrapper AND the
	// portaled list, since the list no longer lives inside wrapperRef.
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			const target = e.target as Node;
			const clickedWrapper = wrapperRef.current?.contains(target);
			const clickedList = listRef.current?.contains(target);
			if (!clickedWrapper && !clickedList) {
				setIsOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const results = query.trim()
		? games.filter((game) =>
				game.gameName.toLowerCase().includes(query.trim().toLowerCase()),
			)
		: [];

	const dropdown =
		mounted && isOpen && query.trim() && rect
			? createPortal(
					<ul
						ref={listRef}
						style={{
							position: 'fixed',
							top: rect.top + 8,
							left: rect.left,
							width: rect.width,
						}}
						className='z-[50] max-h-72 overflow-y-auto rounded-xl border border-white/10 bg-[#150b1e] shadow-xl'>
						{results.length > 0 ? (
							results.map((game) => (
								<li key={game.gameSlug}>
									<Link
										href={`/games/${game.gameSlug}`}
										onClick={() => {
											setIsOpen(false);
											clearsearch();
											setQuery('');
										}}
										className='flex items-center gap-3 px-3 py-2.5 hover:bg-white/10 transition-colors'>
										<span className='w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 shrink-0'>
											<IoGameController className='w-4 h-4 text-white/60' />
										</span>
										<span className='text-sm text-white truncate'>
											{game.gameName}
										</span>
									</Link>
								</li>
							))
						) : (
							<li className='px-3 py-3 text-sm text-white/40'>
								No games found for &quot;{query}&quot;
							</li>
						)}
					</ul>,
					document.body,
				)
			: null;

	return (
		<div ref={wrapperRef} className={`relative w-full ${className}`}>
			<div className='flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5'>
				<IoSearch className='w-4 h-4 text-white/40 shrink-0' />
				<input
					type='text'
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
						setIsOpen(true);
						handleSearchChange && handleSearchChange(e);
					}}
					onFocus={() => setIsOpen(true)}
					placeholder={placeholder}
					className='bg-transparent text-sm text-white placeholder-white/40 outline-none w-full'
				/>
			</div>

			{dropdown}
		</div>
	);
}
