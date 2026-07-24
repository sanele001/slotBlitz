import {
	FiCalendar,
	FiGrid,
	FiPackage,
	FiAward,
	FiTarget,
	FiBarChart2,
} from 'react-icons/fi';

const gameInfo = [
	{
		label: 'Release Date',
		value: 'Jan 31, 2025',
		icon: FiCalendar,
	},
	{
		label: 'Provider',
		value: 'Pragmatic Play',
		icon: FiGrid,
	},
	{
		label: 'Reels / Rows',
		value: '6 Reels / 5 Rows',
		icon: FiPackage,
	},
	{
		label: 'Max Win',
		value: '25,000x',
		icon: FiAward,
	},
	{
		label: 'RTP',
		value: '96.51%',
		icon: FiTarget,
	},
	{
		label: 'Volatility',
		value: 'High',
		icon: FiBarChart2,
	},
];

export default function ReviewBar() {
	return (
		<section className='mx-auto mt-6 max-w-7xl rounded-2xl border border-white/10 bg-[#0c0714]'>
			<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'>
				{gameInfo.map((item, index) => {
					const Icon = item.icon;

					return (
						<div
							key={item.label}
							className={`
                flex items-center gap-3 p-4
                ${
									index !== gameInfo.length - 1
										? 'border-b border-white/10 lg:border-b-0 lg:border-r'
										: ''
								}
                ${index < 4 ? 'sm:border-r sm:border-white/10' : ''}
              `}>
							<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#120b20] text-pink-500'>
								<Icon className='h-5 w-5' />
							</div>

							<div className='min-w-0'>
								<p className='text-[11px] uppercase tracking-wide text-white/45'>
									{item.label}
								</p>

								<p className='truncate text-sm font-semibold text-white'>
									{item.value}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
