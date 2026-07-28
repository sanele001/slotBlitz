import Home from './index';
import { usefetchSlotsAndreviews } from './hooks/games/useFetch';

export default async function Page() {
	const response = await usefetchSlotsAndreviews(9);

	return (
		<Home slotDataProps={response.slots} reviewDataProps={response.reviews} />
	);
}
