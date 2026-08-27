import Home from './index';
import { supabase } from '../dbclient/superBaseClient';

export default async function Page() {
	const [slots, reviews] = await Promise.all([
		supabase.from('slotdata').select('*').limit(9),
		supabase.from('review').select('*').limit(9),
	]);

	if (slots.error) throw slots.error;
	if (reviews.error) throw reviews.error;

	return <Home slotDataProps={slots.data} reviewDataProps={reviews.data} />;
}
