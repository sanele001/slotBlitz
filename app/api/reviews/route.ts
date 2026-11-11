import { NextResponse } from 'next/server';
import { supabase } from '../../../dbclient/superBaseClient';

const REVIEWS_PER_PAGE = 10;

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const page = Number(searchParams.get('page') ?? 1);

	if (!Number.isSafeInteger(page) || page < 1) {
		return NextResponse.json(
			{ error: 'Page must be a positive integer.' },
			{ status: 400 },
		);
	}

	const start = (page - 1) * REVIEWS_PER_PAGE;
	if (
		!Number.isSafeInteger(start) ||
		start > Number.MAX_SAFE_INTEGER - (REVIEWS_PER_PAGE - 1)
	) {
		return NextResponse.json(
			{ error: 'Requested page is out of range.' },
			{ status: 400 },
		);
	}

	try {
		const { data, count, error } = await supabase
			.from('review')
			.select('*', { count: 'exact' })
			.order('reviewSlug', { ascending: true })
			.range(start, start + REVIEWS_PER_PAGE - 1);

		if (error) throw error;

		return NextResponse.json({
			reviews: data ?? [],
			total: count ?? 0,
		});
	} catch (error) {
		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: 'Unable to fetch reviews.',
			},
			{ status: 500 },
		);
	}
}
