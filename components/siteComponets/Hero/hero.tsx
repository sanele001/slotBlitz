'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
	FaStar,
	FaArrowRight,
	FaFileAlt,
	FaShieldAlt,
	FaGift,
	FaBolt,
	FaTrophy,
} from 'react-icons/fa';

export interface HeroSectionProps {
	/** The single hero graphic (slot machine art) shown on the right (desktop) or top-right (mobile) */
	heroImageSrc: string;
	className?: string;
}

export default function HeroSection({
	heroImageSrc,
	className = '',
}: HeroSectionProps) {
	return (
		<section
			className={`relative w-full overflow-hidden bg-dark px-4 py-1 sm:px-1 sm:py-1 lg:px-12 lg:py-1 ${className}`}>
			<div className='mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12'>
				{/* Left column: copy */}
				<div className='relative z-10'>
					<div className='mb-4 inline-flex items-center gap-2 rounded-full bg-violet-500/15'>
						<span className='text-xs sm:text-sm font-medium text-violet-300'>
							Your Ultimate Slot Guide
						</span>
					</div>

					<div className='flex items-start justify-between gap-4 lg:block'>
						<h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white'>
							Discover the Best{' '}
							<span className='text-primary'>Online Slot</span>
							<span className='text-white'>$</span>
						</h1>
					</div>

					<p className='mt-4 max-w-md text-sm sm:text-base leading-relaxed text-neutral-400'>
						Expert reviews, free demos, and detailed information about the
						latest slot games.
					</p>

					{/* CTA buttons */}
					<div className='mt-6 flex flex-wrap items-center gap-3'>
						<Link
							href='/slots'
							className='inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm sm:text-base font-semibold text-white transition-colors hover:from-red-400 hover:to-orange-400'>
							Explore Slots
							<FaArrowRight className='h-3.5 w-3.5' />
						</Link>
						<Link
							href='/reviews'
							className='inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-3 text-sm sm:text-base font-semibold text-white ring-1 ring-inset ring-white transition-colors hover:bg-white/10'>
							<FaFileAlt className='h-3.5 w-3.5' />
							Latest Reviews
						</Link>
					</div>

					{/* Trust indicators */}
					<div className='mt-8 grid grid-cols-3 gap-4 sm:gap-6'>
						<div className='flex items-start gap-2'>
							<span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 ring-1 ring-inset ring-amber-400/20'>
								<FaShieldAlt className='h-4 w-4 text-amber-400' />
							</span>
							<div>
								<p className='text-xs sm:text-sm font-semibold text-white'>
									Trusted Reviews
								</p>
								<p className='text-[11px] sm:text-xs text-neutral-500'>
									Expert &amp; honest opinions
								</p>
							</div>
						</div>

						<div className='flex items-start gap-2'>
							<span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 ring-1 ring-inset ring-amber-400/20'>
								<FaGift className='h-4 w-4 text-amber-400' />
							</span>
							<div>
								<p className='text-xs sm:text-sm font-semibold text-white'>
									Best Bonuses
								</p>
								<p className='text-[11px] sm:text-xs text-neutral-500'>
									Top casino bonuses
								</p>
							</div>
						</div>

						<div className='flex items-start gap-2'>
							<span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 ring-1 ring-inset ring-amber-400/20'>
								<FaBolt className='h-4 w-4 text-amber-400' />
							</span>
							<div>
								<p className='text-xs sm:text-sm font-semibold text-white'>
									Free Demos
								</p>
								<p className='text-[11px] sm:text-xs text-neutral-500'>
									Play before you spin
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Right column: hero image + floating "Top Rated Slot" card — desktop/tablet only */}
				<div className='relative hidden h-80 lg:flex lg:h-96 lg:items-center lg:justify-center'>
					<div className='relative h-full w-full'>
						<Image
							src={heroImageSrc}
							alt='Slot machine'
							fill
							sizes='(min-width: 1024px) 45vw, 0px'
							className='object-contain'
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
//TODO: HERO SECTION SHOUBLE 3 COMPONENTS
