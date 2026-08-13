import React from 'react';
import Link from 'next/link';
import { FaPlay, FaHeart } from 'react-icons/fa';

interface GameCTAButtonsProps {
	slug: string;
	onAddToFavorites?: () => void;
	isFavorite?: boolean;
}

export const GameCTAButtons: React.FC<GameCTAButtonsProps> = ({
	slug,
	onAddToFavorites,
	isFavorite = false,
}) => {
	return (
		<div className='flex flex-col md:flex-row gap-4 mt-8'>
			<Link href={`/games/demo/${slug}`} className='flex-1 md:flex-none'>
				<button className='w-full md:w-auto px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2'>
					<FaPlay className='h-4 w-4' />
					Play Demo
				</button>
			</Link>

			<button
				onClick={onAddToFavorites}
				className={`flex-1 md:flex-none px-8 py-3 border-2 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
					isFavorite
						? 'border-red-600 bg-red-600/10 text-red-400 hover:bg-red-600/20'
						: 'border-white/[0.2] text-white hover:border-white/[0.4]'
				}`}>
				<FaHeart className={`h-4 w-4 ${isFavorite ? 'text-red-400' : ''}`} />
				Add to Favorites
			</button>
		</div>
	);
};
