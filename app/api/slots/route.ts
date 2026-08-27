import { NextResponse } from 'next/server';
import { supabase } from '../../../dbclient/superBaseClient';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const amount = Number(searchParams.get('amount') ?? 9);
	const query = searchParams.get('query')?.trim();
	const filter = searchParams.get('filter');
	const limit = Number(searchParams.get('limit') ?? 15);
	const offset = Number(searchParams.get('offset') ?? 0);

	try {
		if (query) {
			const { data, error } = await supabase
				.from('slotdata')
				.select('gameName, gameSlug')
				.ilike('gameName', `%${query}%`)
				.limit(5);
			if (error) throw error;
			return NextResponse.json(data ?? []);
		}

		if (filter) {
			let filteredQuery = supabase.from('slotdata').select('*');
			switch (filter) {
				case 'Pragmatic Play':
				case 'Games Global':
				case "Play'n GO":
					filteredQuery = filteredQuery.eq('vendor', filter);
					break;
				case '96%+':
					filteredQuery = filteredQuery.gte('rtp', 96);
					break;
				case 'Low':
				case 'High':
				case 'Med':
					filteredQuery = filteredQuery.eq('volatility', filter.toUpperCase());
					break;
				case '6+':
					filteredQuery = filteredQuery.gte('slotRank', 6);
					break;
				case 'amazonHighRtp':
					filteredQuery = filteredQuery.eq('provider', 'amazon').gte('rtp', 96);
					break;
				case 'recommended':
					filteredQuery = filteredQuery
						.eq('provider', 'amazon')
						.gte('rtp', 96)
						.eq('volatility', 'high')
						.gte('slot_rank', 6);
					break;
			}
			const { data, error } = await filteredQuery.range(
				offset,
				offset + limit - 1,
			);
			if (error) throw error;
			return NextResponse.json(data ?? []);
		}

		const [slots, reviews] = await Promise.all([
			supabase.from('slotdata').select('*').limit(amount),
			supabase.from('review').select('*').limit(amount),
		]);
		if (slots.error) throw slots.error;
		if (reviews.error) throw reviews.error;
		return NextResponse.json({ slots: slots.data, reviews: reviews.data });
	} catch (error) {
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : 'Unable to fetch slots.',
			},
			{ status: 500 },
		);
	}
}
