import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { 
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
  FaMapMarkerAlt
} from 'react-icons/fa';

const room1Image = '/assets/IMG_1392.jpg';
const room2Image = '/assets/IMG_1411.jpg';
const room3Image = '/assets/IMG_1423.jpg';

// Gallery images using local images
const galleryImages = [
  {
    "id": 1,
    "url": "/assets/image.jpg",
    "category": "amenities",
    "title": "JS Room Visual 1",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": true,
    "type": "image"
  },
  {
    "id": 2,
    "url": "/assets/image.png",
    "category": "exterior",
    "title": "JS Room Visual 2",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": true,
    "type": "image"
  },
  {
    "id": 3,
    "url": "/assets/IMG_1391.jpg",
    "category": "rooms",
    "title": "JS Room Visual 8",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": true,
    "type": "image"
  },
  {
    "id": 4,
    "url": "/assets/IMG_1392.jpg",
    "category": "rooms",
    "title": "JS Room Visual 9",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 5,
    "url": "/assets/IMG_1393.jpg",
    "category": "rooms",
    "title": "JS Room Visual 10",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 6,
    "url": "/assets/IMG_1394.jpg",
    "category": "rooms",
    "title": "JS Room Visual 11",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 7,
    "url": "/assets/IMG_1395.jpg",
    "category": "rooms",
    "title": "JS Room Visual 12",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 8,
    "url": "/assets/IMG_1396.jpg",
    "category": "rooms",
    "title": "JS Room Visual 13",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 9,
    "url": "/assets/IMG_1397.jpg",
    "category": "rooms",
    "title": "JS Room Visual 14",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 10,
    "url": "/assets/IMG_1398.jpg",
    "category": "bathroom",
    "title": "JS Room Visual 15",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 11,
    "url": "/assets/IMG_1399.jpg",
    "category": "bathroom",
    "title": "JS Room Visual 16",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 12,
    "url": "/assets/IMG_1401.jpg",
    "category": "bathroom",
    "title": "JS Room Visual 18",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 13,
    "url": "/assets/IMG_1402.jpg",
    "category": "bathroom",
    "title": "JS Room Visual 19",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 14,
    "url": "/assets/IMG_1403.jpg",
    "category": "rooms",
    "title": "JS Room Visual 20",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 15,
    "url": "/assets/IMG_1404.jpg",
    "category": "rooms",
    "title": "JS Room Visual 21",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 16,
    "url": "/assets/IMG_1405.jpg",
    "category": "rooms",
    "title": "JS Room Visual 22",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 17,
    "url": "/assets/IMG_1406.jpg",
    "category": "rooms",
    "title": "JS Room Visual 23",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 18,
    "url": "/assets/IMG_1407.jpg",
    "category": "rooms",
    "title": "JS Room Visual 24",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 19,
    "url": "/assets/IMG_1409.jpg",
    "category": "rooms",
    "title": "JS Room Visual 25",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 20,
    "url": "/assets/IMG_1410.jpg",
    "category": "rooms",
    "title": "JS Room Visual 26",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 21,
    "url": "/assets/IMG_1411.jpg",
    "category": "rooms",
    "title": "JS Room Visual 27",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 22,
    "url": "/assets/IMG_1412.jpg",
    "category": "rooms",
    "title": "JS Room Visual 28",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 23,
    "url": "/assets/IMG_1413.jpg",
    "category": "rooms",
    "title": "JS Room Visual 29",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 24,
    "url": "/assets/IMG_1414.jpg",
    "category": "rooms",
    "title": "JS Room Visual 30",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 25,
    "url": "/assets/IMG_1415.jpg",
    "category": "rooms",
    "title": "JS Room Visual 31",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 26,
    "url": "/assets/IMG_1416.jpg",
    "category": "wing",
    "title": "JS Room Visual 32",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 27,
    "url": "/assets/IMG_1417.jpg",
    "category": "wing",
    "title": "JS Room Visual 33",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 28,
    "url": "/assets/IMG_1418.jpg",
    "category": "wing",
    "title": "JS Room Visual 34",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 29,
    "url": "/assets/IMG_1419.jpg",
    "category": "wing",
    "title": "JS Room Visual 35",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 30,
    "url": "/assets/IMG_1420.jpg",
    "category": "wing",
    "title": "JS Room Visual 36",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 31,
    "url": "/assets/IMG_1421.jpg",
    "category": "wing",
    "title": "JS Room Visual 37",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 32,
    "url": "/assets/IMG_1423.jpg",
    "category": "reception_outdoor",
    "title": "JS Room Visual 39",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 33,
    "url": "/assets/IMG_1424.jpg",
    "category": "reception_outdoor",
    "title": "JS Room Visual 40",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 34,
    "url": "/assets/IMG_1425.jpg",
    "category": "reception_outdoor",
    "title": "JS Room Visual 41",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 35,
    "url": "/assets/IMG_1426.jpg",
    "category": "reception_outdoor",
    "title": "JS Room Visual 42",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 36,
    "url": "/assets/IMG_1427.jpg",
    "category": "reception_outdoor",
    "title": "JS Room Visual 43",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 37,
    "url": "/assets/IMG_1428.jpg",
    "category": "reception_outdoor",
    "title": "JS Room Visual 44",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 38,
    "url": "/assets/IMG_1429.jpg",
    "category": "reception_outdoor",
    "title": "JS Room Visual 45",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 39,
    "url": "/assets/IMG_1430.jpg",
    "category": "reception_outdoor",
    "title": "JS Room Visual 46",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 40,
    "url": "/assets/IMG_1431.jpg",
    "category": "reception_outdoor",
    "title": "JS Room Visual 47",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 41,
    "url": "/assets/IMG_1432.jpg",
    "category": "reception_outdoor",
    "title": "JS Room Visual 48",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 42,
    "url": "/assets/IMG_1433.jpg",
    "category": "reception_outdoor",
    "title": "JS Room Visual 49",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 43,
    "url": "/assets/IMG_1434.jpg",
    "category": "reception_outdoor",
    "title": "JS Room Visual 50",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 44,
    "url": "/assets/IMG_1435.jpg",
    "category": "reception_outdoor",
    "title": "JS Room Visual 51",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 45,
    "url": "/assets/IMG_1437.jpg",
    "category": "reception_outdoor",
    "title": "JS Room Visual 52",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 46,
    "url": "/assets/IMG_1438.jpg",
    "category": "reception_outdoor",
    "title": "JS Room Visual 53",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 47,
    "url": "/assets/IMG_1439.jpg",
    "category": "reception_outdoor",
    "title": "JS Room Visual 54",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 48,
    "url": "/assets/room 1.jpg",
    "category": "exterior",
    "title": "JS Room Visual 62",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 50,
    "url": "/assets/room 3.jpg",
    "category": "amenities",
    "title": "JS Room Visual 64",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 51,
    "url": "/assets/room1.jpg",
    "category": "exterior",
    "title": "JS Room Visual 65",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  },
  {
    "id": 53,
    "url": "/assets/room3.jpg",
    "category": "amenities",
    "title": "JS Room Visual 67",
    "description": "Breathtaking view of our luxury JS Rooms image.",
    "featured": false,
    "type": "image"
  }
];

const GalleryScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Photos', count: galleryImages.length },
    { id: 'rooms', name: 'Rooms', count: galleryImages.filter(img => img.category === 'rooms').length },
    { id: 'wing', name: 'Wing', count: galleryImages.filter(img => img.category === 'wing').length },
    { id: 'bathroom', name: 'Bathroom', count: galleryImages.filter(img => img.category === 'bathroom').length },
    { id: 'reception_outdoor', name: 'Reception & Outdoor', count: galleryImages.filter(img => img.category === 'reception_outdoor').length }
  ];

  const filteredImages = galleryImages.filter(image => {
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const openLightbox = (image) => {
    setSelectedImage(image);
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedImage) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentImageIndex]);

  return (
    <div style={styles.container}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <span style={styles.heroBadge}>VISUAL EXPERIENCE</span>
            <h1 style={styles.heroTitle}>Gallery & Virtual Tours</h1>
            <p style={styles.heroSubtitle}>
              Explore our luxury accommodations, world-class amenities, and stunning surroundings through our curated photo gallery.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section style={styles.filtersSection}>
        <div style={styles.filtersContainer}>
          <div style={styles.categoryFilters}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  ...styles.categoryBtn,
                  ...(selectedCategory === category.id ? styles.categoryBtnActive : {})
                }}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Gallery Grid */}
      <section style={styles.gallerySection}>
        <div style={styles.galleryContainer}>
          {selectedCategory === 'all' ? (
            categories.filter(c => c.id !== 'all').map(category => {
              const categoryImages = galleryImages.filter(img => img.category === category.id && (
                img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                img.description.toLowerCase().includes(searchTerm.toLowerCase())
              ));
              if (categoryImages.length === 0) return null;
              return (
                <div key={category.id} style={{ marginBottom: '4rem' }}>
                  <div style={styles.galleryHeader}>
                    <h2 style={{...styles.galleryTitle, fontSize: '1.8rem', color: '#1A1A1A'}}>
                      {category.name}
                    </h2>
                    <span style={styles.imageCount}>{categoryImages.length} photos</span>
                  </div>
                  <div style={styles.galleryGrid}>
                    {categoryImages.map(image => (
                      <div key={image.id} style={styles.galleryItem} onClick={() => openLightbox(image)}>
                        <img src={encodeURI(image.url)} alt={image.title} style={styles.galleryImage} />
                        <div style={styles.galleryOverlay}>
                          <div style={styles.galleryContent}>
                            <h4 style={styles.galleryImageTitle}>{image.title}</h4>
                            <p style={styles.galleryImageDesc}>{image.description}</p>
                            {image.featured && <span style={styles.featuredBadge}>Featured</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div style={styles.galleryHeader}>
                <h2 style={styles.galleryTitle}>
                  {categories.find(cat => cat.id === selectedCategory)?.name}
                </h2>
                <span style={styles.imageCount}>{filteredImages.length} photos</span>
              </div>
              <div style={styles.galleryGrid}>
                {filteredImages.map(image => (
                  <div key={image.id} style={styles.galleryItem} onClick={() => openLightbox(image)}>
                    <img src={encodeURI(image.url)} alt={image.title} style={styles.galleryImage} />
                    <div style={styles.galleryOverlay}>
                      <div style={styles.galleryContent}>
                        <h4 style={styles.galleryImageTitle}>{image.title}</h4>
                        <p style={styles.galleryImageDesc}>{image.description}</p>
                        {image.featured && <span style={styles.featuredBadge}>Featured</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div style={styles.lightboxOverlay} onClick={closeLightbox}>
          <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={closeLightbox}>
              <FaTimes />
            </button>
            <button style={styles.prevBtn} onClick={prevImage}><FaChevronLeft /></button>
            <button style={styles.nextBtn} onClick={nextImage}><FaChevronRight /></button>
            <div style={styles.lightboxImageContainer}>
              <img src={selectedImage.url} alt={selectedImage.title} style={styles.lightboxImage} />
            </div>
            <div style={styles.lightboxInfo}>
              <h3 style={styles.lightboxTitle}>{selectedImage.title}</h3>
              <p style={styles.lightboxDescription}>{selectedImage.description}</p>
              <div style={styles.lightboxMeta}>
                <span style={styles.imageCounter}>
                  {currentImageIndex + 1} of {filteredImages.length}
                </span>
                <span style={styles.categoryTag}>
                  {categories.find(cat => cat.id === selectedImage.category)?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Experience JS ROOMS?</h2>
          <p style={styles.ctaText}>
            Book your stay and experience the luxury and comfort you've seen in our gallery.
          </p>
          <div style={styles.ctaButtons}>
            <Link to="/rooms" style={styles.ctaBtn}>
              <FaCalendarAlt style={styles.btnIcon} />
              Book Your Stay
            </Link>
            <Link to="/contact" style={styles.ctaSecondaryBtn}>
              <span>Contact Us</span>
              <FaArrowRight style={styles.btnIcon} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerMain}>
          <div style={styles.footerColumn}>
            <div style={styles.footerLogo}>
              <span style={styles.footerLogoText}>JS ROOMS</span>
              <span style={styles.footerLogoSubtext}>LUXURY LODGE</span>
            </div>
            <p style={styles.footerDescription}>
              Where elegance meets serenity. Experience premium hospitality
              amidst nature's finest landscapes.
            </p>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerTitle}>Quick Links</h4>
            <Link to="/rooms" style={styles.footerLink}>Rooms</Link>
            <Link to="/gallery" style={styles.footerLink}>Gallery</Link>
            <Link to="/about" style={styles.footerLink}>About Us</Link>
            <Link to="/contact" style={styles.footerLink}>Contact</Link>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerTitle}>Contact</h4>
            <div style={styles.contactItem}>
              <FaMapMarkerAlt style={styles.contactIcon} />
              <span>2043, S.M. Road, Arni to Cheyyar Road, Pudhupettai, S.V. Nagaram</span>
            </div>
            <div style={styles.contactItem}>
              <FaPhone style={styles.contactIcon} />
              <span>93604 15495 / 99523 59955</span>
            </div>
            <div style={styles.contactItem}>
              <FaEnvelope style={styles.contactIcon} />
              <span>jsroomsarni@gmail.com</span>
            </div>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <p style={styles.copyright}>
            © 2026 JS ROOMS Luxury Lodge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#FAF9F7',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  heroSection: {
    height: '60vh',
    minHeight: '400px',
    backgroundImage: `linear-gradient(rgba(26, 26, 26, 0.7), rgba(26, 26, 26, 0.8)), url(${room3Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    padding: '0 1.5rem',
    paddingTop: '80px',
  },
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    textAlign: 'center',
  },
  heroText: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  heroBadge: {
    display: 'inline-block',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    padding: '8px 20px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '1.5px',
    marginBottom: '1.5rem',
    color: '#D4AF37',
    border: '1px solid rgba(212, 175, 55, 0.3)',
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '700',
    lineHeight: '1.2',
    marginBottom: '1rem',
    color: 'white',
  },
  heroSubtitle: {
    fontSize: '1.1rem',
    opacity: 0.8,
    lineHeight: '1.6',
    color: 'rgba(255,255,255,0.8)',
    maxWidth: '500px',
    margin: '0 auto',
  },
  filtersSection: {
    padding: '2rem 1.5rem',
    backgroundColor: 'white',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
  },
  filtersContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
  },
  categoryFilters: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryBtn: {
    padding: '8px 16px',
    border: '1px solid #E5E5E5',
    borderRadius: '20px',
    backgroundColor: 'white',
    color: '#666',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  categoryBtnActive: {
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    borderColor: '#D4AF37',
  },
  gallerySection: {
    padding: '3rem 1.5rem',
  },
  galleryContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  galleryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  galleryTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1A1A1A',
  },
  imageCount: {
    fontSize: '14px',
    color: '#666',
    backgroundColor: '#F0F0F0',
    padding: '6px 12px',
    borderRadius: '20px',
  },
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  galleryItem: {
    position: 'relative',
    aspectRatio: '4/3',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  galleryOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.8))',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '1rem',
    opacity: 1,
  },
  galleryContent: {
    color: 'white',
  },
  galleryImageTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
  },
  galleryImageDesc: {
    fontSize: '13px',
    opacity: 0.9,
  },
  featuredBadge: {
    display: 'inline-block',
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600',
    marginTop: '0.5rem',
  },
  lightboxOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '2rem',
  },
  lightboxContent: {
    position: 'relative',
    maxWidth: '1200px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: '-40px',
    right: '0',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
  },
  prevBtn: {
    position: 'absolute',
    left: '-60px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '36px',
    cursor: 'pointer',
  },
  nextBtn: {
    position: 'absolute',
    right: '-60px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '36px',
    cursor: 'pointer',
  },
  lightboxImageContainer: {
    width: '100%',
    maxHeight: '70vh',
    display: 'flex',
    justifyContent: 'center',
  },
  lightboxImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  lightboxInfo: {
    marginTop: '2rem',
    textAlign: 'center',
    color: 'white',
  },
  lightboxTitle: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  lightboxDescription: {
    fontSize: '1rem',
    opacity: 0.8,
    marginBottom: '1rem',
  },
  lightboxMeta: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  ctaSection: {
    padding: '5rem 1.5rem',
    backgroundColor: '#1A1A1A',
    color: 'white',
    textAlign: 'center',
  },
  ctaContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
  },
  ctaText: {
    fontSize: '1.2rem',
    opacity: 0.8,
    marginBottom: '2.5rem',
  },
  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  ctaBtn: {
    padding: '14px 28px',
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    textDecoration: 'none',
    borderRadius: '25px',
    fontWeight: '600',
  },
  ctaSecondaryBtn: {
    padding: '14px 28px',
    border: '2px solid #D4AF37',
    color: '#D4AF37',
    textDecoration: 'none',
    borderRadius: '25px',
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#0A0A0A',
    color: 'white',
    padding: '4rem 1.5rem 2rem',
  },
  footerMain: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    marginBottom: '3rem',
  },
  footerColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  footerLogo: {
    marginBottom: '1rem',
  },
  footerLogoText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#D4AF37',
  },
  footerLogoSubtext: {
    fontSize: '10px',
    letterSpacing: '2px',
    color: '#D4AF37',
    display: 'block',
  },
  footerDescription: {
    fontSize: '14px',
    color: '#999',
    marginTop: '1rem',
  },
  footerTitle: {
    fontSize: '1.1rem',
    marginBottom: '1.5rem',
  },
  footerLink: {
    color: '#999',
    textDecoration: 'none',
    marginBottom: '0.75rem',
    fontSize: '14px',
  },
  contactItem: {
    display: 'flex',
    gap: '10px',
    marginBottom: '1rem',
    color: '#999',
    fontSize: '14px',
  },
  footerBottom: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: '2rem',
    textAlign: 'center',
  },
  copyright: {
    fontSize: '12px',
    color: '#666',
  }
};

export default GalleryScreen;
