export async function useFilterSlots(
	filter: string,
	limit: number = 15,
	offset: number = 0,
) {
	const params = new URLSearchParams({
		filter,
		limit: String(limit),
		offset: String(offset),
	});
	const response = await fetch(`/api/slots?${params}`);
	if (!response.ok) return [];
	return await response.json();
}
