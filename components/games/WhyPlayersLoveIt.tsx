import { FaBookOpen, FaTrophy, FaSyncAlt } from 'react-icons/fa';

/**
 * WhyPlayersLoveIt
 * ----------------
 * Intro blurb on the left, three feature highlights on the right.
 * All text is static.
 */

const ACCENT = '#fb226b';

const FEATURES = [
	{
		icon: FaBookOpen,
		title: 'Engaging Story',
		description: 'A deep vampire romance narrative.',
	},
	{
		icon: FaTrophy,
		title: 'Big Win Potential',
		description: 'Stacked wilds and expanding symbols.',
	},
	{
		icon: FaSyncAlt,
		title: 'Replay Value',
		description: 'Multiple bonus features keep the game exciting.',
	},
];

export default function WhyPlayersLoveIt() {
	return (
		<section className=' mt-5 w-full rounded-2xl border border-white/10 bg-[#0c0714] p-6 sm:p-8'>
			<div className='flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10'>
				{/* Left: heading + blurb */}
				<div className='lg:w-72 shrink-0'>
					<h2 className='text-xl sm:text-2xl font-extrabold text-white'>
						Why Players Love It
					</h2>
					<p className='mt-2 text-sm text-white/50 leading-relaxed'>
						Immersive storytelling, stacked wilds, and expanding symbols create
						thrilling moments and big wins.
					</p>
				</div>

				{/* Right: feature list */}
				<div className='flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6'>
					{FEATURES.map((feature) => {
						const Icon = feature.icon;
						return (
							<div key={feature.title} className='flex items-start gap-3'>
								<div
									className='w-10 h-10 rounded-lg flex items-center justify-center shrink-0'
									style={{ backgroundColor: 'rgba(251,34,107,0.12)' }}>
									<Icon className='w-4 h-4' style={{ color: ACCENT }} />
								</div>
								<div>
									<h3 className='text-sm font-bold text-white'>
										{feature.title}
									</h3>
									<p className='mt-1 text-sm text-white/50 leading-snug'>
										{feature.description}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
