import { IconType } from 'react-icons';
import { FaShareNodes } from 'react-icons/fa6';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { Slot } from '../../types/slot';
import { GiRose } from 'react-icons/gi';

/**
 * GameInfoCard
 * ------------
 * Displays key game details (provider, release date, reels, paylines, theme)
 * as a vertical list of icon + label + value rows.
 */

interface GameInfoItem {
	icon: IconType;
	label: string;
	value: string;
}

interface GameInfoCardProps {
	game: Slot;
}

export default function VerticalGameInfoCard({ game }: GameInfoCardProps) {
	// Mock data — replace with real game data
	const iconToValueMap: GameInfoItem[] = [
		{ icon: FaShareNodes, label: 'Provider', value: game.vendorName },
		{ icon: FaRegCalendarAlt, label: 'Release Date', value: game.releaseDate },
		{ icon: BsGrid3X3GapFill, label: 'Reels', value: '3-5' },
		{ icon: FaShareNodes, label: 'Paylines', value: game.type },
		{ icon: GiRose, label: 'Theme', value: game.theme },
	];
	return (
		<div className='w-full max-w-xs rounded-2xl    p-3 shadow-xl'>
			{iconToValueMap.map((item, index) => {
				const Icon = item.icon;
				return (
					<div
						key={item.label}
						className={`flex items-center gap-3 py-3 px-2 ${
							index !== iconToValueMap.length - 1
								? 'border-b border-white/5'
								: ''
						}`}>
						<div className='flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 shrink-0'>
							<Icon className='w-4 h-4 text-red-500' />
						</div>
						<div className='flex flex-col'>
							<span className='text-xs text-white/50'>{item.label}</span>
							<span className='text-sm font-semibold text-white'>
								{item.value}
							</span>
						</div>
					</div>
				);
			})}
		</div>
	);
}
