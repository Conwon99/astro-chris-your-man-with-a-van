const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if Sharp is available (for Node.js WebP conversion)
// If not available, we'll provide instructions for manual conversion

function convertImagesToWebP() {
  const publicDir = path.join(__dirname, '../public');
  const imagesToConvert = [
    'back1.jpg',
    'background.jpg', 
    'chris.png',
    'chrisback.png',
    'dog.jpg',
    'houseback.jpg',
    't.png',
    'vanimg.jpg',
    'vanv3.png',
    'website_background_full.jpg'
  ];

  console.log('🖼️  Converting images to WebP format...\n');

  // Check if Sharp is installed
  try {
    require('sharp');
    console.log('✅ Sharp found - using Node.js conversion\n');
    
    imagesToConvert.forEach(imageFile => {
      const inputPath = path.join(publicDir, imageFile);
      const outputPath = path.join(publicDir, imageFile.replace(/\.(jpg|png)$/, '.webp'));
      
      if (fs.existsSync(inputPath)) {
        try {
          const sharp = require('sharp');
          sharp(inputPath)
            .webp({ quality: 85, effort: 6 })
            .toFile(outputPath);
          console.log(`✅ Converted: ${imageFile} → ${path.basename(outputPath)}`);
        } catch (error) {
          console.log(`❌ Failed to convert ${imageFile}:`, error.message);
        }
      } else {
        console.log(`⚠️  Image not found: ${imageFile}`);
      }
    });
    
  } catch (error) {
    console.log('⚠️  Sharp not found. Please install Sharp or use online converter.\n');
    console.log('📋 Images that need WebP conversion:');
    imagesToConvert.forEach(img => {
      console.log(`   - ${img}`);
    });
    
    console.log('\n🔧 Installation options:');
    console.log('1. Install Sharp: npm install sharp');
    console.log('2. Use online converter: https://convertio.co/jpg-webp/');
    console.log('3. Use browser dev tools to convert');
    
    console.log('\n📝 Manual conversion instructions:');
    console.log('1. Open each image in a modern browser');
    console.log('2. Use browser dev tools or online converter');
    console.log('3. Save with .webp extension');
    console.log('4. Maintain the same filename (e.g., back1.jpg → back1.webp)');
  }
}

// Run the conversion
convertImagesToWebP();










