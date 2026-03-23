const fs = require('fs');
const path = require('path');

const assetsDir = 'c:\\Users\\hp\\Jsroom-\\src\\Assets';
const files = fs.readdirSync(assetsDir);

// Filter for images and videos
const validExtensions = ['.jpg', '.png', '.MOV', '.svg'];
const targetFiles = files.filter(f => validExtensions.some(ext => f.endsWith(ext)));

// Generate imports
const imports = [];
const arrayItems = [];

targetFiles.forEach((f, i) => {
  const varName = `asset_${i}`;
  const sanitizedFileName = f.replace(/ /g, '_').replace(/\./g, '_');
  const importName = `asset_${sanitizedFileName}_${i}`;
  imports.push(`import ${importName} from '../Assets/${f}';`);
  
  let category = "rooms";
  if (f.toLowerCase().includes('vid') || f.endsWith('.MOV')) {
    category = "tour";
  } else if (i % 3 === 0) {
    category = "amenities";
  } else if (i % 3 === 1) {
    category = "exterior";
  }
  
  const type = f.endsWith('.MOV') ? 'video' : 'image';
  
  arrayItems.push(`  {
    id: ${i + 1},
    url: ${importName},
    category: '${category}',
    title: 'JS Room Visual ${i + 1}',
    description: 'Breathtaking view of our luxury JS Rooms ${type}.',
    featured: ${i < 8 ? "true" : "false"},
    type: '${type}'
  }`);
});

const output = `${imports.join('\n')}\n\nconst galleryImages = [\n${arrayItems.join(',\n')}\n];\n`;
fs.writeFileSync('c:\\Users\\hp\\Jsroom-\\gallery_code.txt', output);
console.log('Gallery code generated in gallery_code.txt');
