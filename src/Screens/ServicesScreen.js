import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { 
  FaUtensils, 
  FaWifi,
  FaGift,
  FaCalendarAlt,
  FaClock,
  FaPhone,
  FaCheckCircle,
  FaStar,
  FaArrowRight,
  FaMapMarkerAlt,
  FaUsers,
  FaHeart
} from 'react-icons/fa';

// Service images from Unsplash
const serviceImages = {
  dining: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
  events: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80'
};

const ServicesScreen = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      name: 'Fine Dining Restaurant',
      category: 'dining',
      icon: FaUtensils,
      image: serviceImages.dining,
      price: 'From ₹80',
      duration: '1-2 hours',
      rating: 4.8,
      reviews: 456,
      description: 'Experience culinary excellence with our award-winning chefs and locally sourced ingredients.',
      features: [
        'Multi-cuisine Menu',
        'Wine Pairing',
        'Private Dining',
        'Chef\'s Special',
        'Vegetarian Options',
        'Room Service'
      ],
      hours: '6:00 AM - 11:00 PM',
      location: '2nd Floor, Main Building',
      popular: true,
      details: 'Our restaurant combines international flavors with local specialties, creating an unforgettable dining experience.'
    },
    {
      id: 2,
      name: 'Event & Wedding Planning',
      category: 'events',
      icon: FaGift,
      image: serviceImages.events,
      price: 'Custom Quote',
      duration: 'Full Service',
      rating: 4.9,
      reviews: 87,
      description: 'Create unforgettable memories with our comprehensive event and wedding planning services.',
      features: [
        'Wedding Ceremonies',
        'Corporate Events',
        'Birthday Parties',
        'Anniversary Celebrations',
        'Catering Services',
        'Decoration & Setup'
      ],
      hours: 'By Appointment',
      location: 'Event Planning Office',
      popular: true,
      details: 'From intimate gatherings to grand celebrations, our expert team handles every detail of your special event.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', icon: FaGift },
    { id: 'dining', name: 'Dining', icon: FaUtensils },
    { id: 'events', name: 'Events', icon: FaGift }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div style={styles.container}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <span style={styles.heroBadge}>PREMIUM SERVICES</span>
            <h1 style={styles.heroTitle}>Exceptional Services & Amenities</h1>
            <p style={styles.heroSubtitle}>
              Discover our comprehensive range of luxury services designed to make your stay unforgettable.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section style={styles.filterSection}>
        <div style={styles.filterContainer}>
          <div style={styles.categoryTabs}>
            {categories.map(category => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    ...styles.categoryTab,
                    ...(selectedCategory === category.id ? styles.categoryTabActive : {})
                  }}
                >
                  <IconComponent style={styles.categoryIcon} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section style={styles.servicesSection}>
        <div style={styles.servicesContainer}>
          <div style={styles.servicesGrid}>
            {filteredServices.map(service => {
              const IconComponent = service.icon;
              return (
                <div key={service.id} style={styles.serviceCard}>
                  {service.popular && (
                    <div style={styles.popularBadge}>
                      <FaStar style={styles.starIcon} />
                      Popular
                    </div>
                  )}
                  
                  <div style={styles.serviceImageContainer}>
                    <img src={service.image} alt={service.name} style={styles.serviceImage} />
                    <div style={styles.serviceOverlay}>
                      <div style={styles.serviceIconContainer}>
                        <IconComponent style={styles.serviceIcon} />
                      </div>
                    </div>
                  </div>

                  <div style={styles.serviceContent}>
                    <div style={styles.serviceHeader}>
                      <h3 style={styles.serviceName}>{service.name}</h3>
                      <div style={styles.serviceRating}>
                        <FaStar style={styles.ratingIcon} />
                        <span style={styles.ratingValue}>{service.rating}</span>
                        <span style={styles.reviewCount}>({service.reviews})</span>
                      </div>
                    </div>

                    <p style={styles.serviceDescription}>{service.description}</p>

                    <div style={styles.serviceInfo}>
                      <div style={styles.infoItem}>
                        <FaClock style={styles.infoIcon} />
                        <span>{service.duration}</span>
                      </div>
                      <div style={styles.infoItem}>
                        <FaMapMarkerAlt style={styles.infoIcon} />
                        <span>{service.location}</span>
                      </div>
                      <div style={styles.infoItem}>
                        <span style={styles.servicePrice}>{service.price}</span>
                      </div>
                    </div>

                    <div style={styles.serviceFeatures}>
                      {service.features.slice(0, 4).map((feature, index) => (
                        <div key={index} style={styles.featureItem}>
                          <FaCheckCircle style={styles.checkIcon} />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {service.features.length > 4 && (
                        <div style={styles.moreFeatures}>
                          +{service.features.length - 4} more features
                        </div>
                      )}
                    </div>

                    <div style={styles.serviceActions}>
                      <button 
                        onClick={() => setSelectedService(service)}
                        style={styles.detailsBtn}
                      >
                        View Details
                        <FaArrowRight style={styles.btnIcon} />
                      </button>
                      <Link to="/rooms" style={styles.bookBtn}>
                        <FaCalendarAlt style={styles.btnIcon} />
                        Book Service
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <div style={styles.modalOverlay} onClick={() => setSelectedService(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.closeBtn}
              onClick={() => setSelectedService(null)}
            >
              ×
            </button>
            
            <div style={styles.modalHeader}>
              <img 
                src={selectedService.image} 
                alt={selectedService.name} 
                style={styles.modalImage}
              />
              <div style={styles.modalInfo}>
                <h2 style={styles.modalTitle}>{selectedService.name}</h2>
                <div style={styles.modalRating}>
                  <FaStar style={styles.ratingIcon} />
                  <span>{selectedService.rating}</span>
                  <span style={styles.reviewCount}>({selectedService.reviews} reviews)</span>
                </div>
                <p style={styles.modalDescription}>{selectedService.details}</p>
              </div>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.modalSection}>
                <h3 style={styles.sectionTitle}>Service Details</h3>
                <div style={styles.detailsGrid}>
                  <div style={styles.detailItem}>
                    <FaClock style={styles.detailIcon} />
                    <div>
                      <strong>Duration:</strong> {selectedService.duration}
                    </div>
                  </div>
                  <div style={styles.detailItem}>
                    <FaMapMarkerAlt style={styles.detailIcon} />
                    <div>
                      <strong>Location:</strong> {selectedService.location}
                    </div>
                  </div>
                  <div style={styles.detailItem}>
                    <FaClock style={styles.detailIcon} />
                    <div>
                      <strong>Hours:</strong> {selectedService.hours}
                    </div>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.priceTag}>{selectedService.price}</span>
                  </div>
                </div>
              </div>

              <div style={styles.modalSection}>
                <h3 style={styles.sectionTitle}>Features & Amenities</h3>
                <div style={styles.featuresGrid}>
                  {selectedService.features.map((feature, index) => (
                    <div key={index} style={styles.modalFeature}>
                      <FaCheckCircle style={styles.checkIcon} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.modalActions}>
                <Link to="/contact" style={styles.contactBtn}>
                  <FaPhone style={styles.btnIcon} />
                  Contact Us
                </Link>
                <Link to="/rooms" style={styles.modalBookBtn}>
                  <FaCalendarAlt style={styles.btnIcon} />
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Need Custom Services?</h2>
          <p style={styles.ctaText}>
            Our team can create personalized service packages tailored to your specific needs and preferences.
          </p>
          <div style={styles.ctaButtons}>
            <Link to="/contact" style={styles.ctaBtn}>
              <FaPhone style={styles.btnIcon} />
              Contact Concierge
            </Link>
            <Link to="/booking" style={styles.ctaSecondaryBtn}>
              <FaHeart style={styles.btnIcon} />
              Create Package
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

  // Hero Section
  heroSection: {
    height: '60vh',
    minHeight: '400px',
    backgroundImage: 'linear-gradient(rgba(26, 26, 26, 0.7), rgba(26, 26, 26, 0.8)), url(https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    padding: '0 1.5rem',
    marginTop: '80px',
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

  // Filter Section
  filterSection: {
    padding: '2rem 1.5rem',
    backgroundColor: 'white',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
  },

  filterContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  categoryTabs: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  categoryTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    border: '1px solid #E5E5E5',
    borderRadius: '25px',
    backgroundColor: 'white',
    color: '#666',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },

  categoryTabActive: {
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    borderColor: '#D4AF37',
  },

  categoryIcon: {
    fontSize: '16px',
  },

  // Services Section
  servicesSection: {
    padding: '3rem 1.5rem',
  },

  servicesContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
  },

  serviceCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    position: 'relative',
  },

  popularBadge: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    zIndex: 2,
  },

  starIcon: {
    fontSize: '10px',
  },

  serviceImageContainer: {
    height: '200px',
    position: 'relative',
    overflow: 'hidden',
  },

  serviceImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },

  serviceOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  serviceIconContainer: {
    width: '60px',
    height: '60px',
    backgroundColor: 'rgba(212, 175, 55, 0.9)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  },

  serviceIcon: {
    fontSize: '24px',
    color: '#1A1A1A',
  },

  serviceContent: {
    padding: '1.5rem',
  },

  serviceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.75rem',
  },

  serviceName: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: 0,
  },

  serviceRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },

  ratingIcon: {
    color: '#D4AF37',
    fontSize: '14px',
  },

  ratingValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A1A1A',
  },

  reviewCount: {
    fontSize: '12px',
    color: '#666',
  },

  serviceDescription: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
    marginBottom: '1rem',
  },

  serviceInfo: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#666',
  },

  infoIcon: {
    color: '#D4AF37',
    fontSize: '14px',
  },

  servicePrice: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    color: '#D4AF37',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
  },

  serviceFeatures: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },

  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#666',
  },

  checkIcon: {
    color: '#D4AF37',
    fontSize: '12px',
  },

  moreFeatures: {
    gridColumn: 'span 2',
    color: '#D4AF37',
    fontSize: '12px',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '0.5rem',
  },

  serviceActions: {
    display: 'flex',
    gap: '0.75rem',
  },

  detailsBtn: {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: 'transparent',
    color: '#D4AF37',
    border: '1px solid #D4AF37',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },

  bookBtn: {
    flex: 1,
    padding: '12px 16px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    textDecoration: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    transition: 'all 0.3s ease',
  },

  btnIcon: {
    fontSize: '12px',
  },

  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
  },

  modalContent: {
    backgroundColor: 'white',
    borderRadius: '16px',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
  },

  closeBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    padding: '2rem',
    alignItems: 'center',
  },

  modalImage: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '12px',
  },

  modalInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1A1A1A',
    margin: 0,
  },

  modalRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  modalDescription: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
  },

  modalBody: {
    padding: '0 2rem 2rem',
  },

  modalSection: {
    marginBottom: '2rem',
  },

  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '1rem',
  },

  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
  },

  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#666',
  },

  detailIcon: {
    color: '#D4AF37',
    fontSize: '16px',
  },

  priceTag: {
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
  },

  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.75rem',
  },

  modalFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#666',
  },

  modalActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },

  contactBtn: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#D4AF37',
    border: '1px solid #D4AF37',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },

  modalBookBtn: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },

  // CTA Section
  ctaSection: {
    padding: '4rem 1.5rem',
    backgroundColor: '#1A1A1A',
    textAlign: 'center',
  },

  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },

  ctaTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '1rem',
  },

  ctaText: {
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.8)',
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
    color: 'white',
    border: '2px solid rgba(255,255,255,0.3)',
    textDecoration: 'none',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  },
};

export default ServicesScreen;