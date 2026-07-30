'use client';

import { useState, useRef, useEffect } from 'react';
import { IoSearch, IoChevronDown } from 'react-icons/io5';
import { MdFilterAltOff } from 'react-icons/md';

/**
 * FilterBar
 * ---------
 * Search input + a row of filter dropdowns + a clear-filters action.
 * Responsive: dropdowns wrap onto new lines on smaller screens,
 * search stays full-width on mobile.
 */

interface FilterConfig {
	key: string;
	label: string;
	options: string[];
	defaultValue: string;
	accent?: boolean; // whether the label uses the theme accent color
}

// Mock data — replace options with real data (providers list, RTP bands, etc.)
const FILTERS: FilterConfig[] = [
	{
		key: 'providers',
		label: 'Providers',
		options: [
			'All Providers',
			'Pragmatic Play',
			'Games Global',
			'NetEnt',
			"Play'n GO",
		],
		defaultValue: 'All Providers',
		accent: true,
	},
	{
		key: 'rtp',
		label: 'RTP',
		options: ['Any', '96%+'],
		defaultValue: 'Any',
		accent: true,
	},
	{
		key: 'volatility',
		label: 'Volatility',
		options: ['Any', 'Low', 'Medium', 'High'],
		defaultValue: 'Any',
		accent: true,
	},
	{
		key: 'features',
		label: 'Slot Rank',
		options: ['Any', '6+'],
		defaultValue: 'Any',
		accent: true,
	},
	{
		key: 'sort',
		label: 'Sort by',
		options: ['Top Rated', 'Newest', 'Most Popular'],
		defaultValue: 'Top Rated',
		accent: false,
	},
];

const ACCENT = '#fb226b';

function FilterDropdown({ filter }: { filter: FilterConfig }) {
	const [isOpen, setIsOpen] = useState(false);
	const [value, setValue] = useState(filter.defaultValue);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div
			ref={ref}
			className='relative flex-1 min-w-[140px] sm:flex-none sm:w-40'>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className='w-full flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left hover:bg-white/10 transition-colors'>
				<span className='flex flex-col leading-tight'>
					<span
						className='text-[11px] font-medium'
						style={{ color: filter.accent ? ACCENT : 'rgba(255,255,255,0.5)' }}>
						{filter.label}
					</span>
					<span className='text-sm font-semibold text-white truncate'>
						{value}
					</span>
				</span>
				<IoChevronDown
					className={`w-3.5 h-3.5 text-white/50 shrink-0 transition-transform ${
						isOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>

			{isOpen && (
				<ul className='absolute z-20 mt-2 w-full rounded-xl border border-white/10 bg-[#150b1e] shadow-xl overflow-hidden'>
					{filter.options.map((option) => (
						<li key={option}>
							<button
								onClick={() => {
									setValue(option);
									setIsOpen(false);
								}}
								className={`w-full text-left px-3 py-2 text-sm hover:bg-white/10 transition-colors ${
									option === value
										? 'text-white font-semibold'
										: 'text-white/70'
								}`}>
								{option}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default function FilterBar() {
	return (
		<div className='mx-auto max-w-7xl rounded-2xl border border-white/10 bg-dark p-3 sm:p-4'>
			<div className='flex flex-col lg:flex-row lg:items-center gap-3'>
				{/* Search */}
				<div className='flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 lg:w-64 shrink-0'>
					<IoSearch className='w-4 h-4 text-white/40 shrink-0' />
					<input
						type='text'
						placeholder='Search slots...'
						className='bg-transparent text-sm text-white placeholder-white/40 outline-none w-full'
					/>
				</div>

				{/* Filter dropdowns */}
				<div className='flex flex-wrap gap-2 flex-1'>
					{FILTERS.map((filter) => (
						<FilterDropdown key={filter.key} filter={filter} />
					))}
				</div>

				{/* Clear filters */}
				<button className='flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors px-4 py-2.5 text-sm font-medium text-white shrink-0'>
					<MdFilterAltOff className='w-4 h-4' />
					Clear Filters
				</button>
			</div>
		</div>
	);
}
