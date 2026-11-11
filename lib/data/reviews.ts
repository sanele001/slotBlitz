import 'server-only';
import { cache } from 'react';
import { supabase } from '../supabase';
import type { Review, ReviewSummary } from '../../types/review';

const TABLE = 'review';

// The list page only needs these columns, not the full nested review body.
const SUMMARY_COLUMNS =
	'reviewSlug, title, provider, rating, imageUrl, type, author, description';

/** One page of review summaries, with the total count. */
export async function getReviews({
	page,
	pageSize,
}: {
	page: number;
	pageSize: number;
}): Promise<{ reviews: ReviewSummary[]; total: number }> {
	const from = (page - 1) * pageSize;
	const { data, count, error } = await supabase
		.from(TABLE)
		.select(SUMMARY_COLUMNS, { count: 'exact' })
		.order('reviewSlug', { ascending: true })
		.range(from, from + pageSize - 1);
	if (error) throw error;

	return { reviews: (data ?? []) as unknown as ReviewSummary[], total: count ?? 0 };
}

/** The first `limit` full reviews, for the home page. */
export async function getLatestReviews(limit: number): Promise<Review[]> {
	const { data, error } = await supabase.from(TABLE).select('*').limit(limit);
	if (error) throw error;
	return (data ?? []) as Review[];
}

/** One review by slug, or null when it doesn't exist. Cached per request. */
export const getReviewBySlug = cache(
	async (slug: string): Promise<Review | null> => {
		const { data, error } = await supabase
			.from(TABLE)
			.select('*')
			.eq('reviewSlug', slug)
			.maybeSingle();
		if (error) throw error;
		return (data as Review | null) ?? null;
	},
);
