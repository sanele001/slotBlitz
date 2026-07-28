'use client';
import { useParams } from 'next/navigation';
import GameReviewCard from '../../components/reviews/GameReviewCard';
import ReviewBar from '../../components/reviews/reviewBar';
import { ReviewData } from '../../types/review';
import GameOverview from '../../components/reviews/reviewTextSection';
import { usefetchReview } from '../hooks/reviews/useFetchReviews';
import { useEffect, useState } from 'react';
import Footer from '../../components/siteComponets/footer/Footer';

interface ReviewDataResponse {
	data: ReviewData[];
}

type verdict = {
	rating: string;
	text: string;
};

type keyFeatures = {
	feature: string[];
};

type overviewProps = {
	pros: string[];
	cons: string[];
	verdict: verdict;
	keyFeatures: keyFeatures;
};
export default function GameReviewComp() {
	const [reviewInfo, setReviewInfo] = useState(null);
	const slug = useParams().slug;
	useEffect(() => {
		let isMounted = true;
		async function loadReviewdata() {
			if (isMounted) {
				const resp = await usefetchReview(slug);
				setReviewInfo(resp);
			}
		}

		loadReviewdata();

		return () => {
			isMounted = false;
		};
	}, [slug]);

	//  infomation for review
	const gameReview = {
		thumbnail: reviewInfo?.imageUrl,
		category: reviewInfo?.type,
		title: reviewInfo?.title,
		rating: reviewInfo?.rating,
		author: reviewInfo?.author,
		updatedDate: reviewInfo?.createdAt,
		description: reviewInfo?.description,
		playUrl: '#',
		providerUrl: '#',
	};

	const reviewBar = {
		gameInfo: reviewInfo?.gameInfo,
	};

	const gameOverview: overviewProps = {
		pros: reviewInfo?.pros,
		cons: reviewInfo?.cons,
		verdict: reviewInfo?.verdict,
		keyFeatures: reviewInfo?.keyFeatures,
	};

	return (
		<div>
			{reviewInfo && <GameReviewCard gameReview={gameReview} />}
			{reviewInfo && <ReviewBar feature={reviewBar} />}
			{reviewInfo && <GameOverview gameOverview={gameOverview} />}
			{reviewInfo && <Footer />}
		</div>
	);
}
