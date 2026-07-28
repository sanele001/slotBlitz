import {
	FiCalendar,
	FiGrid,
	FiPackage,
	FiAward,
	FiTarget,
	FiBarChart2,
} from 'react-icons/fi';

type Barproptype = {
	label: string;
	value: string;
	icon: string;
};

type iconsList = {
	gameInfo: Barproptype[];
};

type barInfo = {
	feature: iconsList;
};

const iconDictionary = {
	icon_FiCalendar: FiCalendar,

	icon_FiGrid: FiGrid,

	icon_FiPackage: FiPackage,

	icon_FiAward: FiAward,

	icon_FiTarget: FiTarget,

	icon_FiBarChart2: FiBarChart2,
};

export default function ReviewBar({ feature }: barInfo) {
	return (
		<section className='mx-auto mt-6 max-w-7xl rounded-2xl border border-white/10 bg-[#0c0714]'>
			<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'>
				{feature.gameInfo.map((item, index) => {
					const Icon = iconDictionary[item.icon];

					return (
						<div
							key={item.label}
							className={`
                flex items-center gap-3 p-4
                ${
									index !== feature.gameInfo.length - 1
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
