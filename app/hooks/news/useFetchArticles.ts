export type Article = {
	title: string;
	description: string | null;
	url: string;
	urlToImage: string | null;
	publishedAt: string;
	source: { name: string };
};

type ArticlesResponse = {
	articles: Article[];
};
export const fetchArticles = async (): Promise<Article[]> => {
	const response = await fetch('/api/news');
	const data = (await response.json()) as ArticlesResponse & { error?: string };

	if (!response.ok) {
		throw new Error(data.error ?? 'Unable to fetch news articles.');
	}

	return data.articles;
};
