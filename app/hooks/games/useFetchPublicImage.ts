import { supabase } from '../../../dbclient/superBaseClient';

export const usefetchPublicImage = (imagePath: string) => {
	const safePath = imagePath?.trim();

	if (!safePath) return null;

	const candidates = [
		`compressed_Public/squareImages/${safePath}.jpg`,
		`compressed_Public/sqaureImages/${safePath}.jpg`,
	];

	for (const candidate of candidates) {
		const { data } = supabase.storage
			.from('gameThumbnails')
			.getPublicUrl(candidate);

		if (data?.publicUrl) return data.publicUrl;
	}

	return null;
};
