import Home from './index';
//import { getSlotsData } from '../services/slotApi/slotService';
import { Slot } from '../types/slot';
import { dummyData } from '../dummydata';

const requestInfo = {
	baseUrl: process.env.BASE_URL,
	clientId: process.env.CLIENT_ID,
	token: process.env.MY_TOKEN,
};
export default async function Page() {
	// let data: Slot[] = [];
	// try {
	// 	const testData = await fetch(getSlotsData(requestInfo));
	// 	const resp = await testData.json();
	// 	data = resp.data;
	// } catch (error) {
	// 	console.error('Error fetching data from API:', error);
	// 	throw error;
	// }
	const test = JSON.parse(JSON.stringify(dummyData));
	return <Home slodataProps={test} />;
}
