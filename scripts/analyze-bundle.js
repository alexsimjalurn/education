/**
 * Bundle Analysis Script
 *
 * Analyzes bundle size and generates report.
 * Run with: node scripts/analyze-bundle.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing bundle size...\n');

try {
  // Set ANALYZE environment variable
  process.env.ANALYZE = 'true';

  // Run build
  console.log('Building application...');
  execSync('npm run build', { stdio: 'inherit' });

  // Check if analysis files exist
  const clientReport = path.join(process.cwd(), '.next/analyze/client.html');
  const serverReport = path.join(process.cwd(), '.next/analyze/server.html');

  if (fs.existsSync(clientReport)) {
    console.log('\n✅ Client bundle analysis available at:');
    console.log(`   ${clientReport}`);
  }

  if (fs.existsSync(serverReport)) {
    console.log('\n✅ Server bundle analysis available at:');
    console.log(`   ${serverReport}`);
  }

  console.log('\n📊 Bundle analysis complete!');
} catch (error) {
  console.error('❌ Bundle analysis failed:', error.message);
  process.exit(1);
}

