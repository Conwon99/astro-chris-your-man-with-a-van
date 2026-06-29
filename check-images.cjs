const fs = require('fs');
const path = require('path');

// Extensions to look for
const imageExtensions = ['.jpg', '.jpeg', '.png', '.svg', '.webp', '.gif'];

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

// Function to recursively find all image files
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
      if (imageExtensions.includes(ext)) {
        const stats = fs.statSync(filePath);
        fileList.push({
          path: filePath,
          name: file,
          size: stats.size,
          sizeFormatted: formatFileSize(stats.size),
          extension: ext
        });
      }
    }
  });

  return fileList;
}

// Main execution
console.log('Scanning for image files...\n');

const rootDir = process.cwd();
const imageFiles = findImageFiles(rootDir);

// Sort by size (largest first)
imageFiles.sort((a, b) => b.size - a.size);

// Group by location
const publicImages = imageFiles.filter(img => img.path.includes('public'));
const srcImages = imageFiles.filter(img => img.path.includes('src') && !img.path.includes('public'));

console.log('='.repeat(80));
console.log('IMAGE FILE INVENTORY');
console.log('='.repeat(80));
console.log(`\nTotal Images Found: ${imageFiles.length}`);
console.log(`Total Size: ${formatFileSize(imageFiles.reduce((sum, img) => sum + img.size, 0))}\n`);

console.log('─'.repeat(80));
console.log('PUBLIC DIRECTORY IMAGES');
console.log('─'.repeat(80));
publicImages.forEach(img => {
  const relativePath = img.path.replace(rootDir + path.sep, '').replace(/\\/g, '/');
  console.log(`${relativePath.padEnd(70)} ${img.sizeFormatted.padStart(10)}`);
});

console.log('\n─'.repeat(80));
console.log('SRC DIRECTORY IMAGES');
console.log('─'.repeat(80));
srcImages.forEach(img => {
  const relativePath = img.path.replace(rootDir + path.sep, '').replace(/\\/g, '/');
  console.log(`${relativePath.padEnd(70)} ${img.sizeFormatted.padStart(10)}`);
});

console.log('\n─'.repeat(80));
console.log('LARGEST FILES (Top 10)');
console.log('─'.repeat(80));
imageFiles.slice(0, 10).forEach((img, index) => {
  const relativePath = img.path.replace(rootDir + path.sep, '').replace(/\\/g, '/');
  console.log(`${(index + 1).toString().padStart(2)}. ${relativePath.padEnd(65)} ${img.sizeFormatted.padStart(10)}`);
});

// Summary by extension
console.log('\n─'.repeat(80));
console.log('SUMMARY BY FILE TYPE');
console.log('─'.repeat(80));
const byExtension = {};
imageFiles.forEach(img => {
  if (!byExtension[img.extension]) {
    byExtension[img.extension] = { count: 0, totalSize: 0 };
  }
  byExtension[img.extension].count++;
  byExtension[img.extension].totalSize += img.size;
});

Object.keys(byExtension).sort().forEach(ext => {
  const data = byExtension[ext];
  console.log(`${ext.toUpperCase().padEnd(8)} ${data.count.toString().padStart(4)} files - ${formatFileSize(data.totalSize)} total`);
});

// Write detailed list to file
const outputFile = 'image-inventory.txt';
const output = fs.createWriteStream(outputFile);
output.write('IMAGE FILE INVENTORY\n');
output.write('='.repeat(80) + '\n');
output.write(`Generated: ${new Date().toISOString()}\n`);
output.write(`Total Images: ${imageFiles.length}\n`);
output.write(`Total Size: ${formatFileSize(imageFiles.reduce((sum, img) => sum + img.size, 0))}\n\n`);

output.write('\nALL IMAGES (sorted by size, largest first):\n');
output.write('-'.repeat(80) + '\n');
imageFiles.forEach(img => {
  const relativePath = img.path.replace(rootDir + path.sep, '').replace(/\\/g, '/');
  output.write(`${relativePath.padEnd(70)} ${img.sizeFormatted.padStart(10)}\n`);
});

output.end();
console.log(`\n\nDetailed inventory saved to: ${outputFile}`);

