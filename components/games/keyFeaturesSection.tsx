'use client';
import { FaBolt } from 'react-icons/fa';

export interface Feature {
	feature: string;
	description: string;
}

export interface KeyFeaturesProps {
	heading?: string;
	features: string[] | Feature[];
	className?: string;
}

export default function KeyFeaturesSection({
	heading = 'Key Features',
	features,
	className = '',
}: KeyFeaturesProps) {
	return (
		<div
			className={`w-full rounded-2xl  p-6 sm:p-8 ring-1 ring-inset ring-white/10 ${className} mt-5`}>
			<h2 className='text-lg sm:text-xl font-bold text-white'>{heading}</h2>

			<div className='mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3'>
				{features.map((feature, index) => (
					<div key={index} className='flex items-start gap-3'>
						<span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 ring-1 ring-inset ring-red-500/20'>
							<FaBolt className='h-4 w-4 text-red-500' />
						</span>
						<div>
							<p className='text-sm font-semibold text-white'>{feature}</p>
							{/* <p className='text-xs sm:text-sm text-neutral-400'>
								{feature.description}
							</p> */}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
