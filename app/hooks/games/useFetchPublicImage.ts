export const usefetchPublicImage = (imagePath: string) => {
	const safePath = imagePath?.trim();

	if (!safePath) return null;

	return `/api/images/${encodeURIComponent(safePath)}`;
};
