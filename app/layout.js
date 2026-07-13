import '../styles/globals.css';

export const metadata = {
	title: 'SlotBlitz',
	description: 'Discover and review the best online slot games',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
