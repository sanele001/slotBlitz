export interface ReviewSummary {
	reviewSlug: string;
	title?: string | null;
	provider?: string | null;
	rating?: number | null;
	imageUrl?: string | null;
	type?: string | null;
	author?: string | null;
	description?: string | null;
}

/** A full row of the `review` table, including the review detail content. */
export interface Review extends ReviewSummary {
	badge?: string | null;
	playUrl?: string | null;
	providerUrl?: string | null;
	createdAt?: string | null;
	gameInfo: { icon: string; label: string; value: string }[];
	keyFeatures: { features: string[] };
	pros: { pros: string[] };
	cons: { cons: string[] };
	verdict: { verdict: { text: string; rating: string } };
}

export interface ReviewData {
	badge: string;
	createdAt: string;
	demoGameLink: string;
	description: string;
	documentId: string;
	feature: Array<Record<string, any>>; // or define a more specific type if you know the structure
	gameId: number;
	gameName: string;
	gameSizeMb: number;
	gameSlug: string;
	id: number;
	imageLandscape: string;
	imageSquare: string;
	isExclusive: number; // 0 or 1 (boolean-like)
	maxBet: number;
	maxMultiplier: number;
	minBet: number;
	payWays: number;
	publishedAt: string;
	releaseDate: string;
	rtp: number;
	rtpComments: string;
	slotRank: number;
	theme: string;
	type: string;
	updatedAt: string;
	vendorName: string;
	volatility: string; // "MED", "HIGH", "LOW", etc.
}
