import { supabase } from '../../../dbclient/superBaseClient';
export async function useFilterSlots(filter: string) {
	let query;

	switch (filter) {
		case 'Pragmatic Play':
		case 'Games Global':
		case "Play'n GO":
			query = supabase.from('slotdata').select('*').eq('vendor', filter);
			break;

		case '96%+':
			query = supabase.from('slotdata').select('*').gte('rtp', filter);
			break;

		case 'Low':
		case 'High':
		case 'Med':
			query = supabase
				.from('slotdata')
				.select('*')
				.eq('volatility', filter.toUpperCase());
			break;

		case '6+':
			query = supabase.from('slotdata').select('*').gte('slotRank', filter);
			break;

		case 'amazonHighRtp':
			query = supabase
				.from('slotdata')
				.select('*')
				.eq('provider', 'amazon')
				.gte('rtp', 96);
			break;

		case 'recommended':
			query = supabase
				.from('slotdata')
				.select('*')
				.eq('provider', 'amazon')
				.gte('rtp', 96)
				.eq('volatility', 'high')
				.gte('slot_rank', 6);
			break;

		default:
			// Reset filters
			query = supabase.from('slotdata').select('*').limit(12).range(10, 21);
			break;
	}

	const { data, error } = await query;

	if (error) {
		console.error(error);
		return [];
	}

	return data;
}
