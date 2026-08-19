import {
	FaHome,
	FaNewspaper,
	FaCompass,
	FaBars,
	FaTimes,
} from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { MdBusiness } from 'react-icons/md';

export const gameConfig = {
	sortingInfo: {
		itemsPerPage: 15,
		featuredItemsPerPage: 9,
		maxRating: 10,
	},
	navItems: [
		{ label: 'Home', href: '/', icon: FaHome },
		{ label: 'Slots', href: '/slots', icon: BsGridFill },
		{ label: 'Providers', href: '/providers', icon: MdBusiness },
		{ label: 'News', href: '/news', icon: FaNewspaper },
		{ label: 'Reviews', href: '/reviews', icon: FaCompass },
	],
};
