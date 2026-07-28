import Image from 'next/image';
import { Slot } from '../../types/slot';
import Link from 'next/link';

type SlotCardProps = {
	game: {
		title: string;
		description: string;
		image: string;
		gameName: string;
		reliaseDateComment: string;
		imageLandscape: string;
		gameSlug: string;
	};
};

const SlotCard = ({ game }: SlotCardProps) => {
	return (
		<div className='bg-dark-light p-4 rounded-2xl'>
			<div className='bg-dark h-48 mb-4 rounded-lg flex items-center justify-center'>
				<div
					style={{ backgroundImage: `url(${game.imageLandscape})` }}
					className='w-full h-full rounded-lg bg-cover bg-top bg-no-repeat'></div>
			</div>
			<h4 className='text-xl font-bold text-white mb-2'>{game.gameName}</h4>
			<p className='text-gray-400'>
				{game.reliaseDateComment || 'comments are currently unavailable'}
			</p>
			<Link
				className='mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-opacity-80 transition-colors inline-block'
				href={`/games/${game.gameSlug}`}>
				View Details
			</Link>
		</div>
	);
};

export default SlotCard;
