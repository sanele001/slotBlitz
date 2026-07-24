import { FiCheckCircle, FiXCircle, FiCheck } from 'react-icons/fi';

const ACCENT = '#fb226b';

const keyFeatures = [
	'Tumble Feature with up to 100x multipliers',
	'Up to 25,000x maximum win',
	'Free Spins with multipliers',
	'Vibrant candy-themed graphics and fun soundtrack',
	'High RTP of 96.51%',
];

const pros = [
	'High maximum win potential',
	'Fun and engaging gameplay',
	'Attractive visuals and sounds',
	'High RTP of 96.51%',
];

const cons = [
	'High volatility may not suit all players',
	'Free Spins can be inconsistent',
];

const verdict = {
	rating: 4.8,
	text: `Sweet Bonanza 1000 is a fantastic sequel that builds on everything
players love about the original. With its high win potential, exciting
features, and delightful theme, it's a must-play for slot enthusiasts.
We highly recommend giving it a spin!`,
};

export default function GameOverview() {
	return (
		<section className='mx-auto mt-6 mb-6 max-w-7xl overflow-hidden rounded-2xl border border-white/10'>
			{/* Top */}
			<div className='grid gap-6 p-5 lg:grid-cols-2'>
				{/* Features */}
				<div>
					<h3 className='mb-5 text-lg font-bold text-white'>Key Features</h3>

					<ul className='space-y-4'>
						{keyFeatures.map((feature) => (
							<li key={feature} className='flex items-start gap-3'>
								<FiCheckCircle
									className='mt-0.5 h-5 w-5 shrink-0'
									style={{ color: ACCENT }}
								/>

								<span className='text-sm leading-relaxed text-white/70'>
									{feature}
								</span>
							</li>
						))}
					</ul>
				</div>

				{/* Pros / Cons */}
				<div>
					<h3 className='mb-5 text-lg font-bold text-white'>Pros & Cons</h3>

					<div className='grid overflow-hidden rounded-xl border border-white/10 sm:grid-cols-2'>
						{/* Pros */}
						<div className='bg-green-900/20 p-5'>
							<h4 className='mb-4 text-sm font-bold uppercase tracking-wide text-green-400'>
								Pros
							</h4>

							<ul className='space-y-3'>
								{pros.map((pro) => (
									<li key={pro} className='flex items-start gap-2'>
										<FiCheck className='mt-0.5 h-4 w-4 shrink-0 text-green-400' />

										<span className='text-sm text-white/70'>{pro}</span>
									</li>
								))}
							</ul>
						</div>

						{/* Cons */}
						<div className='border-t border-white/10 bg-red-900/20 p-5 sm:border-l sm:border-t-0'>
							<h4 className='mb-4 text-sm font-bold uppercase tracking-wide text-red-400'>
								Cons
							</h4>

							<ul className='space-y-3'>
								{cons.map((con) => (
									<li key={con} className='flex items-start gap-2'>
										<FiXCircle className='mt-0.5 h-4 w-4 shrink-0 text-pink-500' />

										<span className='text-sm text-white/70'>{con}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* Divider */}
			<div className='border-t border-white/10' />

			{/* Verdict */}
			<div className='flex flex-col gap-5 p-5 sm:flex-row sm:items-center'>
				{/* Score */}
				<div
					className='flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full border-4 font-bold'
					style={{
						borderColor: ACCENT,
						color: ACCENT,
					}}>
					<span className='text-3xl leading-none'>{verdict.rating}</span>

					<span className='text-xs text-white/60'>/5</span>
				</div>

				{/* Text */}
				<div>
					<h3 className='text-xl font-bold text-white'>Our Verdict</h3>

					<p className='mt-3 whitespace-pre-line text-sm leading-7 text-white/70'>
						{verdict.text}
					</p>
				</div>
			</div>
		</section>
	);
}
