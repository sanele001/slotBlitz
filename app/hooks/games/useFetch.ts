import { supabase } from '../../../dbclient/superBaseClient';

// returns limited records
export const usefetchSlotsAndreviews = async (amount: number) => {
	try {
		const [slotdata, review] = await Promise.all([
			supabase.from('slotdata').select('*').limit(amount),
			supabase.from('review').select('*').limit(amount),
		]);

		// Check each for errors
		if (slotdata.error) throw slotdata.error;
		if (review.error) throw review.error;

		return {
			slots: slotdata.data,
			reviews: review.data,
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
};

// return game record
export const usefetchgame = async (slug: string) => {
	const { data: slotdata, error } = await supabase
		.from('slotdata')
		.select('*')
		.eq('gameSlug', slug)
		.single();

	if (error) {
		console.error('Error fetching game:', error);
	}
	return slotdata;
};

// returns all records count
export const useFetchSlotCount = async () => {
	const { count, error } = await supabase
		.from('slotdata')
		.select('*', { count: 'exact', head: true });
	if (error) {
		console.error('Error fetching slot count:', error);
		return 0;
	}
	return count || 0;
};

// returns searched records
interface SearchResult {
	gameName: string;
	gameSlug: string;
}
export const useSearchGames = async (
	query: string,
): Promise<SearchResult[]> => {
	const normalizedQuery = query.trim();

	if (!normalizedQuery) {
		return [];
	}

	const { data, error } = await supabase
		.from('slotdata')
		.select('gameName, gameSlug')
		.ilike('gameName', `%${normalizedQuery}%`)
		.limit(5);

	if (error) {
		console.error('Error searching games:', error);
		return [];
	}

	return data || [];
};
