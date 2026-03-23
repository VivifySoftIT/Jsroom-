import codecs

with codecs.open(r'c:\Users\hp\Jsroom-\src\Screens\GalleryScreen.js', 'r', 'utf-8') as f:
    lines = f.readlines()

with codecs.open(r'c:\Users\hp\Jsroom-\gallery_code2.txt', 'r', 'utf-8') as f:
    replacement = f.read()

react_icons_import = """import { 
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
} from 'react-icons/fa';
"""

gallery_idx = -1
for i, line in enumerate(lines):
    if line.startswith('const galleryImages = ['):
        gallery_idx = i
        break

end_idx = -1
if gallery_idx != -1:
    for i in range(gallery_idx, len(lines)):
        if lines[i].startswith('];'):
            end_idx = i
            break

if gallery_idx != -1 and end_idx != -1:
    new_lines = lines[:3] # Keep up to line 3 (index 2)
    new_lines.append('\n' + react_icons_import + '\n')
    new_lines.append('// Gallery images\n')
    new_lines.append(replacement)
    new_lines.append('\n')
    new_lines.extend(lines[end_idx+1:])
    
    with codecs.open(r'c:\Users\hp\Jsroom-\src\Screens\GalleryScreen.js', 'w', 'utf-8') as f:
        f.writelines(new_lines)
    print("Replaced content!")
else:
    print("Could not find boundaries", gallery_idx, end_idx)
