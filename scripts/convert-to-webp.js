import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to convert image to WebP
async function convertToWebP(inputPath, outputPath, quality = 85) {
  try {
    await sharp(inputPath)
      .webp({ quality })
      .toFile(outputPath);
    console.log(`✅ Converted: ${inputPath} → ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
  }
}

// Function to process directory recursively
async function processDirectory(dirPath, outputDir) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Create corresponding output directory
      const outputSubDir = path.join(outputDir, item);
      if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true });
      }
      await processDirectory(fullPath, outputSubDir);
    } else if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      
      // Convert supported image formats
      if (['.jpg', '.jpeg', '.png', '.bmp', '.tiff'].includes(ext)) {
        const nameWithoutExt = path.parse(item).name;
        const outputPath = path.join(outputDir, `${nameWithoutExt}.webp`);
        
        // Use different quality settings based on image type
        let quality = 85;
        if (item.includes('hero') || item.includes('about')) {
          quality = 90; // Higher quality for important images
        } else if (item.includes('gallery') || item.includes('service')) {
          quality = 80; // Medium quality for gallery images
        }
        
        await convertToWebP(fullPath, outputPath, quality);
      } else {
        // Copy non-image files as-is
        const outputPath = path.join(outputDir, item);
        fs.copyFileSync(fullPath, outputPath);
        console.log(`📁 Copied: ${fullPath} → ${outputPath}`);
      }
    }
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting image conversion to WebP...\n');
  
  const publicDir = path.join(__dirname, '..', 'public');
  const outputDir = path.join(__dirname, '..', 'public-optimized');
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Process public directory
  await processDirectory(publicDir, outputDir);
  
  console.log('\n✨ Image conversion completed!');
  console.log(`📁 Optimized images saved to: ${outputDir}`);
  console.log('\n📋 Next steps:');
  console.log('1. Review the converted images');
  console.log('2. Update image references in components');
  console.log('3. Implement lazy loading');
  console.log('4. Add fallback support for older browsers');
}

// Run the script
main().catch(console.error);
