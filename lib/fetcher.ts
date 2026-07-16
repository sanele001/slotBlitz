export function findGameBySlug(data, slug) {
	return data.find((game) => {
		const normalizedSlug = (game.gameSlug || game.gameName || '')
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^a-z0-9-]/g, '');

		const normalizedInput = slug
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^a-z0-9-]/g, '');

		if (normalizedSlug === normalizedInput) {
			return game;
		}

		return false;
	});
}
