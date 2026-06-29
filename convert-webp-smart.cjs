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
        const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        
        fileList.push({
          path: filePath,
          name: file,
          originalSize: stats.size,
          extension: ext,
          webpPath: webpPath,
          hasWebP: fs.existsSync(webpPath)
        });
      }
    }
  });

  return fileList;
}

// Function to convert image to WebP with different quality levels
function convertToWebP(inputPath, outputPath, quality = 85) {
  try {
    const command = `"${cwebpPath}" -q ${quality} -m 6 "${inputPath}" -o "${outputPath}"`;
    execSync(command, { stdio: 'pipe' });
    return fs.existsSync(outputPath);
  } catch (error) {
    return false;
  }
}

// Function to find optimal quality that gives best compression
function findOptimalQuality(inputPath, outputPath, originalSize) {
  const qualityLevels = [90, 85, 80, 75, 70];
  let bestWebP = null;
  let bestSize = originalSize;
  let bestQuality = 85;

  for (const quality of qualityLevels) {
    const testPath = outputPath + '.test';
    if (convertToWebP(inputPath, testPath, quality)) {
      const testSize = fs.statSync(testPath).size;
      if (testSize < bestSize) {
        bestSize = testSize;
        bestQuality = quality;
        // Move best one to final path
        if (bestWebP && fs.existsSync(bestWebP)) {
          fs.unlinkSync(bestWebP);
        }
        fs.renameSync(testPath, outputPath);
        bestWebP = outputPath;
      } else {
        // Delete if not better
        if (fs.existsSync(testPath)) {
          fs.unlinkSync(testPath);
        }
      }
    }
  }

  return { bestSize, bestQuality, hasWebP: bestWebP !== null };
}

// Main execution
console.log('Finding images to convert...\n');

const rootDir = process.cwd();
const imageFiles = findImageFiles(rootDir);

// Filter out files that already have WebP versions
const filesToConvert = imageFiles.filter(img => !img.hasWebP);

console.log(`Found ${imageFiles.length} total images`);
console.log(`${filesToConvert.length} need conversion (${imageFiles.length - filesToConvert.length} already have WebP)\n`);

const results = [];
let convertedCount = 0;
let keptOriginalCount = 0;
let totalOriginalSize = 0;
let totalWebPSize = 0;
let totalSaved = 0;

filesToConvert.forEach((img, index) => {
  const relativeInput = img.path.replace(rootDir + path.sep, '').replace(/\\/g, '/');
  
  console.log(`[${index + 1}/${filesToConvert.length}] Processing: ${relativeInput}`);
  console.log(`  Original size: ${formatFileSize(img.originalSize)}`);
  
  // Try to find optimal quality
  const { bestSize, bestQuality, hasWebP } = findOptimalQuality(img.path, img.webpPath, img.originalSize);
  
  if (hasWebP && bestSize < img.originalSize) {
    // WebP is smaller - keep it
    const savings = img.originalSize - bestSize;
    const savingsPercent = ((savings / img.originalSize) * 100).toFixed(1);
    
    console.log(`  ✅ Converted to WebP (quality ${bestQuality}): ${formatFileSize(bestSize)}`);
    console.log(`  💾 Saved: ${formatFileSize(savings)} (${savingsPercent}%)`);
    
    results.push({
      input: relativeInput,
      output: img.webpPath.replace(rootDir + path.sep, '').replace(/\\/g, '/'),
      originalSize: img.originalSize,
      webpSize: bestSize,
      savings: savings,
      savingsPercent: savingsPercent,
      quality: bestQuality,
      converted: true
    });
    
    totalOriginalSize += img.originalSize;
    totalWebPSize += bestSize;
    totalSaved += savings;
    convertedCount++;
  } else {
    // WebP is larger or same - delete WebP if created, keep original
    if (fs.existsSync(img.webpPath)) {
      fs.unlinkSync(img.webpPath);
    }
    
    const diff = bestSize - img.originalSize;
    const diffPercent = ((diff / img.originalSize) * 100).toFixed(1);
    
    console.log(`  ⚠️  WebP larger by ${formatFileSize(diff)} (${diffPercent}%) - keeping original`);
    
    results.push({
      input: relativeInput,
      output: 'Not converted',
      originalSize: img.originalSize,
      webpSize: bestSize,
      savings: -diff,
      savingsPercent: `-${diffPercent}`,
      quality: bestQuality,
      converted: false
    });
    
    totalOriginalSize += img.originalSize;
    totalWebPSize += img.originalSize; // Count original size since we're keeping it
    keptOriginalCount++;
  }
  
  console.log('');
});

// Add already-converted files to results for complete report
imageFiles.filter(img => img.hasWebP).forEach(img => {
  const relativeInput = img.path.replace(rootDir + path.sep, '').replace(/\\/g, '/');
  const webpStats = fs.statSync(img.webpPath);
  const relativeWebP = img.webpPath.replace(rootDir + path.sep, '').replace(/\\/g, '/');
  
  results.push({
    input: relativeInput,
    output: relativeWebP,
    originalSize: img.originalSize,
    webpSize: webpStats.size,
    savings: img.originalSize - webpStats.size,
    savingsPercent: ((img.originalSize - webpStats.size) / img.originalSize * 100).toFixed(1),
    quality: 'N/A',
    converted: true,
    alreadyExisted: true
  });
  
  totalOriginalSize += img.originalSize;
  if (webpStats.size < img.originalSize) {
    totalWebPSize += webpStats.size;
    totalSaved += (img.originalSize - webpStats.size);
  } else {
    totalWebPSize += img.originalSize;
  }
});

// Generate report
console.log('='.repeat(100));
console.log('SMART WEBP CONVERSION SUMMARY');
console.log('='.repeat(100));
console.log(`Total Images Checked: ${imageFiles.length}`);
console.log(`Converted (WebP saved space): ${convertedCount + imageFiles.filter(img => img.hasWebP).length}`);
console.log(`Kept Original (WebP larger): ${keptOriginalCount}`);
console.log(`\nTotal Original Size: ${formatFileSize(totalOriginalSize)}`);
console.log(`Total WebP Size: ${formatFileSize(totalWebPSize)}`);
const totalSavingsPercent = totalOriginalSize > 0 ? ((totalSaved / totalOriginalSize) * 100).toFixed(1) : 0;
console.log(`Total Space Saved: ${formatFileSize(totalSaved)} (${totalSavingsPercent}%)`);

// Generate comparison table
console.log('\n' + '='.repeat(100));
console.log('BEFORE/AFTER COMPARISON TABLE (Only files with savings)');
console.log('='.repeat(100));
console.log('File'.padEnd(55) + 'Original'.padStart(12) + 'WebP'.padStart(12) + 'Savings'.padStart(18));
console.log('-'.repeat(100));

const convertedResults = results.filter(r => r.converted && r.savings > 0).sort((a, b) => b.savings - a.savings);

convertedResults.forEach(result => {
  const fileName = result.input.length > 53 ? '...' + result.input.slice(-50) : result.input;
  const original = formatFileSize(result.originalSize).padStart(12);
  const webp = formatFileSize(result.webpSize).padStart(12);
  const savings = `${formatFileSize(result.savings)} (${result.savingsPercent}%)`.padStart(18);
  const status = result.alreadyExisted ? ' [EXISTED]' : '';
  
  console.log(fileName.padEnd(55) + original + webp + savings + status);
});

if (keptOriginalCount > 0) {
  console.log('\n' + '='.repeat(100));
  console.log('FILES KEPT AS ORIGINAL (WebP would be larger)');
  console.log('='.repeat(100));
  console.log('File'.padEnd(55) + 'Original Size'.padStart(15) + 'WebP Size'.padStart(15) + 'Difference'.padStart(15));
  console.log('-'.repeat(100));

  results.filter(r => !r.converted || r.savings <= 0).forEach(result => {
    const fileName = result.input.length > 53 ? '...' + result.input.slice(-50) : result.input;
    const original = formatFileSize(result.originalSize).padStart(15);
    const webp = formatFileSize(result.webpSize).padStart(15);
    const diff = `+${formatFileSize(result.savings)}`.padStart(15);
    
    console.log(fileName.padEnd(55) + original + webp + diff);
  });
}

// Save detailed report
const reportFile = 'webp-smart-conversion-report.txt';
const output = fs.createWriteStream(reportFile);
output.write('SMART WEBP CONVERSION REPORT\n');
output.write('='.repeat(100) + '\n');
output.write(`Generated: ${new Date().toISOString()}\n`);
output.write(`Total Images: ${imageFiles.length}\n`);
output.write(`Converted: ${convertedCount + imageFiles.filter(img => img.hasWebP).length}\n`);
output.write(`Kept Original: ${keptOriginalCount}\n`);
output.write(`\nTotal Original Size: ${formatFileSize(totalOriginalSize)}\n`);
output.write(`Total WebP Size: ${formatFileSize(totalWebPSize)}\n`);
output.write(`Total Space Saved: ${formatFileSize(totalSaved)} (${totalSavingsPercent}%)\n\n`);

output.write('\nCONVERTED FILES (WebP smaller):\n');
output.write('-'.repeat(100) + '\n');
output.write('File'.padEnd(55) + 'Original'.padStart(12) + 'WebP'.padStart(12) + 'Savings'.padStart(18) + '\n');
output.write('-'.repeat(100) + '\n');

convertedResults.forEach(result => {
  const fileName = result.input.length > 53 ? '...' + result.input.slice(-50) : result.input;
  const original = formatFileSize(result.originalSize).padStart(12);
  const webp = formatFileSize(result.webpSize).padStart(12);
  const savings = `${formatFileSize(result.savings)} (${result.savingsPercent}%)`.padStart(18);
  output.write(fileName.padEnd(55) + original + webp + savings + '\n');
});

output.end();
console.log(`\n\nDetailed report saved to: ${reportFile}`);

