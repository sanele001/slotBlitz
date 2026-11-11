import 'server-only';
import { cache } from 'react';
import { supabase } from '../supabase';
import type { FilterKey, SlotFilters } from '../filters';
import type { Slot } from '../../types/slot';

const TABLE = 'slotcatalog';

const listQuery = () =>
	supabase.from(TABLE).select('*', { count: 'exact' });
type SlotQuery = ReturnType<typeof listQuery>;

// How each filter narrows the query. Column names match the slotcatalog table.
const APPLY_FILTER: Record<FilterKey, (q: SlotQuery, value: string) => SlotQuery> =
	{
		vendor: (q, value) => q.ilike('vendor', value),
		rtp: (q, value) => q.gte('rtp', Number(value)),
		volatility: (q, value) => q.eq('volatility', value),
		rank: (q, value) => q.gte('slotRank', Number(value)),
	};

/** One page of slots, with any filters applied, plus the matching total. */
export async function getSlots({
	filters = {},
	page,
	pageSize,
}: {
	filters?: SlotFilters;
	page: number;
	pageSize: number;
}): Promise<{ slots: Slot[]; total: number }> {
	let query = listQuery();
	for (const key of Object.keys(filters) as FilterKey[]) {
		const value = filters[key];
		if (value) query = APPLY_FILTER[key](query, value);
	}

	const from = (page - 1) * pageSize;
	const { data, count, error } = await query.range(from, from + pageSize - 1);
	if (error) throw error;

	return { slots: (data ?? []) as Slot[], total: count ?? 0 };
}

/** The first `limit` slots, for the home page. */
export async function getFeaturedSlots(limit: number): Promise<Slot[]> {
	const { data, error } = await supabase.from(TABLE).select('*').limit(limit);
	if (error) throw error;
	return (data ?? []) as Slot[];
}

/** One slot by slug, or null when it doesn't exist. Cached per request. */
export const getSlotBySlug = cache(async (slug: string): Promise<Slot | null> => {
	const { data, error } = await supabase
		.from(TABLE)
		.select('*')
		.eq('gameSlug', slug)
		.maybeSingle();
	if (error) throw error;
	return (data as Slot | null) ?? null;
});

/** Name search for the dropdown. */
export async function searchSlots(
	query: string,
	limit = 5,
): Promise<Pick<Slot, 'gameName' | 'gameSlug'>[]> {
	const { data, error } = await supabase
		.from(TABLE)
		.select('gameName, gameSlug')
		.ilike('gameName', `%${query}%`)
		.limit(limit);
	if (error) throw error;
	return data ?? [];
}
