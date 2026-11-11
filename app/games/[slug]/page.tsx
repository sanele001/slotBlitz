import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GameDetails from '../../../components/pages/GameDetails';
import { getSlotBySlug } from '../../../lib/data/slots';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const game = await getSlotBySlug(slug);
	if (!game) return {};

	return {
		title: `${game.gameName} - Slot Review`,
		description: game.gameName,
	};
}

export default async function GamePage({ params }: Props) {
	const { slug } = await params;
	const game = await getSlotBySlug(slug);
	if (!game) notFound();

	return <GameDetails game={game} slug={slug} />;
}
