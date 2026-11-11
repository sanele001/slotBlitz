export interface SearchResult {
	gameName: string;
	gameSlug: string;
}

/** Browser-side call to the search endpoint (used by the navbar and filter bar). */
export async function searchGames(query: string): Promise<SearchResult[]> {
	const normalizedQuery = query.trim();
	if (!normalizedQuery) return [];

	const response = await fetch(
		`/api/slots?query=${encodeURIComponent(normalizedQuery)}`,
	);
	if (!response.ok) return [];
	return await response.json();
}
