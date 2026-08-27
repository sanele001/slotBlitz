// returns limited records
export const usefetchReviews = async (amount: number) => {
	// try {
	//     const [slot, review] = await Promise.all([
	//         supabase.from('slot').select('*').limit(amount),
	//         supabase.from('review').select('*').limit(amount),
	//     ]);
	//     // Check each for errors
	//     if (slot.error) throw slot.error;
	//     if (review.error) throw review.error;
	//     return {
	//         slots: slot.data,
	//         reviews: review.data,
	//     };
	// } catch (error) {
	//     console.error('Error fetching data:', error);
	//     return null;
	// }
};

// return game record
export const usefetchReview = async (slug: string | string[]) => {
	const response = await fetch(
		`/api/reviews/${encodeURIComponent(String(slug))}`,
	);
	if (!response.ok) return null;
	return await response.json();
};
