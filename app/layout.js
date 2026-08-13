import '../styles/globals.css';
import Navbar from '../components/siteComponets/nav/Navbar';

export const metadata = {
	title: 'webslots.africa',
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
