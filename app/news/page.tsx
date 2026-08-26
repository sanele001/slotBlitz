'use client';
import React, { useEffect, useState } from 'react';
import NewsCard from '../../components/news/NewsCard';
import FliudHeroSection from '../../components/siteComponets/Hero/fluidHero';
import Footer from '../../components/siteComponets/footer/Footer';
import { Article, fetchArticles } from '../hooks/news/useFetchArticles';
import Loader from '../../components/siteComponets/loader/Loader';

export type cardArticle = {
	slug: string;
	thumbnail: string;
	category: string;
	title: string;
	excerpt: string;
	date: string;
	readTime: string;
};

export default function Page() {
	const [articles, setArticles] = useState<Article[]>([]);
	const [cardArticles, setCardArticles] = useState<cardArticle[]>([]);

	useEffect(() => {
		const loadArticles = async () => {
			try {
				const fetchedArticles = await fetchArticles();
				setArticles(fetchedArticles);
			} catch (error) {
				console.error('Error fetching news:', error);
			}
		};
		loadArticles();
	}, []);

	useEffect(() => {
		const cardArticles = articles.map((article) => ({
			slug: encodeURIComponent(
				article.title.toLowerCase().replace(/\s+/g, '-'),
			),
			thumbnail: article.urlToImage ?? '/images/news-pragmatic-release.png',
			category: article.source.name,
			title: article.title,
			excerpt:
				article.description ?? 'Read the latest news from the gaming industry.',
			date: new Date(article.publishedAt).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric',
			}),
			readTime: '5 min read',
		}));
		setCardArticles(cardArticles);
	}, [articles]);

	return (
		<section className='px-1 py-3 items-center'>
			<FliudHeroSection />
			<div className='mx-auto max-w-7xl border border-white/[0.06]  rounded-3xl p-6'>
				{/* {dynamic rendering} */}
				{cardArticles.length > 0 ? (
					<div className='grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-3'>
						{cardArticles.map((article) => (
							<NewsCard key={article.slug} article={article} />
						))}
					</div>
				) : (
					<Loader />
				)}
			</div>
			<Footer />
		</section>
	);
}
