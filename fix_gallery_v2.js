const fs = require('fs');

const path = 'c:/Users/hp/Jsroom-/src/Screens/GalleryScreen.js';
let content = fs.readFileSync(path, 'utf8');

const rules = {
  rooms: [1391, 1392, 1393, 1394, 1395, 1396, 1397, 1403, 1404, 1405, 1406, 1407, 1409, 1410, 1411, 1412, 1413, 1414, 1415],
  bathroom: [1398, 1399, 1401, 1402],
  reception: [1400, 1416, 1417, 1418, 1419, 1420, 1421, 1422],
  outdoor: [1423, 1424, 1425, 1426, 1427, 1428, 1429, 1430, 1431, 1432, 1433, 1434, 1435, 1437, 1438, 1439]
};

function getCategory(imgName) {
  const idMatch = imgName.match(/IMG_(\d+)/);
  if (!idMatch) return 'rooms';
  const id = parseInt(idMatch[1]);
  if (rules.rooms.includes(id)) return 'rooms';
  if (rules.bathroom.includes(id)) return 'bathroom';
  if (rules.reception.includes(id)) return 'reception';
  if (rules.outdoor.includes(id)) return 'outdoor';
  return 'rooms';
}

// 1. Force update all category fields in galleryImages array
content = content.replace(/"url":\s*"\/assets\/(IMG_\d+\.jpg)",\s*"category":\s*"[^"]*"/g, (match, imgName) => {
  return `"url": "/assets/${imgName}",\n    "category": "${getCategory(imgName)}"`;
});

// 2. Fix the missing state setters and unused variables
// Add back the filters UI (Search and Category Buttons) and the state setters
const filtersJSX = `
      {/* Filters Section */}
      <section style={styles.filtersSection}>
        <div style={styles.filtersContainer}>
          <div style={styles.searchContainer}>
            <FaSearch style={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search gallery..." 
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={styles.categoryFilters}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  ...styles.categoryBtn,
                  backgroundColor: selectedCategory === category.id ? '#D4AF37' : 'white',
                  color: selectedCategory === category.id ? 'white' : '#666',
                  borderColor: selectedCategory === category.id ? '#D4AF37' : '#E5E5E5',
                }}
              >
                {category.name}
                <span style={{
                  ...styles.countBadge,
                  backgroundColor: selectedCategory === category.id ? 'rgba(255,255,255,0.2)' : '#F0F0F0',
                  color: selectedCategory === category.id ? 'white' : '#999',
                }}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
`;

// Insert filtersJSX after hero section but before featured/main sections
if (content.indexOf('</section>') !== -1) {
    const heroEnd = content.indexOf('</section>', content.indexOf('heroSection')) + 10;
    if (heroEnd > 10) {
        content = content.substring(0, heroEnd) + filtersJSX + content.substring(heroEnd);
    }
}

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed GalleryScreen data and restored filters.');
