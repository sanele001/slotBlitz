import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';

const HomeNav = () => {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<nav className='flex items-center justify-between px-6 py-4 bg-dark-light'>
			<div className='flex items-center space-x-2'>
				<motion.h1
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='text-2xl font-bold text-primary'>
					SlotBlitz
				</motion.h1>
			</div>

			<div className='flex items-center space-x-4'>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search slots...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='px-4 py-2 pl-10 bg-dark rounded-full text-white focus:outline-none focus:ring-2 focus:ring-primary'
					/>
					<FaSearch className='absolute left-3 top-3 text-gray-400' />
				</div>
				<FaBell className='text-gray-400 hover:text-primary cursor-pointer' />
				<FaUser className='text-gray-400 hover:text-primary cursor-pointer' />
			</div>
		</nav>
	);
};

export default HomeNav;
