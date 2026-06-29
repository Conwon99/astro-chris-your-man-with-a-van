const fs = require('fs');
const path = require('path');

// Extensions to check
const imageExtensions = ['.jpg', '.jpeg', '.png'];

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

// Function to find all WebP files and check if they should be kept
function findAndCheckWebP(dir, results = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!shouldExcludeDir(filePath)) {
        findAndCheckWebP(filePath, results);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.webp') {
        // Find corresponding original file
        const basePath = filePath.replace(/\.webp$/i, '');
        let originalPath = null;
        let originalSize = 0;

        // Check for JPG, JPEG, or PNG
        for (const origExt of ['.jpg', '.jpeg', '.png']) {
          const testPath = basePath + origExt;
          if (fs.existsSync(testPath)) {
            originalPath = testPath;
            originalSize = fs.statSync(testPath).size;
            break;
          }
        }

        if (originalPath) {
          const webpSize = stat.size;
          const relativeWebP = filePath.replace(process.cwd() + path.sep, '').replace(/\\/g, '/');
          const relativeOriginal = originalPath.replace(process.cwd() + path.sep, '').replace(/\\/g, '/');
          
          results.push({
            webpPath: filePath,
            originalPath: originalPath,
            webpSize: webpSize,
            originalSize: originalSize,
            relativeWebP: relativeWebP,
            relativeOriginal: relativeOriginal,
            shouldDelete: webpSize >= originalSize
          });
        }
      }
    }
  });

  return results;
}

// Main execution
console.log('Checking existing WebP files...\n');

const rootDir = process.cwd();
const webpFiles = findAndCheckWebP(rootDir);

console.log(`Found ${webpFiles.length} WebP files with originals\n`);

let deletedCount = 0;
let keptCount = 0;
let totalDeletedSize = 0;
let totalKeptSavings = 0;

console.log('='.repeat(100));
console.log('WEBP FILE CLEANUP REPORT');
console.log('='.repeat(100));

webpFiles.forEach((file, index) => {
  if (file.shouldDelete) {
    console.log(`\n[${index + 1}/${webpFiles.length}] DELETING: ${file.relativeWebP}`);
    console.log(`  WebP Size: ${formatFileSize(file.webpSize)}`);
    console.log(`  Original Size: ${formatFileSize(file.originalSize)}`);
    console.log(`  WebP is ${formatFileSize(file.webpSize - file.originalSize)} LARGER`);

    try {
      fs.unlinkSync(file.webpPath);
      console.log(`  ✅ Deleted`);
      deletedCount++;
      totalDeletedSize += file.webpSize;
    } catch (error) {
      console.log(`  ❌ Error deleting: ${error.message}`);
    }
  } else {
    const savings = file.originalSize - file.webpSize;
    const savingsPercent = ((savings / file.originalSize) * 100).toFixed(1);
    keptCount++;
    totalKeptSavings += savings;
  }
});

console.log('\n' + '='.repeat(100));
console.log('CLEANUP SUMMARY');
console.log('='.repeat(100));
console.log(`Total WebP Files Checked: ${webpFiles.length}`);
console.log(`Deleted (WebP was larger): ${deletedCount}`);
console.log(`Kept (WebP is smaller): ${keptCount}`);
console.log(`\nTotal Size Freed: ${formatFileSize(totalDeletedSize)}`);
console.log(`Total Space Saved by Kept WebP: ${formatFileSize(totalKeptSavings)}`);

// Generate final comparison of kept files
console.log('\n' + '='.repeat(100));
console.log('FINAL WEBP FILES (Kept - smaller than original)');
console.log('='.repeat(100));
console.log('WebP File'.padEnd(55) + 'Original Size'.padStart(15) + 'WebP Size'.padStart(15) + 'Savings'.padStart(18));
console.log('-'.repeat(100));

const keptFiles = webpFiles.filter(f => !f.shouldDelete).sort((a, b) => (b.originalSize - b.webpSize) - (a.originalSize - a.webpSize));

keptFiles.forEach(file => {
  const savings = file.originalSize - file.webpSize;
  const savingsPercent = ((savings / file.originalSize) * 100).toFixed(1);
  const fileName = file.relativeWebP.length > 53 ? '...' + file.relativeWebP.slice(-50) : file.relativeWebP;
  const original = formatFileSize(file.originalSize).padStart(15);
  const webp = formatFileSize(file.webpSize).padStart(15);
  const savingsStr = `${formatFileSize(savings)} (${savingsPercent}%)`.padStart(18);
  
  console.log(fileName.padEnd(55) + original + webp + savingsStr);
});

// Save report
const reportFile = 'webp-cleanup-report.txt';
const output = fs.createWriteStream(reportFile);
output.write('WEBP CLEANUP REPORT\n');
output.write('='.repeat(100) + '\n');
output.write(`Generated: ${new Date().toISOString()}\n`);
output.write(`Total WebP Files: ${webpFiles.length}\n`);
output.write(`Deleted: ${deletedCount}\n`);
output.write(`Kept: ${keptCount}\n`);
output.write(`Total Size Freed: ${formatFileSize(totalDeletedSize)}\n`);
output.write(`Total Space Saved: ${formatFileSize(totalKeptSavings)}\n\n`);

output.write('\nDELETED FILES (WebP was larger):\n');
output.write('-'.repeat(100) + '\n');
webpFiles.filter(f => f.shouldDelete).forEach(file => {
  output.write(`${file.relativeWebP}\n`);
  output.write(`  Original: ${formatFileSize(file.originalSize)}\n`);
  output.write(`  WebP: ${formatFileSize(file.webpSize)} (+${formatFileSize(file.webpSize - file.originalSize)})\n\n`);
});

output.write('\nKEPT FILES (WebP is smaller):\n');
output.write('-'.repeat(100) + '\n');
keptFiles.forEach(file => {
  const savings = file.originalSize - file.webpSize;
  const savingsPercent = ((savings / file.originalSize) * 100).toFixed(1);
  output.write(`${file.relativeWebP}\n`);
  output.write(`  Original: ${formatFileSize(file.originalSize)}\n`);
  output.write(`  WebP: ${formatFileSize(file.webpSize)}\n`);
  output.write(`  Savings: ${formatFileSize(savings)} (${savingsPercent}%)\n\n`);
});

output.end();
console.log(`\n\nDetailed report saved to: ${reportFile}`);

