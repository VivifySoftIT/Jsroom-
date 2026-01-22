import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { 
  FaImages, 
  FaExpand,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaCalendarAlt,
  FaArrowRight,
  FaFilter,
  FaSearch
} from 'react-icons/fa';

// Gallery images from Unsplash
const galleryImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    category: 'rooms',
    title: 'Double AC Room',
    description: 'Spacious double bedroom with city views',
    featured: true
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    category: 'amenities',
    title: 'Fitness Center',
    description: 'State-of-the-art gym facilities',
    featured: false
  },{
    id: 4,
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    category: 'rooms',
    title: 'Triple AC Room',
    description: 'Spacious triple bedroom with modern amenities',
    featured: false
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    category: 'rooms',
    title: 'Single Non-AC Room',
    description: 'Comfortable single bedroom with natural ventilation',
    featured: false
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    category: 'rooms',
    title: 'Double Non-AC Room',
    description: 'Cozy double bedroom with ceiling fans',
    featured: false
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    category: 'rooms',
    title: 'Triple Non-AC Room',
    description: 'Affordable triple bedroom accommodation',
    featured: false
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
    category: 'rooms',
    title: 'Single AC Room',
    description: 'Modern single bedroom with air conditioning',
    featured: false
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    category: 'exterior',
    title: 'Hotel Exterior',
    description: 'Stunning architectural design',
    featured: true
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
    { id: 'amenities', name: 'Amenities', count: galleryImages.filter(img => img.category === 'amenities').length },
    { id: 'exterior', name: 'Exterior & Views', count: galleryImages.filter(img => img.category === 'exterior').length }
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
          {/* Category Filters */}
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

      {/* Featured Gallery Section */}
      {selectedCategory === 'all' && (
        <section style={styles.featuredSection}>
          <div style={styles.featuredContainer}>
            <h2 style={styles.featuredTitle}>Featured Photos</h2>
            <div style={styles.featuredGrid}>
              {galleryImages.filter(img => img.featured).slice(0, 4).map(image => (
                <div key={image.id} style={styles.featuredCard} onClick={() => openLightbox(image)}>
                  <img src={image.url} alt={image.title} style={styles.featuredImage} />
                  <div style={styles.featuredOverlay}>
                    <div style={styles.featuredContent}>
                      <h3 style={styles.featuredImageTitle}>{image.title}</h3>
                      <p style={styles.featuredImageDesc}>{image.description}</p>
                      <div style={styles.expandIcon}>
                        <FaExpand />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Gallery Grid */}
      <section style={styles.gallerySection}>
        <div style={styles.galleryContainer}>
          <div style={styles.galleryHeader}>
            <h2 style={styles.galleryTitle}>
              {selectedCategory === 'all' ? 'All Photos' : categories.find(cat => cat.id === selectedCategory)?.name}
            </h2>
            <span style={styles.imageCount}>{filteredImages.length} photos</span>
          </div>

          <div style={styles.galleryGrid}>
            {filteredImages.map(image => (
              <div 
                key={image.id} 
                style={styles.galleryItem}
                onClick={() => openLightbox(image)}
              >
                <img src={image.url} alt={image.title} style={styles.galleryImage} />
                <div style={styles.galleryOverlay}>
                  <div style={styles.galleryContent}>
                    <h4 style={styles.galleryImageTitle}>{image.title}</h4>
                    <p style={styles.galleryImageDesc}>{image.description}</p>
                    {image.featured && (
                      <span style={styles.featuredBadge}>Featured</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div style={styles.noResults}>
              <FaImages style={styles.noResultsIcon} />
              <h3>No photos found</h3>
              <p>Try adjusting your filters or search terms.</p>
            </div>
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
            
            <button style={styles.prevBtn} onClick={prevImage}>
              <FaChevronLeft />
            </button>
            
            <button style={styles.nextBtn} onClick={nextImage}>
              <FaChevronRight />
            </button>

            <div style={styles.lightboxImageContainer}>
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title} 
                style={styles.lightboxImage}
              />
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

      {/* Virtual Tour CTA */}
      <section style={styles.virtualTourSection}>
        <div style={styles.virtualTourContent}>
          <div style={styles.tourInfo}>
            <span style={styles.tourBadge}>VIRTUAL EXPERIENCE</span>
            <h2 style={styles.tourTitle}>Take a Virtual Tour</h2>
            <p style={styles.tourDescription}>
              Experience JS ROOMS from the comfort of your home with our immersive 360° virtual tour. 
              Explore our rooms, amenities, and facilities in stunning detail.
            </p>
            <div style={styles.tourFeatures}>
              <div style={styles.tourFeature}>
                <FaPlay style={styles.tourIcon} />
                <span>360° Room Views</span>
              </div>
              <div style={styles.tourFeature}>
                <FaImages style={styles.tourIcon} />
                <span>Interactive Gallery</span>
              </div>
              <div style={styles.tourFeature}>
                <FaExpand style={styles.tourIcon} />
                <span>Full Screen Experience</span>
              </div>
            </div>
            <button style={styles.tourBtn}>
              <FaPlay style={styles.btnIcon} />
              Start Virtual Tour
            </button>
          </div>
          <div style={styles.tourPreview}>
            <div style={styles.tourVideoContainer}>
              <img 
                src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80" 
                alt="Virtual Tour Preview" 
                style={styles.tourPreviewImage}
              />
              <div style={styles.playOverlay}>
                <FaPlay style={styles.playIcon} />
              </div>
            </div>
          </div>
        </div>
      </section>

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
  backgroundImage: 'linear-gradient(rgba(26, 26, 26, 0.7), rgba(26, 26, 26, 0.8)), url(https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  padding: '0 1.5rem',
  // If navbar is fixed, add padding-top instead of margin
  paddingTop: '80px', // This matches navbar height
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

  // Filters Section
  filtersSection: {
    padding: '2rem 1.5rem',
    backgroundColor: 'white',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
  },

  filtersContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  searchContainer: {
    position: 'relative',
    minWidth: '250px',
  },

  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#D4AF37',
    fontSize: '16px',
  },

  searchInput: {
    width: '100%',
    padding: '12px 12px 12px 40px',
    border: '1px solid #E5E5E5',
    borderRadius: '10px',
    fontSize: '14px',
    backgroundColor: '#FAF9F7',
    outline: 'none',
    transition: 'all 0.3s ease',
  },

  categoryFilters: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
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
    fontFamily: 'inherit',
  },

  categoryBtnActive: {
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    borderColor: '#D4AF37',
  },

  featuredFilter: {
    display: 'flex',
    alignItems: 'center',
  },

  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },

  checkbox: {
    width: '16px',
    height: '16px',
    accentColor: '#D4AF37',
  },

  checkboxText: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '500',
  },

  // Featured Section
  featuredSection: {
    padding: '3rem 1.5rem',
    backgroundColor: '#F8F8F8',
  },

  featuredContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  featuredTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '2rem',
    textAlign: 'center',
  },

  featuredGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },

  featuredCard: {
    position: 'relative',
    height: '300px',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  featuredImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },

  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
    padding: '2rem 1.5rem 1.5rem',
    color: 'white',
  },

  featuredContent: {
    position: 'relative',
  },

  featuredImageTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },

  featuredImageDesc: {
    fontSize: '14px',
    opacity: 0.9,
    lineHeight: '1.4',
  },

  expandIcon: {
    position: 'absolute',
    top: '-1rem',
    right: '0',
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(212, 175, 55, 0.9)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    color: '#1A1A1A',
  },

  // Gallery Section
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
  },

  galleryItem: {
    position: 'relative',
    aspectRatio: '4/3',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
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
    opacity: 0,
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1rem',
  },

  galleryContent: {
    color: 'white',
    marginTop: 'auto',
  },

  galleryImageTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
  },

  galleryImageDesc: {
    fontSize: '13px',
    opacity: 0.9,
    lineHeight: '1.3',
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

  galleryActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  expandBtn: {
    width: '36px',
    height: '36px',
    backgroundColor: 'rgba(212, 175, 55, 0.9)',
    border: 'none',
    borderRadius: '50%',
    color: '#1A1A1A',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },

  noResults: {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#666',
  },

  noResultsIcon: {
    fontSize: '3rem',
    color: '#D4AF37',
    marginBottom: '1rem',
  },

  // Lightbox Styles
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
    maxWidth: '90vw',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
  },

  closeBtn: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    border: 'none',
    borderRadius: '50%',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },

  prevBtn: {
    position: 'absolute',
    left: '-60px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '50px',
    height: '50px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '50%',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },

  nextBtn: {
    position: 'absolute',
    right: '-60px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '50px',
    height: '50px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '50%',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },

  lightboxImageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
  },

  lightboxImage: {
    maxWidth: '100%',
    maxHeight: '70vh',
    objectFit: 'contain',
    borderRadius: '8px',
  },

  lightboxInfo: {
    color: 'white',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto',
  },

  lightboxTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },

  lightboxDescription: {
    fontSize: '1rem',
    opacity: 0.8,
    marginBottom: '1rem',
    lineHeight: '1.5',
  },

  lightboxMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    opacity: 0.7,
  },

  imageCounter: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: '4px 12px',
    borderRadius: '12px',
  },

  categoryTag: {
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    padding: '4px 12px',
    borderRadius: '12px',
    fontWeight: '500',
  },

  // Virtual Tour Section
  virtualTourSection: {
    padding: '4rem 1.5rem',
    backgroundColor: '#1A1A1A',
  },

  virtualTourContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
  },

  tourInfo: {
    color: 'white',
  },

  tourBadge: {
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

  tourTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1rem',
    lineHeight: '1.2',
  },

  tourDescription: {
    fontSize: '1.1rem',
    opacity: 0.8,
    lineHeight: '1.6',
    marginBottom: '2rem',
  },

  tourFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
  },

  tourFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '1rem',
  },

  tourIcon: {
    color: '#D4AF37',
    fontSize: '18px',
  },

  tourBtn: {
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },

  tourPreview: {
    position: 'relative',
  },

  tourVideoContainer: {
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
  },

  tourPreviewImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
  },

  playOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80px',
    height: '80px',
    backgroundColor: 'rgba(212, 175, 55, 0.9)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },

  playIcon: {
    fontSize: '30px',
    color: '#1A1A1A',
    marginLeft: '4px',
  },

  // CTA Section
  ctaSection: {
    padding: '4rem 1.5rem',
    backgroundColor: '#FAF9F7',
    textAlign: 'center',
  },

  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },

  ctaTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: '1rem',
  },

  ctaText: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '2rem',
    lineHeight: '1.6',
  },

  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  ctaBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    textDecoration: 'none',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  },

  ctaSecondaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    backgroundColor: 'transparent',
    color: '#D4AF37',
    border: '2px solid #D4AF37',
    textDecoration: 'none',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  },

  btnIcon: {
    fontSize: '14px',
  },
};

export default GalleryScreen;





