const slotcatalogdata = require('../slotcatalogdata.json');

const fs = require('fs/promises');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Create your Supabase client.
// Store these values in environment variables.
console.log('Supabase URL:', process.env.SUPABASE_URL);
console.log('Supabase ANON Key:', process.env.SUPABASE_ANON_KEY);
const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_ANON_KEY,
);

/**
 * Populate the slotcatalog table from slotcatalogdata.json
 *
 * @param {string} filePath - Path to the JSON file
 * @returns {Promise<Object>} Import result
 */

async function populateSlotCatalog(
	filePath = path.join(__dirname, '../slotcatalogdata.json'),
) {
	try {
		console.log(`[slotcatalog] Reading JSON file: ${filePath}`);

		// Read the JSON file asynchronously
		const fileContent = await fs.readFile(filePath, 'utf8');

		let jsonData;

		try {
			jsonData = JSON.parse(fileContent);
		} catch (error) {
			console.error('[slotcatalog] Failed to parse JSON file:', error.message);

			throw new Error(`Invalid JSON file: ${error.message}`);
		}

		// Your JSON response has the games inside data[]
		const games = Array.isArray(jsonData)
			? jsonData
			: Array.isArray(jsonData.data)
				? jsonData.data
				: null;

		if (!games) {
			throw new Error(
				'Invalid JSON structure: expected an array or an object containing data[].',
			);
		}

		console.log(`[slotcatalog] Found ${games.length} games.`);

		if (games.length === 0) {
			console.log('[slotcatalog] No games found. Nothing to import.');

			return {
				success: true,
				inserted: 0,
				message: 'No games found in JSON file.',
			};
		}

		// Convert an array into a string suitable for the database.
		// Example:
		// ["Adventure", "Mystic", "Gods"]
		// becomes:
		// "Adventure, Mystic, Gods"
		const arrayToString = (value) => {
			if (Array.isArray(value)) {
				return value
					.filter((item) => item !== null && item !== undefined)
					.map((item) => String(item))
					.join(', ');
			}

			if (value === null || value === undefined) {
				return null;
			}

			return String(value);
		};

		// Convert 0/1, true/false into a PostgreSQL boolean.
		const toBoolean = (value) => {
			if (value === 1 || value === '1' || value === true) {
				return true;
			}

			if (value === 0 || value === '0' || value === false) {
				return false;
			}

			return null;
		};

		// Convert empty strings to null.
		const emptyToNull = (value) => {
			if (value === undefined || value === null || value === '') {
				return null;
			}

			return value;
		};

		// Map the API JSON object to the slotcatalog table schema.
		const rows = games.map((game) => ({
			gameId: emptyToNull(game.gameId?.toString()),
			gameName: emptyToNull(game.gameName),
			vendorName: emptyToNull(game.vendorName),

			gameSlug: emptyToNull(game.gameSlug),

			type: emptyToNull(game.type),

			// JSON field is "reliaseDate"
			// Database field is "releaseDate"
			releaseDate: emptyToNull(game.reliaseDate),

			rtpComments: emptyToNull(game.rtpComments),

			// JSON field is "payWays"
			// Database field is "payways"
			payways:
				game.payWays !== undefined && game.payWays !== null
					? Number(game.payWays)
					: null,

			isExclusive: toBoolean(game.isExclusive),

			minBet:
				game.minBet !== undefined && game.minBet !== null
					? Number(game.minBet)
					: null,

			maxBet:
				game.maxBet !== undefined && game.maxBet !== null
					? Number(game.maxBet)
					: null,

			maxMultiplier:
				game.maxMultiplier !== undefined && game.maxMultiplier !== null
					? Number(game.maxMultiplier)
					: null,

			gameSizeMb:
				game.gameSizeMb !== undefined && game.gameSizeMb !== null
					? Number(game.gameSizeMb)
					: null,

			slotRank:
				game.slotRank !== undefined && game.slotRank !== null
					? Number(game.slotRank)
					: null,

			description: Array.isArray(game.description)
				? arrayToString(game.description)
				: emptyToNull(game.description),

			demoGameLink: emptyToNull(game.demoGameLink),

			imageSquare: emptyToNull(game.imageSquare),

			imageLandscape: emptyToNull(game.imageLandscape),

			// User rule:
			// badge must always be "Featured"
			badge: 'Featured',

			vendor: emptyToNull(game.vendorName),

			rtp:
				game.rtp !== undefined && game.rtp !== null ? Number(game.rtp) : null,

			volatility: emptyToNull(game.volatility),

			// JSON uses themes[]
			theme: arrayToString(game.themes),

			// JSON uses features[]
			feature: arrayToString(game.features),

			// User rule:
			// uuId comes from JSON uuid field.
			// Do NOT allow Supabase/default UUID generation here.
			uuId: emptyToNull(game.uuid),
		}));

		console.log(
			`[slotcatalog] Prepared ${rows.length} rows for database insertion.`,
		);

		// Insert in batches.
		// Adjust this number if your catalog becomes very large.
		const BATCH_SIZE = 500;

		let inserted = 0;

		for (let i = 0; i < rows.length; i += BATCH_SIZE) {
			const batch = rows.slice(i, i + BATCH_SIZE);

			console.log(
				`[slotcatalog] Inserting rows ${i + 1}-${i + batch.length} of ${rows.length}...`,
			);

			const { data, error } = await supabase
				.from('slotcatalog')
				.insert(batch)
				.select();

			if (error) {
				console.error(
					`[slotcatalog] Database insert failed for batch starting at row ${
						i + 1
					}:`,
					error,
				);

				throw new Error(`Database insert failed: ${error.message}`);
			}

			inserted += data?.length ?? batch.length;

			console.log(`[slotcatalog] Successfully inserted ${batch.length} rows.`);
		}

		console.log(`[slotcatalog] Import complete. ${inserted} games inserted.`);

		return {
			success: true,
			inserted,
			total: rows.length,
		};
	} catch (error) {
		console.error('[slotcatalog] Failed to populate slotcatalog:', error);

		// Re-throw so the caller's await/catch can handle the failure.
		throw error;
	}
}

async function main() {
	try {
		const result = await populateSlotCatalog();

		console.log('Import result:', result);
	} catch (error) {
		console.error('Catalog import failed:', error.message);
	}
}

main(slotcatalogdata);
