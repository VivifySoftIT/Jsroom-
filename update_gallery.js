const fs = require('fs');

const path = 'c:/Users/hp/Jsroom-/src/Screens/GalleryScreen.js';
let content = fs.readFileSync(path, 'utf8');

const rules = {
  rooms: [1391, 1392, 1393, 1394, 1395, 1396, 1397, 1403, 1404, 1405, 1406, 1407, 1409, 1410, 1411, 1412, 1413, 1414, 1415],
  bathroom: [1398, 1399, 1401, 1402],
  reception: [1400, 1416, 1417, 1418, 1419, 1420, 1421, 1422],
  outdoor: [1423, 1424, 1425, 1426, 1427, 1428, 1429, 1430, 1431, 1432, 1433, 1434, 1435, 1437, 1438, 1439]
};

function getCategory(idStr) {
  const idMatch = idStr.match(/IMG_(\d+)/);
  if (!idMatch) return 'rooms';
  const id = parseInt(idMatch[1]);
  if (rules.rooms.includes(id)) return 'rooms';
  if (rules.bathroom.includes(id)) return 'bathroom';
  if (rules.reception.includes(id)) return 'reception';
  if (rules.outdoor.includes(id)) return 'outdoor';
  return 'rooms';
}

// Ensure the regex works even if there's no space before the category
content = content.replace(/(category:\s*['"`])([^'"`]+)(['"`])/g, function(match, prefix, oldCat, suffix, offset) {
  // Try to find the image url a bit above this match
  const textBefore = content.substring(Math.max(0, offset - 100), offset);
  const imgMatch = textBefore.match(/\/assets\/(IMG_\d+\.jpg)/);
  if (imgMatch) {
    return prefix + getCategory(imgMatch[1]) + suffix;
  }
  return match;
});

// Update the categories array
content = content.replace(/const categories = \[[\s\S]*?\];/m, `const categories = [
    { id: 'all', name: 'All Photos', count: galleryImages.length },
    { id: 'rooms', name: 'Rooms', count: galleryImages.filter(img => img.category === 'rooms').length },
    { id: 'reception', name: 'Reception', count: galleryImages.filter(img => img.category === 'reception').length },
    { id: 'bathroom', name: 'Bathroom', count: galleryImages.filter(img => img.category === 'bathroom').length },
    { id: 'outdoor', name: 'Outdoor', count: galleryImages.filter(img => img.category === 'outdoor').length }
  ];`);

fs.writeFileSync(path, content, 'utf8');
console.log('Done updating categories array.');
