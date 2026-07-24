import GameReviewCard from '../../components/reviews/GameReviewCard';
import ReviewBar from '../../components/reviews/reviewBar';
import GameOverview from '../../components/reviews/reviewTextSection';

export default async function Page() {
	return (
		<>
			<div>
				<GameReviewCard />
				<ReviewBar />
				<GameOverview />
			</div>
		</>
	);
}
