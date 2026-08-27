import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsCard from '../../../components/news/NewsCard';

describe('NewsCard', () => {
	it('renders the article content and read more button', () => {
		render(
			<NewsCard
				article={{
					thumbnail: 'https://example.com/article.jpg',
					category: 'Industry News',
					title: 'Test article title',
					excerpt: 'Test article excerpt',
					content: 'Full test article summary',
					sourceUrl: 'https://example.com/article',
					sourceName: 'Example News',
					date: 'Aug 27, 2026',
					readTime: '5 min read',
				}}
			/>,
		);

		expect(
			screen.getByRole('heading', { name: 'Test article title' }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /read more/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('img', { name: 'Test article title' }),
		).toHaveAttribute('src', 'https://example.com/article.jpg');
	});
});
