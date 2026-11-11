import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DemoGame from '../../../../components/pages/DemoGame';
import { getSlotBySlug } from '../../../../lib/data/slots';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const game = await getSlotBySlug(slug);
	if (!game) return {};

	return { title: `Play ${game.gameName} Demo - Slot Review` };
}

export default async function DemoPage({ params }: Props) {
	const { slug } = await params;
	const game = await getSlotBySlug(slug);
	if (!game) notFound();

	return <DemoGame game={game} slug={slug} />;
}
