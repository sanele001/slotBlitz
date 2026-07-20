import Link from 'next/link';
import {
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaYoutube,
	FaCcVisa,
	FaCcMastercard,
	FaCcPaypal,
} from 'react-icons/fa';

/**
 * Footer
 * ------
 * Site footer with brand blurb + socials, link columns, a newsletter
 * signup, and a bottom bar with copyright + payment method badges.
 */

interface FooterColumn {
	title: string;
	links: { label: string; href: string }[];
}

// Mock data — replace hrefs with real routes
const FOOTER_COLUMNS: FooterColumn[] = [
	{
		title: 'Explore',
		links: [
			{ label: 'Top Rated Slots', href: '/top-rated' },
			{ label: 'New Slots', href: '/new' },
			{ label: 'Bonus Deals', href: '/bonuses' },
			{ label: 'Slot Reviews', href: '/reviews' },
			{ label: 'Guides', href: '/guides' },
		],
	},
	{
		title: 'Information',
		links: [
			{ label: 'About Us', href: '/about' },
			{ label: 'Contact Us', href: '/contact' },
			{ label: 'Privacy Policy', href: '/privacy' },
			{ label: 'Terms & Conditions', href: '/terms' },
			{ label: 'Responsible Gaming', href: '/responsible-gaming' },
		],
	},
];

const SOCIAL_LINKS = [
	{ icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
	{ icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
	{ icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
	{ icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
];

const ACCENT = '#fb226b';

export default function Footer() {
	return (
		<footer className='w-full bg-[#0c0714]  pt-12'>
			<div className='max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
				{/* Brand */}
				<div>
					<h2 className='text-xl font-extrabold text-white tracking-wide'>
						SlotBlitz
					</h2>
					<p className='mt-3 text-sm text-white/50 max-w-xs'>
						Your trusted destination for top rated slots and the best online
						casino games.
					</p>
					<div className='flex items-center gap-3 mt-5'>
						{SOCIAL_LINKS.map((social) => {
							const Icon = social.icon;
							return (
								<a
									key={social.label}
									href={social.href}
									aria-label={social.label}
									className='w-9 h-9 flex items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-colors'>
									<Icon className='w-4 h-4' />
								</a>
							);
						})}
					</div>
				</div>

				{/* Link columns */}
				{FOOTER_COLUMNS.map((column) => (
					<div key={column.title}>
						<h3 className='text-sm font-bold text-white tracking-wide uppercase'>
							{column.title}
						</h3>
						<ul className='mt-4 flex flex-col gap-3'>
							{column.links.map((link) => (
								<li key={link.label}>
									<Link
										href={link.href}
										className='text-sm text-white/60 hover:text-white transition-colors'>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}

				{/* Newsletter */}
				<div>
					<h3 className='text-sm font-bold text-white tracking-wide uppercase'>
						Stay Updated
					</h3>
					<p className='mt-4 text-sm text-white/50'>
						Subscribe to get the latest slot reviews, bonuses, and exclusive
						updates.
					</p>
					<form className='mt-4 flex items-stretch rounded-xl border border-white/15 overflow-hidden'>
						<input
							type='email'
							placeholder='Enter your email'
							className='flex-1 min-w-0 bg-transparent px-3 py-2.5 text-sm text-white placeholder-white/40 outline-none'
						/>
						<button
							type='submit'
							className='px-5 text-sm font-semibold text-white shrink-0'
							style={{ backgroundColor: ACCENT }}>
							Subscribe
						</button>
					</form>
				</div>
			</div>

			{/* Bottom bar */}
			<div className='max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 pb-6'>
				<p className='text-xs text-white/40'>
					© 2025 Top Slots. All rights reserved.
				</p>

				<div className='flex items-center gap-4'>
					<FaCcVisa className='w-8 h-8 text-white/70' />
					<FaCcMastercard className='w-8 h-8 text-white/70' />
					<FaCcPaypal className='w-8 h-8 text-white/70' />
					<span className='text-sm font-bold italic text-white/70'>Skrill</span>
					<span className='w-8 h-8 flex items-center justify-center rounded-full border border-white/30 text-xs font-bold text-white/70'>
						18+
					</span>
				</div>
			</div>
		</footer>
	);
}
