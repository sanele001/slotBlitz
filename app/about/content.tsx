import { aboutUs } from '../config/content';
export default function Content() {
	return (
		<section className='mx-auto mt-6 mb-6 max-w-7xl overflow-hidden rounded-2xl border border-white/10'>
			{/* Divider */}
			<div className='border-t border-white/10' />

			{/* About Content */}
			<div className='flex flex-col gap-5 p-5'>
				<div>
					<h3 className='text-xl font-bold text-primary'>{aboutUs.heading}</h3>
					<p className='mt-3 whitespace-pre-line text-base leading-7 text-white/70'>
						{aboutUs.p1}
					</p>

					<h4 className='mt-4 text-xl font-bold text-white'>{aboutUs.h3_1}</h4>
					<p className='mt-2 whitespace-pre-line text-base leading-7 text-white/70'>
						{aboutUs.p2}
					</p>

					<h4 className='mt-4 text-xl font-bold text-white'>{aboutUs.h3_2}</h4>
					<p className='mt-2 whitespace-pre-line text-base leading-7 text-white/70'>
						{aboutUs.p3}
					</p>
				</div>
			</div>
		</section>
	);
}
