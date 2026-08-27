import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsCard from '../../../components/news/NewsCard';

describe('NewsCard', () => {
	it('renders the article content and link', () => {
		render(
			<NewsCard
				article={{
					slug: 'test-article',
					thumbnail: 'https://example.com/article.jpg',
					category: 'Industry News',
					title: 'Test article title',
					excerpt: 'Test article excerpt',
					date: 'Aug 27, 2026',
					readTime: '5 min read',
				}}
			/>,
		);

		expect(screen.getByRole('link')).toHaveAttribute(
			'href',
			'/news/test-article',
		);
		expect(
			screen.getByRole('heading', { name: 'Test article title' }),
		).toBeInTheDocument();
		expect(screen.getByText('Read More')).toBeInTheDocument();
		expect(
			screen.getByRole('img', { name: 'Test article title' }),
		).toHaveAttribute('src', 'https://example.com/article.jpg');
	});
});
