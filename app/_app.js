import React from 'react';
import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/next';

const MyApp = ({ Component, pageProps }) => {
	returnz(
		<>
			<Component {...pageProps} />;
			<Analytics />
		</>,
	);
};

export default MyApp;
