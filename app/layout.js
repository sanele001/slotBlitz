import '../styles/globals.css';
import Navbar from '../components/siteComponets/nav/Navbar';
import Footer from '../components/siteComponets/footer/Footer';

export const metadata = {
	title: 'SlotBlitz',
	description: 'Discover and review the best online slot games',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
