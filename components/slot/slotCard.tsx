import Image from 'next/image';

type SlotCardProps = {
	game: {
		title: string;
		description: string;
		image: string;
	};
};

const SlotCard = ({ game }: SlotCardProps) => {
	return (
		<div className='bg-dark-light p-4 rounded-2xl'>
			<div className='bg-dark h-48 mb-4 rounded-lg flex items-center justify-center'>
				<Image
					src={game.image}
					alt={game.title}
					width={400}
					height={200}
					className='w-full h-full object-cover'
				/>
			</div>
			<h4 className='text-xl font-bold text-white mb-2'>{game.title}</h4>
			<p className='text-gray-400'>{game.description}</p>
		</div>
	);
};

export default SlotCard;
