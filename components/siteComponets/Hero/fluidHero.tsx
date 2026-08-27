'use client';

import Image from 'next/image';
import {
	FaStar,
	FaArrowRight,
	FaFileAlt,
	FaShieldAlt,
	FaGift,
	FaBolt,
	FaTrophy,
} from 'react-icons/fa';
const image = require('../../../assets/banner2.png');

export interface HeroSectionProps {
	route: string;
	heading: string;
	summary: string;
}

type textObj = {
	heroProps: HeroSectionProps;
};

export default function FliudHeroSection({ heroProps }: textObj) {
	return (
		<section className='relative w-full overflow-hidden bg-dark px-4 py-6 sm:px-6 lg:px-12 lg:py-8'>
			<div className='mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-12'>
				{/* Left column: copy */}
				<div className='relative z-10'>
					<div className='flex items-center justify-between gap-4 lg:block'>
						<div className='flex mb-4'>
							<span className='text-white/[0.6]'>Home {'\u276F'}</span>
							<p className='ml-2'>{heroProps.route}</p>
						</div>
						<h1 className='text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl'>
							{heroProps.heading}
						</h1>
					</div>

					<p className='mt-3 max-w-md text-sm leading-relaxed text-neutral-400 sm:text-base'>
						{heroProps.summary}
					</p>
				</div>

				{/* Right column: hero image */}
				<div className='relative  w-full lg:flex lg:items-center lg:justify-center'>
					<Image
						src={image}
						alt='Slot machine'
						width={600}
						height={300}
						className='h-auto max-h-48 w-full object-contain xl:max-h-56'
						priority
					/>
				</div>
			</div>
		</section>
	);
}
