/**
 * Slot filters, shared by the FilterBar (what to show) and the data layer
 * (how to query). Add a filter here once and both pick it up.
 *
 * Filters live in the URL: /slots?vendor=Games+Global&volatility=HIGH&page=2
 */

export const FILTER_GROUPS = [
	{
		key: 'vendor',
		label: 'Providers',
		options: [
			{ value: 'Pragmatic Play', label: 'Pragmatic Play' },
			{ value: 'Games Global', label: 'Games Global' },
			{ value: "Play'n GO", label: "Play'n GO" },
		],
	},
	{
		key: 'rtp',
		label: 'RTP',
		options: [{ value: '96', label: '96%+' }],
	},
	{
		key: 'volatility',
		label: 'Volatility',
		options: [
			{ value: 'LOW', label: 'Low' },
			{ value: 'MED', label: 'Med' },
			{ value: 'HIGH', label: 'High' },
		],
	},
	{
		key: 'rank',
		label: 'Slot Rank',
		options: [{ value: '6', label: '6+' }],
	},
] as const;

export type FilterKey = (typeof FILTER_GROUPS)[number]['key'];
export type SlotFilters = Partial<Record<FilterKey, string>>;

type RawSearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) =>
	Array.isArray(value) ? value[0] : value;

/** Reads filters from the URL, keeping only values we actually offer. */
export function parseFilters(searchParams: RawSearchParams): SlotFilters {
	const filters: SlotFilters = {};
	for (const group of FILTER_GROUPS) {
		const value = first(searchParams[group.key]);
		if (group.options.some((option) => option.value === value)) {
			filters[group.key] = value;
		}
	}
	return filters;
}

/** Reads a 1-based page number from the URL, falling back to 1. */
export function parsePage(value: string | string[] | undefined): number {
	const page = Number(first(value));
	return Number.isSafeInteger(page) && page >= 1 ? page : 1;
}

/** Builds /slots?... for a set of filters and a page (page 1 is omitted). */
export function buildSlotsHref(filters: SlotFilters, page = 1): string {
	const params = new URLSearchParams();
	for (const group of FILTER_GROUPS) {
		const value = filters[group.key];
		if (value) params.set(group.key, value);
	}
	if (page > 1) params.set('page', String(page));
	const query = params.toString();
	return query ? `/slots?${query}` : '/slots';
}
