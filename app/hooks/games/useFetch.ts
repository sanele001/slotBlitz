import { supabase } from '../../../dbclient/superBaseClient';

// returns limited records
export const usefetchSlotsAndreviews = async (amount: number) => {
	try {
		const [slot, review] = await Promise.all([
			supabase.from('slot').select('*').limit(amount),
			supabase.from('review').select('*').limit(amount),
		]);

		// Check each for errors
		if (slot.error) throw slot.error;
		if (review.error) throw review.error;

		return {
			slots: slot.data,
			reviews: review.data,
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
};

// return game record
export const usefetchgame = async (slug: string) => {
	const { data: slot, error } = await supabase
		.from('slot')
		.select('*')
		.eq('gameSlug', slug)
		.single();

	if (error) {
		console.error('Error fetching game:', error);
	}
	return slot;
};
