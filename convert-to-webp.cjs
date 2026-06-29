const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Path to cwebp executable
const cwebpPath = 'C:\\Users\\conno\\Documents\\AAA-WEBDESIGN\\libwebp-1.6.0-windows-x64\\libwebp-1.6.0-windows-x64\\bin\\cwebp.exe';

// Extensions to convert
const convertExtensions = ['.jpg', '.jpeg', '.png'];

// Directories to exclude
const excludeDirs = ['node_modules', '.git', 'dist'];

// Function to format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Function to check if directory should be excluded
function shouldExcludeDir(dirPath) {
  return excludeDirs.some(exclude => dirPath.includes(exclude));
}

// Function to recursively find all image files to convert
function findImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!shouldExcludeDir(filePath)) {
        findImageFiles(filePath, fileList);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (convertExtensions.includes(ext)) {
        const stats = fs.statSync(filePath);
        fileList.push({
          path: filePath,
          name: file,
          size: stats.size,
          extension: ext
        });
      }
    }
  });

  return fileList;
}

// Function to convert image to WebP
function convertToWebP(inputPath, outputPath, quality = 85) {
  try {
    // Use -q quality option (0-100, higher is better quality)
    // -m 6 for maximum compression effort (0-6)
    const command = `"${cwebpPath}" -q ${quality} -m 6 "${inputPath}" -o "${outputPath}"`;
    execSync(command, { stdio: 'pipe' });
    return true;
  } catch (error) {
    console.error(`Error converting ${inputPath}: ${error.message}`);
    return false;
  }
}

// Main execution
console.log('Finding images to convert...\n');

const rootDir = process.cwd();
const imageFiles = findImageFiles(rootDir);

console.log(`Found ${imageFiles.length} images to convert\n`);

const results = [];
let successCount = 0;
let failCount = 0;
let totalOriginalSize = 0;
let totalWebPSize = 0;

imageFiles.forEach((img, index) => {
  const outputPath = img.path.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const relativeInput = img.path.replace(rootDir + path.sep, '').replace(/\\/g, '/');
  const relativeOutput = outputPath.replace(rootDir + path.sep, '').replace(/\\/g, '/');
  
  console.log(`[${index + 1}/${imageFiles.length}] Converting: ${relativeInput}`);
  
  // Check if WebP already exists
  if (fs.existsSync(outputPath)) {
    console.log(`  ⚠️  WebP already exists, skipping...`);
    const existingStats = fs.statSync(outputPath);
    results.push({
      input: relativeInput,
      output: relativeOutput,
      originalSize: img.size,
      webpSize: existingStats.size,
      skipped: true
    });
    totalOriginalSize += img.size;
    totalWebPSize += existingStats.size;
    return;
  }
  
  const success = convertToWebP(img.path, outputPath);
  
  if (success && fs.existsSync(outputPath)) {
    const webpStats = fs.statSync(outputPath);
    const savings = img.size - webpStats.size;
    const savingsPercent = ((savings / img.size) * 100).toFixed(1);
    
    console.log(`  ✅ Converted (${formatFileSize(img.size)} → ${formatFileSize(webpStats.size)}, saved ${savingsPercent}%)`);
    
    results.push({
      input: relativeInput,
      output: relativeOutput,
      originalSize: img.size,
      webpSize: webpStats.size,
      savings: savings,
      savingsPercent: savingsPercent,
      skipped: false
    });
    
    totalOriginalSize += img.size;
    totalWebPSize += webpStats.size;
    successCount++;
  } else {
    console.log(`  ❌ Conversion failed`);
    results.push({
      input: relativeInput,
      output: relativeOutput,
      originalSize: img.size,
      webpSize: 0,
      failed: true
    });
    totalOriginalSize += img.size;
    failCount++;
  }
});

// Generate report
console.log('\n' + '='.repeat(100));
console.log('CONVERSION SUMMARY');
console.log('='.repeat(100));
console.log(`Total Images: ${imageFiles.length}`);
console.log(`Successfully Converted: ${successCount}`);
console.log(`Already Existed: ${results.filter(r => r.skipped).length}`);
console.log(`Failed: ${failCount}`);
console.log(`\nTotal Original Size: ${formatFileSize(totalOriginalSize)}`);
console.log(`Total WebP Size: ${formatFileSize(totalWebPSize)}`);
const totalSavings = totalOriginalSize - totalWebPSize;
const totalSavingsPercent = totalOriginalSize > 0 ? ((totalSavings / totalOriginalSize) * 100).toFixed(1) : 0;
console.log(`Total Space Saved: ${formatFileSize(totalSavings)} (${totalSavingsPercent}%)`);

// Generate comparison table
console.log('\n' + '='.repeat(100));
console.log('BEFORE/AFTER COMPARISON TABLE');
console.log('='.repeat(100));
console.log('File'.padEnd(60) + 'Original'.padStart(15) + 'WebP'.padStart(15) + 'Savings'.padStart(15));
console.log('-'.repeat(100));

results.sort((a, b) => b.originalSize - a.originalSize).forEach(result => {
  const fileName = result.input.length > 58 ? '...' + result.input.slice(-55) : result.input;
  const original = formatFileSize(result.originalSize).padStart(15);
  const webp = result.failed ? 'FAILED'.padStart(15) : formatFileSize(result.webpSize).padStart(15);
  const savings = result.failed 
    ? '-'.padStart(15)
    : result.skipped
    ? 'EXISTS'.padStart(15)
    : `${formatFileSize(result.savings)} (${result.savingsPercent}%)`.padStart(15);
  
  console.log(fileName.padEnd(60) + original + webp + savings);
});

// Save detailed report to file
const reportFile = 'webp-conversion-report.txt';
const output = fs.createWriteStream(reportFile);
output.write('WEBP CONVERSION REPORT\n');
output.write('='.repeat(100) + '\n');
output.write(`Generated: ${new Date().toISOString()}\n`);
output.write(`Total Images: ${imageFiles.length}\n`);
output.write(`Successfully Converted: ${successCount}\n`);
output.write(`Already Existed: ${results.filter(r => r.skipped).length}\n`);
output.write(`Failed: ${failCount}\n`);
output.write(`\nTotal Original Size: ${formatFileSize(totalOriginalSize)}\n`);
output.write(`Total WebP Size: ${formatFileSize(totalWebPSize)}\n`);
output.write(`Total Space Saved: ${formatFileSize(totalSavings)} (${totalSavingsPercent}%)\n\n`);

output.write('\nBEFORE/AFTER COMPARISON:\n');
output.write('-'.repeat(100) + '\n');
output.write('File'.padEnd(60) + 'Original'.padStart(15) + 'WebP'.padStart(15) + 'Savings'.padStart(15) + '\n');
output.write('-'.repeat(100) + '\n');

results.sort((a, b) => b.originalSize - a.originalSize).forEach(result => {
  const fileName = result.input.length > 58 ? '...' + result.input.slice(-55) : result.input;
  const original = formatFileSize(result.originalSize).padStart(15);
  const webp = result.failed ? 'FAILED'.padStart(15) : formatFileSize(result.webpSize).padStart(15);
  const savings = result.failed 
    ? '-'.padStart(15)
    : result.skipped
    ? 'EXISTS'.padStart(15)
    : `${formatFileSize(result.savings)} (${result.savingsPercent}%)`.padStart(15);
  
  output.write(fileName.padEnd(60) + original + webp + savings + '\n');
});

output.end();
console.log(`\n\nDetailed report saved to: ${reportFile}`);

