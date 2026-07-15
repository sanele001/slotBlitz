export interface Slot {
	gameId: number;
	customerGameId: string;

	vendorName: string;
	gameName: string;
	gameSlug: string;
	type: string;

	releaseDate: string;
	wideReleaseDate: string | null;
	releaseDateComment: string;

	endOfLifeDate: string | null;

	rtp: number;
	rtpComments: string;

	volatility: string;
	volatilityComment: string | null;

	hitFrequency: number | null;
	hitFrequencyComment: string;

	paylines: number;
	paylinesComments: string;

	isExclusive: number;
	isLinesSetup: number;
	isBothway: number;

	layout: string;
	layoutComment: string;

	minBet: number;
	maxBet: number;
	betComment: string;

	maxMultiplier: number;
	maxCoinWin: number | null;
	maxWinComment: string;

	gameSizeMb: number;

	slotRank: number;

	dtLastUpdate: string;

	demoGameLink: string;
	demoWidget: string;
	demoInstallPWA: string;

	imageSquare: string;
	imageLandscape: string;

	slotRanks: SlotRank[];

	tags: Tag[];

	description: Description[];

	content: Content[];

	relations: Relation[];

	themes: string[];

	features: string[];
}

export interface SlotRank {
	rankId?: number;
	rankName?: string;
	value?: number;
	[key: string]: unknown;
}

export interface Tag {
	tagId?: number;
	tagName?: string;
	tagSlug?: string;
	[key: string]: unknown;
}

export interface Description {
	language?: string;
	title?: string;
	text?: string;
	[key: string]: unknown;
}

export interface Content {
	title?: string;
	body?: string;
	language?: string;
	[key: string]: unknown;
}

export interface Relation {
	gameId?: number;
	relationType?: string;
	[key: string]: unknown;
}
