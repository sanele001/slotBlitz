import { NextResponse } from 'next/server';
import { gameConfig } from '../../config/game';

const newsApiKey = process.env.NEWS_API_KEY;

export const revalidate = 900;

export async function GET() {
	if (!newsApiKey) {
		return NextResponse.json(
			{ error: 'News API key is not configured.' },
			{ status: 500 },
		);
	}

	try {
		const params = new URLSearchParams({
			q: gameConfig.newsQuery,
			language: 'en',
			sortBy: 'publishedAt',
			pageSize: '15',
			apiKey: newsApiKey,
		});

		const response = await fetch(
			`https://newsapi.org/v2/everything?${params.toString()}`,
			{
				next: { revalidate: 900 },
			},
		);

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json(
				{ error: data.message ?? 'News API request failed.' },
				{ status: response.status },
			);
		}

		return NextResponse.json(data);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'News API request failed.';

		return NextResponse.json({ error: message }, { status: 502 });
	}
}
