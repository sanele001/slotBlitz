import { motion } from 'framer-motion';

type ReviewCardProps = {
	review: {
		title: string;
		description: string;
	};
};

const ReviewCard = ({ review }: ReviewCardProps) => {
	return (
		<motion.div
			key={review.title}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className='bg-dark p-6 rounded-xl'>
			<div className='flex items-start space-x-4'>
				<div className='bg-dark-light w-24 h-24 rounded-lg flex items-center justify-center'>
					<span className='text-gray-600 text-sm text-center px-2'>
						{review.title}
					</span>
				</div>
				<div>
					<h4 className='text-xl font-bold text-white mb-2'>{review.title}</h4>
					<div className='flex items-center mb-2'>
						{[...Array(5)].map((_, i) => (
							<span key={i} className='text-yellow-500'>
								★
							</span>
						))}
					</div>
					<p className='text-gray-400'>{review.description}</p>
				</div>
			</div>
		</motion.div>
	);
};

export default ReviewCard;
