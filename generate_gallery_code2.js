const fs = require('fs');
const path = require('path');

const assetsDir = 'c:\\Users\\hp\\Jsroom-\\public\\assets';
const files = fs.readdirSync(assetsDir);

// Filter for images and videos
const validExtensions = ['.jpg', '.png', '.MOV', '.svg'];
const targetFiles = files.filter(f => validExtensions.some(ext => f.endsWith(ext)));

// Generate arrayItems
const arrayItems = [];

targetFiles.forEach((f, i) => {
  let category = "rooms";
  if (f.toLowerCase().includes('vid') || f.endsWith('.MOV')) {
    category = "tour";
  } else if (i % 3 === 0) {
    category = "amenities";
  } else if (i % 3 === 1) {
    category = "exterior";
  }
  
  const type = f.endsWith('.MOV') ? 'video' : 'image';
  const url = `'/assets/${f}'`;
  
  arrayItems.push(`  {
    id: ${i + 1},
    url: ${url},
    category: '${category}',
    title: 'JS Room Visual ${i + 1}',
    description: 'Breathtaking view of our luxury JS Rooms ${type}.',
    featured: ${i < 8 ? "true" : "false"},
    type: '${type}'
  }`);
});

const output = `const galleryImages = [\n${arrayItems.join(',\n')}\n];\n`;
fs.writeFileSync('c:\\Users\\hp\\Jsroom-\\gallery_code2.txt', output);
console.log('Gallery code 2 generated in gallery_code2.txt');
