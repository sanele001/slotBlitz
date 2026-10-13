import { FaHome, FaNewspaper, FaCompass,FaCalculator } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';

export const gameConfig = {
	sortingInfo: {
		itemsPerPage: 15,
		featuredItemsPerPage: 9,
		maxRating: 10,
	},
	navItems: [
		{ label: 'Home', href: '/', icon: FaHome },
		{ label: 'Slots', href: '/slots', icon: BsGridFill },
		 { label: 'Bonus-Calculator', href: '/casino-bonus-calculator', icon: FaCalculator },
		{ label: 'News', href: '/news', icon: FaNewspaper },
		{ label: 'Reviews', href: '/reviews', icon: FaCompass },
	],

	news: {
		newsQuery:
			'(casino OR casinos OR gambling OR "online gambling" OR "online casino" OR iGaming OR sportsbook OR sportsbooks OR "sports betting" OR "online betting" OR slots OR "slot machine" OR poker OR "online poker" OR blackjack OR roulette OR baccarat OR "live casino" OR "casino games" OR wagering)',
		pageSize: '21',
	},

	fluideHeroProps: {
		slots: {
			route: 'slots',
			heading: 'Online Slots',
			summary:
				'Expert reviews, free demos, and detailed information about the latest slot games.',
		},
		news: {
			route: 'news',
			heading: 'Latest news ',
			summary:
				'Stay infomed about what is heppening in the indistry. checkout some good reads from more than 15000 sources.',
		},
		calculator:{
			route: 'bonus-calculator',
			heading:"Casino Bonus calculator",
			summary: 'Do not guess your playthrough. Input any offer into our Instant Bonus Valuation Tool to see the hidden wagering totals before you sign up!'
		}
	},

	placeholders: {
		description:
			'A description for this game is not available at the moment. Our team is currently working on updating the game information and adding a detailed description. Please check back later for the latest details and a complete overview of the game.',
	},
};
