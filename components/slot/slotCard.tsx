import Image from 'next/image';
import { Slot } from '../../types/slot';

type SlotCardProps = {
	game: {
		title: string;
		description: string;
		image: string;
		gameName: string;
		reliaseDateComment: string;
		imageLandscape: string;
	};
};

const SlotCard = ({ game }: SlotCardProps) => {
	return (
		<div className='bg-dark-light p-2 rounded-2xl'>
			<div className='bg-dark h-48 mb-4 rounded-lg flex items-center justify-center'>
				<div
					style={{ backgroundImage: `url(${game.imageLandscape})` }}
					className='w-full h-full rounded-lg bg-cover bg-top bg-no-repeat'></div>
			</div>
			<h4 className='text-xl font-bold text-white mb-2'>{game.gameName}</h4>
			<p className='text-gray-400'>
				{game.reliaseDateComment || 'comments are currently unavailable'}
			</p>
		</div>
	);
};

export default SlotCard;
