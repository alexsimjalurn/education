#!/usr/bin/env node

/**
 * Convert PNG/JPG images to WebP format
 * 
 * Usage:
 *   node scripts/convert-to-webp.js
 *   npm run convert:webp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');

// Quality mapping for each image
const qualityMap = {
  'BG.png': 75,
  'hero-people.png': 85,
  'online-test.png': 80,
  'exam.png': 80,
  'certification.png': 80,
  'course-1.jpg': 85,
  'course-2.jpg': 85,
  'course-3.jpg': 85,
  'hearts_.png': 80,
  'jigsaw_.png': 80,
  'fullstack.jpg': 85,
  'Phonesai.png': 85,
  'Oven.png': 85,
  'Heng.png': 85,
};

// Statistics
let stats = {
  converted: 0,
  skipped: 0,
  errors: 0,
  totalSizeBefore: 0,
  totalSizeAfter: 0,
};

/**
 * Format file size for display
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Convert a single image to WebP
 */
async function convertToWebp(file, quality) {
  const inputPath = path.join(imagesDir, file);
  const outputPath = path.join(imagesDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

  try {
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipped: ${file} (file not found)`);
      stats.skipped++;
      return;
    }

    // Check if output file already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipped: ${file} → ${path.basename(outputPath)} (already exists)`);
      stats.skipped++;
      return;
    }

    // Get original file size
    const originalStats = fs.statSync(inputPath);
    stats.totalSizeBefore += originalStats.size;

    // Convert to WebP
    await sharp(inputPath)
      .webp({ quality })
      .toFile(outputPath);

    // Get converted file size
    const convertedStats = fs.statSync(outputPath);
    stats.totalSizeAfter += convertedStats.size;

    const sizeReduction = ((originalStats.size - convertedStats.size) / originalStats.size * 100).toFixed(1);

    console.log(
      `✅ Converted: ${file} → ${path.basename(outputPath)} ` +
      `(${formatFileSize(originalStats.size)} → ${formatFileSize(convertedStats.size)}, ` +
      `-${sizeReduction}%)`
    );

    stats.converted++;
  } catch (error) {
    console.error(`❌ Error converting ${file}:`, error.message);
    stats.errors++;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🖼️  Converting images to WebP format...\n');

  // Check if images directory exists
  if (!fs.existsSync(imagesDir)) {
    console.error(`❌ Error: Images directory not found: ${imagesDir}`);
    process.exit(1);
  }

  // Check if sharp is installed
  try {
    require.resolve('sharp');
  } catch (error) {
    console.error('❌ Error: sharp package is not installed.');
    console.log('\n📦 Please install it first:');
    console.log('   npm install sharp --save-dev\n');
    process.exit(1);
  }

  // Convert all images
  const files = Object.keys(qualityMap);
  console.log(`📋 Found ${files.length} images to convert\n`);

  for (const file of files) {
    await convertToWebp(file, qualityMap[file]);
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Conversion Summary:');
  console.log('='.repeat(60));
  console.log(`✅ Converted: ${stats.converted} files`);
  console.log(`⏭️  Skipped: ${stats.skipped} files`);
  if (stats.errors > 0) {
    console.log(`❌ Errors: ${stats.errors} files`);
  }
  console.log(`\n📦 Size reduction:`);
  console.log(`   Before: ${formatFileSize(stats.totalSizeBefore)}`);
  console.log(`   After:  ${formatFileSize(stats.totalSizeAfter)}`);
  
  if (stats.totalSizeBefore > 0) {
    const totalReduction = ((stats.totalSizeBefore - stats.totalSizeAfter) / stats.totalSizeBefore * 100).toFixed(1);
    const saved = formatFileSize(stats.totalSizeBefore - stats.totalSizeAfter);
    console.log(`   Saved:  ${saved} (${totalReduction}% reduction)`);
  }
  console.log('='.repeat(60) + '\n');

  if (stats.errors > 0) {
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

