export interface Slot {
	id: number;
	gameId: number;
	vendorName: string;
	gameName: string;
	gameSlug: string;
	type: string;

	releaseDate: string;

	rtp: number;
	rtpComments: string;

	volatility: string;
	volatilityComment: string | null;

	hitFrequency: number | null;
	hitFrequencyComment: string;

	paylines: number;
	paylinesComments: string;

	isExclusive: number;

	minBet: number;
	maxBet: number;
	betComment: string;

	maxMultiplier: number;
	gameSizeMb: number;
	slotRank: number;

	demoGameLink: string;
	imageSquare: string;
	imageLandscape: string;

	description: string;
	theme: string;
	feature: string[];
}
