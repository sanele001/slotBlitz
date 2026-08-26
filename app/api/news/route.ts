import NewsAPI from 'newsapi';
import { NextResponse } from 'next/server';
import { gameConfig } from '../../config/game';

const newsApiKey = process.env.NEXT_PUBLIC_ARTICLES;

export const revalidate = 900;

export async function GET() {
	if (!newsApiKey) {
		return NextResponse.json(
			{ error: 'News API key is not configured.' },
			{ status: 500 },
		);
	}

	try {
		const newsapi = new NewsAPI(newsApiKey);
		const data = await newsapi.v2.everything({
			q: gameConfig.newsQuery,
			language: 'en',
			sortBy: 'publishedAt',
			pageSize: 15,
		});

		return NextResponse.json(data);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'News API request failed.';
		return NextResponse.json({ error: message }, { status: 502 });
	}
}
