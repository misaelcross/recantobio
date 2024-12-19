import fs from 'fs';
import https from 'https';
import path from 'path';

const imageUrls = [
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', // main beachfront
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80', // interior
  'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80', // bedroom
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80', // bathroom
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', // exterior
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const filePath = path.join(process.cwd(), 'public', filename);
      const fileStream = fs.createWriteStream(filePath);

      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => reject(err));
      });
    }).on('error', reject);
  });
};

async function generatePlaceholders() {
  try {
    const images = [
      { url: imageUrls[0], name: 'placeholder-main.jpg' },
      { url: imageUrls[1], name: 'placeholder-2.jpg' },
      { url: imageUrls[2], name: 'placeholder-3.jpg' },
      { url: imageUrls[3], name: 'placeholder-4.jpg' },
      { url: imageUrls[4], name: 'placeholder-5.jpg' },
    ];

    console.log('Downloading placeholder images...');
    
    for (const image of images) {
      await downloadImage(image.url, image.name);
      console.log(`Downloaded ${image.name}`);
    }

    console.log('All placeholder images downloaded successfully!');
  } catch (error) {
    console.error('Error generating placeholders:', error);
    process.exit(1);
  }
}

generatePlaceholders();
