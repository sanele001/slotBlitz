import '../styles/globals.css';
import Navbar from '../components/siteComponets/nav/Navbar';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
	title: 'webslots.africa',
	description: 'Discover and review the best online slot games',
	verification: {
		google: 'Ghaq_wRV7wkV7dc9rkLSnRLGoKQapLYBTLGiEjZ3FUY',
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<Navbar />
				{children}
				<Analytics />
			</body>
		</html>
	);
}
