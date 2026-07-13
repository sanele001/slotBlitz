import { motion } from 'framer-motion';
import styles from '../../styles/localStyle.module.css';

const HeroBanner = () => {
	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className='px-6 py-12'
			id={styles['home-page']}>
			<div className='max-w-4xl mx-auto text-center'>
				<h2 className='text-5xl font-bold text-white mb-6'>
					Discover the Best Online Slots
				</h2>
				<p className='text-xl text-gray-400 mb-8'>
					Expert reviews, free demos, and detailed information about the latest
					slot games
				</p>
			</div>
		</motion.section>
	);
};

export default HeroBanner;
