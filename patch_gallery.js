const fs = require('fs');

const lines = fs.readFileSync('c:\\Users\\hp\\Jsroom-\\src\\Screens\\GalleryScreen.js', 'utf-8').split('\n');
const replacement = fs.readFileSync('c:\\Users\\hp\\Jsroom-\\gallery_code2.txt', 'utf-8');

const reactIconsImport = `import { 
  FaImages, 
  FaExpand,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaArrowRight,
  FaFilter,
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaPlay
} from 'react-icons/fa';`;

let galleryIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith('const galleryImages = [')) {
    galleryIdx = i;
    break;
  }
}

let endIdx = -1;
if (galleryIdx !== -1) {
  for (let i = galleryIdx; i < lines.length; i++) {
    if (lines[i].startsWith('];')) {
      endIdx = i;
      break;
    }
  }
}

if (galleryIdx !== -1 && endIdx !== -1) {
  const newLines = lines.slice(0, 3);
  newLines.push('\n' + reactIconsImport + '\n');
  newLines.push('// Gallery images');
  newLines.push(replacement);
  newLines.push('\n');
  newLines.push(...lines.slice(endIdx + 1));
  
  fs.writeFileSync('c:\\Users\\hp\\Jsroom-\\src\\Screens\\GalleryScreen.js', newLines.join('\n'));
  console.log("Replaced content!");
} else {
  console.log("Could not find boundaries", galleryIdx, endIdx);
}
