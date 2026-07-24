import Home from './index';
import { useFetch } from './hooks/useFetch';
import { requestOptions } from './config/api';

export default async function Page() {
	const slotData = await useFetch(
		'http://localhost:1337/api/slots',
		requestOptions,
	);

	return <Home slotDataProps={slotData} />;
}
