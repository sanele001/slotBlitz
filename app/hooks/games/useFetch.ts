// returns limited records
export const usefetchSlotsAndreviews = async (amount: number) => {
	try {
		const response = await fetch(`/api/slots?amount=${amount}`);
		if (!response.ok) throw new Error('Unable to fetch slots and reviews.');
		return await response.json();
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
};

// return game record
export const usefetchgame = async (slug: string) => {
	const response = await fetch(`/api/slots/${encodeURIComponent(slug)}`);
	if (!response.ok) {
		const data = await response.json().catch(() => null);
		console.error('Error fetching game:', data?.error ?? response.statusText);
		return null;
	}
	return await response.json();
};

// returns all records count
export const useFetchSlotCount = async () => {
	const response = await fetch('/api/slots/count');
	if (!response.ok) return 0;
	const data = await response.json();
	return data.count || 0;
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

	const response = await fetch(
		`/api/slots?query=${encodeURIComponent(normalizedQuery)}`,
	);
	if (!response.ok) return [];
	return await response.json();
};
