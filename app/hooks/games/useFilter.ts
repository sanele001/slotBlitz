import { supabase } from '../../../dbclient/superBaseClient';
export async function useFilterSlots(filter: string) {
	let query;

	switch (filter) {
		case 'amazon':
			query = supabase.from('slot').select('*').eq('provider', 'amazon');
			break;

		case 'highRtp':
			query = supabase.from('slot').select('*').gte('rtp', 96);
			break;

		case 'highVolatility':
			query = supabase.from('slot').select('*').eq('volatility', 'high');
			break;

		case 'topRanked':
			query = supabase.from('slot').select('*').gte('slot_rank', 6);
			break;

		case 'amazonHighRtp':
			query = supabase
				.from('slot')
				.select('*')
				.eq('provider', 'amazon')
				.gte('rtp', 96);
			break;

		case 'recommended':
			query = supabase
				.from('slot')
				.select('*')
				.eq('provider', 'amazon')
				.gte('rtp', 96)
				.eq('volatility', 'high')
				.gte('slot_rank', 6);
			break;

		default:
			// Reset filters
			query = supabase.from('slot').select('*').limit(12);
			break;
	}

	const { data, error } = await query;

	if (error) {
		console.error(error);
		return [];
	}

	return data;
}
