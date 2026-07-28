'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IconType } from 'react-icons';
import {
	FaHome,
	FaNewspaper,
	FaCompass,
	FaBars,
	FaTimes,
} from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { MdBusiness } from 'react-icons/md';
import { IoSearch, IoNotifications, IoPersonCircle } from 'react-icons/io5';

/**
 * Navbar
 * ------
 * Responsive top navigation. Collapses into a burger menu on mobile.
 * Theme accent color: #fb226b
 */

interface NavItem {
	label: string;
	href: string;
	icon: IconType;
}

// Mock data — replace hrefs with real routes
const NAV_ITEMS: NavItem[] = [
	{ label: 'Home', href: '/', icon: FaHome },
	{ label: 'Slots', href: '/slots', icon: BsGridFill },
	{ label: 'Providers', href: '/providers', icon: MdBusiness },
	{ label: 'News', href: '/news', icon: FaNewspaper },
	{ label: 'Guides', href: '/guides', icon: FaCompass },
];

const ACCENT = '#fb226b';

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();
	const activeLabel = pathname;

	return (
		<header className='sticky top-0 z-50 w-full bg-[#0c0714] border-b border-white/10'>
			<nav className='flex items-center justify-between gap-4 px-4 sm:px-6 h-16'>
				{/* Logo */}
				<Link
					href='/'
					className='flex items-center shrink-0 text-lg font-extrabold'>
					<span className='text-white'>Slot</span>
					<span style={{ color: ACCENT }}>Blitz</span>
				</Link>

				{/* Desktop nav links */}
				<ul className='hidden lg:flex items-center gap-6'>
					{NAV_ITEMS.map((item) => {
						const Icon = item.icon;
						const isActive = item.href === activeLabel;
						return (
							<li key={item.label}>
								<Link
									href={item.href}
									className='flex flex-col items-center gap-1 group'>
									<span
										className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
											isActive ? '' : 'text-white/70 group-hover:text-white'
										}`}
										style={isActive ? { color: ACCENT } : undefined}>
										<Icon className='w-4 h-4' />
										{item.label}
									</span>
									<span
										className='h-0.5 w-full rounded-full transition-opacity'
										style={{
											backgroundColor: ACCENT,
											opacity: isActive ? 1 : 0,
										}}
									/>
								</Link>
							</li>
						);
					})}
				</ul>

				{/* Right side: search / notifications / profile */}
				<div className='hidden lg:flex items-center gap-4'>
					<div className='flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-2 w-64'>
						<IoSearch className='w-4 h-4 text-white/40 shrink-0' />
						<input
							type='text'
							placeholder='Search slots, providers...'
							className='bg-transparent text-sm text-white placeholder-white/40 outline-none w-full'
						/>
					</div>

					<button
						aria-label='Notifications'
						className='relative w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors'>
						<IoNotifications className='w-4 h-4 text-white/80' />
						<span
							className='absolute top-1.5 right-1.5 w-2 h-2 rounded-full'
							style={{ backgroundColor: ACCENT }}
						/>
					</button>

					<button
						aria-label='Profile'
						className='w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors'>
						<IoPersonCircle className='w-5 h-5 text-white/80' />
					</button>
				</div>

				{/* Mobile: notifications, profile, burger */}
				<div className='flex lg:hidden items-center gap-2'>
					<button
						aria-label='Notifications'
						className='relative w-9 h-9 flex items-center justify-center rounded-full bg-white/5'>
						<IoNotifications className='w-4 h-4 text-white/80' />
						<span
							className='absolute top-1.5 right-1.5 w-2 h-2 rounded-full'
							style={{ backgroundColor: ACCENT }}
						/>
					</button>

					<button
						aria-label='Toggle menu'
						onClick={() => setIsMenuOpen((prev) => !prev)}
						className='w-9 h-9 flex items-center justify-center rounded-full bg-white/5'>
						{isMenuOpen ? (
							<FaTimes className='w-4 h-4 text-white' />
						) : (
							<FaBars className='w-4 h-4 text-white' />
						)}
					</button>
				</div>
			</nav>

			{/* Mobile menu panel */}
			{isMenuOpen && (
				<div className='lg:hidden border-t border-white/10 bg-[#0c0714] px-4 pb-4 pt-3'>
					<div className='flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-2 mb-3'>
						<IoSearch className='w-4 h-4 text-white/40 shrink-0' />
						<input
							type='text'
							placeholder='Search slots, providers...'
							className='bg-transparent text-sm text-white placeholder-white/40 outline-none w-full'
						/>
					</div>

					<ul className='flex flex-col gap-1'>
						{NAV_ITEMS.map((item) => {
							const Icon = item.icon;
							const isActive = item.label === activeLabel;
							return (
								<li key={item.label}>
									<Link
										href={item.href}
										onClick={() => setIsMenuOpen(false)}
										className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
											isActive ? 'bg-white/5' : 'text-white/70'
										}`}
										style={isActive ? { color: ACCENT } : undefined}>
										<Icon className='w-4 h-4' />
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>

					<button className='flex items-center gap-2 w-full mt-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 bg-white/5'>
						<IoPersonCircle className='w-4 h-4' />
						Profile
					</button>
				</div>
			)}
		</header>
	);
}
