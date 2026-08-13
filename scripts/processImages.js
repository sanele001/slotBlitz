// scripts/process-images.js
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Get project root
const PROJECT_ROOT = path.join(__dirname, '..');

// Configuration
const config = {
	inputFolder: path.join(PROJECT_ROOT, 'public', 'images'),
	outputFolder: path.join(PROJECT_ROOT, 'public', 'compressedImages'),
	width: 700,
	height: 400,
	quality: 80,
	inputFormats: ['.jpg', '.jpeg', '.png', '.webp'],
};

function formatFileSize(bytes) {
	if (bytes === 0) return '0 B';
	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function getImageFiles(inputFolder, formats) {
	try {
		const files = await fs.readdir(inputFolder);
		return files.filter((file) => {
			const ext = path.extname(file).toLowerCase();
			return formats.includes(ext);
		});
	} catch (error) {
		console.error('❌ Error reading input directory:', error);
		throw error;
	}
}

async function processImage(filePath, outputPath, config) {
	const inputFile = path.basename(filePath);
	const ext = path.extname(inputFile).toLowerCase();
	const baseName = path.parse(inputFile).name;
	const outputFileName = `${baseName}.jpg`;
	const fullOutputPath = path.join(outputPath, outputFileName);

	try {
		const originalStats = await fs.stat(filePath);
		const originalSize = originalStats.size;

		await sharp(filePath)
			.resize(config.width, config.height, {
				fit: 'cover',
				position: 'center',
				withoutEnlargement: true,
			})
			.jpeg({
				quality: config.quality,
				progressive: true,
				mozjpeg: true,
				optimizeCoding: true,
			})
			.toFile(fullOutputPath);

		const compressedStats = await fs.stat(fullOutputPath);
		const compressedSize = compressedStats.size;
		const compressionRatio = (
			(1 - compressedSize / originalSize) *
			100
		).toFixed(1);

		return {
			inputFile,
			outputFile: outputFileName,
			originalSize,
			compressedSize,
			compressionRatio: `${compressionRatio}%`,
			format: ext.replace('.', '').toUpperCase(),
			success: true,
		};
	} catch (error) {
		return {
			inputFile,
			outputFile: '',
			originalSize: 0,
			compressedSize: 0,
			compressionRatio: '0%',
			format: ext.replace('.', '').toUpperCase(),
			success: false,
			error: String(error),
		};
	}
}

async function processAllImages() {
	console.log('🚀 Starting image processing...');
	console.log('📁 Project Root:', PROJECT_ROOT);
	console.log('📂 Input folder:', config.inputFolder);
	console.log('📂 Output folder:', config.outputFolder);
	console.log(`📐 Dimensions: ${config.width}x${config.height}px`);
	console.log(`🎨 Quality: ${config.quality}%`);
	console.log(`📋 Supported formats: ${config.inputFormats.join(', ')}`);
	console.log('');

	try {
		await fs.mkdir(config.outputFolder, { recursive: true });
		console.log('✅ Output folder created/verified\n');

		const imageFiles = await getImageFiles(
			config.inputFolder,
			config.inputFormats,
		);

		if (imageFiles.length === 0) {
			console.log(`⚠️ No supported images found in ${config.inputFolder}`);
			console.log(`   Supported formats: ${config.inputFormats.join(', ')}`);
			return;
		}

		console.log(`📸 Found ${imageFiles.length} image(s) to process\n`);
		console.log('🔄 Processing images...\n');

		const results = [];
		let processedCount = 0;
		let failedCount = 0;

		for (const file of imageFiles) {
			const filePath = path.join(config.inputFolder, file);
			const result = await processImage(filePath, config.outputFolder, config);

			results.push(result);

			if (result.success) {
				processedCount++;
				const originalSize = formatFileSize(result.originalSize);
				const compressedSize = formatFileSize(result.compressedSize);
				console.log(
					`✅ [${processedCount}/${imageFiles.length}] ${result.inputFile}`,
				);
				console.log(`   Format: ${result.format} → JPEG`);
				console.log(
					`   Size: ${originalSize} → ${compressedSize} (${result.compressionRatio} saved)`,
				);
				console.log(`   Output: ${result.outputFile}`);
				console.log('');
			} else {
				failedCount++;
				console.log(
					`❌ [${processedCount + failedCount}/${imageFiles.length}] ${result.inputFile}`,
				);
				console.log(`   Error: ${result.error}`);
				console.log('');
			}
		}

		console.log('='.repeat(60));
		console.log('📊 PROCESSING SUMMARY');
		console.log('='.repeat(60));
		console.log(`✅ Successfully processed: ${processedCount} images`);
		console.log(`❌ Failed: ${failedCount} images`);
		console.log(`📁 Output folder: ${config.outputFolder}`);

		if (processedCount > 0) {
			const totalOriginal = results
				.filter((r) => r.success)
				.reduce((sum, r) => sum + r.originalSize, 0);
			const totalCompressed = results
				.filter((r) => r.success)
				.reduce((sum, r) => sum + r.compressedSize, 0);
			const totalSaved = ((1 - totalCompressed / totalOriginal) * 100).toFixed(
				1,
			);

			console.log('');
			console.log('📈 Compression Statistics:');
			console.log(`   Total original size: ${formatFileSize(totalOriginal)}`);
			console.log(
				`   Total compressed size: ${formatFileSize(totalCompressed)}`,
			);
			console.log(`   Total savings: ${totalSaved}%`);
		}

		if (failedCount > 0) {
			console.log('');
			console.log('❌ Failed images:');
			results
				.filter((r) => !r.success)
				.forEach((r) => console.log(`   - ${r.inputFile}: ${r.error}`));
		}

		console.log('');
		console.log('✨ Done!');
	} catch (error) {
		console.error('❌ Fatal error:', error);
		process.exit(1);
	}
}

// Run the script
processAllImages();
