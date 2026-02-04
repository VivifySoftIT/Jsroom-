import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import room1Image from '../Assets/room1.jpg';
import room2Image from '../Assets/room2.jpg';
import room3Image from '../Assets/room3.jpg';
import {
  FaBed,
  FaWifi,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaCheckCircle
} from 'react-icons/fa';

function HomeScreen() {

  return (
    <div style={styles.container}>
      <Navbar />

      <main style={styles.mainContent}>
        {/* Hero Section - Home */}
        <section style={styles.heroSection}>
          <div style={styles.heroContent}>
            <div style={styles.heroText}>
              <span style={styles.heroBadge}>LUXURY REDEFINED</span>
              <h1 style={styles.heroTitle}>
                Experience Elegance
                <br />
                At JS ROOMS
              </h1>
              <p style={styles.heroSubtitle}>
                Premium accommodations with breathtaking views and luxury amenities.
              </p>
              <div style={styles.heroButtons}>
                <Link to="/rooms" style={styles.primaryBtn}>
                  <FaCalendarAlt style={{ marginRight: '10px' }} />
                  <span>Book Your Stay</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section style={styles.featuresSection}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionSubtitle}>EXCLUSIVE AMENITIES</span>
            <h2 style={styles.sectionTitle}>Premium Experiences</h2>
          </div>

          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureIconContainer}>
                <FaBed style={styles.featureIcon} />
              </div>
              <h3 style={styles.featureTitle}>Comfortable Rooms</h3>
              <p style={styles.featureDescription}>
                Elegant rooms with premium amenities
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIconContainer}>
                <FaWifi style={styles.featureIcon} />
              </div>
              <h3 style={styles.featureTitle}>Free WiFi</h3>
              <p style={styles.featureDescription}>
                High-speed internet connectivity throughout the property
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIconContainer}>
                <FaWifi style={styles.featureIcon} />
              </div>
              <h3 style={styles.featureTitle}>Premium Connectivity</h3>
              <p style={styles.featureDescription}>
                High-speed Wi-Fi and modern business facilities throughout
              </p>
            </div>
          </div>
        </section>

        {/* Rooms Showcase */}
        <section style={styles.roomsSection}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionSubtitle}>ACCOMMODATIONS</span>
            <h2 style={styles.sectionTitle}>Our Premium Rooms</h2>
          </div>

          <div style={styles.roomsGrid}>
            <div style={styles.roomCard}>
              <div style={styles.roomImageContainer}>
                <img src={room2Image} alt="Double Room" style={styles.roomImage} />
                <div style={styles.roomOverlay}>
                  <span style={styles.roomPrice}>₹499 Per Night</span>
                </div>
              </div>
              <div style={styles.roomContent}>
                <h3 style={styles.roomTitle}>Double AC Room</h3>
                <p style={styles.roomDescription}>
                  Spacious double bedroom perfect for couples with city views
                </p>
                <div style={styles.roomFeatures}>
                  <span style={styles.roomFeature}>65 m²</span>
                  <span style={styles.roomFeature}>Max: 3 Guests</span>
                  <span style={styles.roomFeature}>Free Breakfast</span>
                </div>
                <div style={styles.roomBenefits}>
                  <div style={styles.benefitItem}>
                    <FaCheckCircle style={styles.checkIcon} />
                    <span>King Size Bed</span>
                  </div>
                  <div style={styles.benefitItem}>
                    <FaCheckCircle style={styles.checkIcon} />
                    <span>Private Balcony</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.roomCard}>
              <div style={styles.roomImageContainer}>
                <img src={room1Image} alt="Single Room" style={styles.roomImage} />
                <div style={styles.roomOverlay}>
                  <span style={styles.roomPrice}>₹299 Per Night</span>
                </div>
              </div>
              <div style={styles.roomContent}>
                <h3 style={styles.roomTitle}>Single AC Room</h3>
                <p style={styles.roomDescription}>
                  Comfortable room with premium amenities and stunning views
                </p>
                <div style={styles.roomFeatures}>
                  <span style={styles.roomFeature}>45 m²</span>
                  <span style={styles.roomFeature}>Max: 2 Guests</span>
                  <span style={styles.roomFeature}>City View</span>
                </div>
                <div style={styles.roomBenefits}>
                  <div style={styles.benefitItem}>
                    <FaCheckCircle style={styles.checkIcon} />
                    <span>Queen Size Bed</span>
                  </div>
                  <div style={styles.benefitItem}>
                    <FaCheckCircle style={styles.checkIcon} />
                    <span>Work Desk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.roomsCta}>
            <Link to="/rooms" style={styles.viewAllBtn}>
              <span>View All Rooms</span>
              <FaArrowRight style={{ marginLeft: '10px' }} />
            </Link>
          </div>
        </section>

        {/* Experience Section - About */}
        <section style={styles.experienceSection} className="experience-section">
          <div style={styles.experienceContent} className="experience-content">
            <div style={styles.experienceText} className="experience-text">
              <span style={styles.experienceBadge}>THE EXPERIENCE</span>
              <h2 style={styles.experienceTitle}>
                Crafting Unforgettable Memories
              </h2>
              <p style={styles.experienceDescription}>
                At JS ROOMS, luxury is found in the details. Our dedicated team ensures
                every aspect of your stay exceeds expectations with personalized service.
              </p>
              <div style={styles.experienceStats} className="experience-stats">
                <div style={styles.statItem} className="stat-item">
                  <div style={styles.statNumber}>500+</div>
                  <div style={styles.statLabel}>Happy Guests</div>
                </div>
                <div style={styles.statItem} className="stat-item">
                  <div style={styles.statNumber}>50+</div>
                  <div style={styles.statLabel}>Luxury Rooms</div>
                </div>
                <div style={styles.statItem} className="stat-item">
                  <div style={styles.statNumber}>4.9</div>
                  <div style={styles.statLabel}>Rating</div>
                </div>
                <div style={styles.statItem} className="stat-item">
                  <div style={styles.statNumber}>24/7</div>
                  <div style={styles.statLabel}>Service</div>
                </div>
              </div>
            </div>
            <div style={styles.experienceImage} className="experience-image">
              <img src={room3Image} alt="Luxury Experience" style={styles.experienceImg} />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={styles.ctaSection}>
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaTitle}>Ready for an Unforgettable Experience?</h2>
            <p style={styles.ctaText}>
              Book your stay at JS ROOMS and discover luxury redefined.
            </p>
            <div style={styles.ctaButtons}>
              <Link to="/rooms" style={styles.ctaPrimaryBtn}>
                <span>Book Now</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Contact Section */}
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
            <div style={styles.socialLinks}>
              <a href="#" style={styles.socialLink}>
                <FaInstagram />
              </a>
              <a href="#" style={styles.socialLink}>
                <FaTwitter />
              </a>
              <a href="#" style={styles.socialLink}>
                <FaFacebookF />
              </a>
            </div>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerTitle}>Quick Links</h4>
            <Link to="/rooms" style={styles.footerLink}>
              Rooms
            </Link>
            <Link to="/gallery" style={styles.footerLink}>
              Gallery
            </Link>
            <Link to="/about" style={styles.footerLink}>
              About Us
            </Link>
            <Link to="/gallery" style={styles.footerLink}>
              Gallery
            </Link>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerTitle}>Contact</h4>
            <div style={styles.contactItem}>
              <FaMapMarkerAlt style={styles.contactIcon} />
              <span>123 Luxury Lane, Mountain View, CA 94040</span>
            </div>
            <div style={styles.contactItem}>
              <FaPhone style={styles.contactIcon} />
              <span>+918947382799</span>
            </div>
            <div style={styles.contactItem}>
              <FaEnvelope style={styles.contactIcon} />
              <span>info@jsrooms.com</span>
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
}

// Modern Premium Design with updated styles
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    backgroundColor: '#FAF9F7',
    color: '#1A1A1A',
    overflowX: 'hidden',
  },

  mainContent: {
    flex: 1,
  },

  // Hero Section
  heroSection: {
    height: '90vh',
    minHeight: '600px',
    backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.8)), url(${room1Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    padding: '0 1.5rem',
    marginTop: '80px', // Add margin-top to account for fixed navbar
    '@media (max-width: 768px)': {
      height: '70vh',
      minHeight: '500px',
      padding: '0 1rem',
      marginTop: '80px',
    },
    '@media (max-width: 480px)': {
      height: '60vh',
      minHeight: '400px',
      marginTop: '80px',
    },
  },

  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },

  heroText: {
    maxWidth: '650px',
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
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: '700',
    lineHeight: '1.1',
    marginBottom: '1.5rem',
    color: 'white',
  },

  heroSubtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    opacity: 0.9,
    lineHeight: '1.6',
    marginBottom: '2.5rem',
    color: 'rgba(255,255,255,0.8)',
    maxWidth: '500px',
  },

  heroButtons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.75rem',
    },
  },

  primaryBtn: {
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#0A0A0A',
    textDecoration: 'none',
    borderRadius: '25px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    fontSize: '15px',
    transition: 'all 0.3s ease',
  },

  secondaryBtn: {
    padding: '14px 32px',
    backgroundColor: 'transparent',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '25px',
    fontWeight: '600',
    border: '2px solid rgba(255,255,255,0.3)',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },

  // Features Section
  featuresSection: {
    padding: '3rem 1.5rem',
    backgroundColor: '#FAF9F7',
    '@media (max-width: 768px)': {
      padding: '2rem 1rem',
    },
  },

  sectionHeader: {
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto 3.5rem',
  },

  sectionSubtitle: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#D4AF37',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '12px',
  },

  sectionTitle: {
    fontSize: 'clamp(2rem, 4vw, 2.8rem)',
    fontWeight: '700',
    color: '#0A0A0A',
    lineHeight: '1.2',
  },

  featuresGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: '1fr',
      gap: '1rem',
    },
  },

  featureCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '16px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(0,0,0,0.05)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
  },

  featureIconContainer: {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.25rem',
  },

  featureIcon: {
    fontSize: '1.5rem',
    color: 'white',
  },

  featureTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
    color: '#0A0A0A',
  },

  featureDescription: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
  },

  // Rooms Section
  roomsSection: {
    padding: '3rem 1.5rem',
    backgroundColor: 'white',
    '@media (max-width: 768px)': {
      padding: '2rem 1rem',
    },
  },

  roomsGrid: {
    maxWidth: '1200px',
    margin: '0 auto 3rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: '1fr',
      gap: '1rem',
    },
  },

  roomCard: {
    backgroundColor: '#FAF9F7',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },

  roomImageContainer: {
    height: '220px',
    position: 'relative',
    overflow: 'hidden',
  },

  roomImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },

  roomOverlay: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
    padding: '1rem',
  },

  roomPrice: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'white',
  },

  roomContent: {
    padding: '1.5rem',
  },

  roomTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
    color: '#0A0A0A',
  },

  roomDescription: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
    marginBottom: '1rem',
  },

  roomFeatures: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
  },

  roomFeature: {
    fontSize: '12px',
    color: '#D4AF37',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    padding: '4px 10px',
    borderRadius: '10px',
    fontWeight: '500',
  },

  roomBenefits: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginTop: '1rem',
  },

  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#666',
  },

  checkIcon: {
    color: '#D4AF37',
    fontSize: '14px',
  },

  roomsCta: {
    textAlign: 'center',
  },

  viewAllBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '12px 28px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#0A0A0A',
    textDecoration: 'none',
    borderRadius: '20px',
    fontWeight: '600',
    fontSize: '15px',
    transition: 'all 0.3s ease',
  },

  // Experience Section
  experienceSection: {
    padding: '3rem 1.5rem',
    backgroundColor: '#0A0A0A',
    color: 'white',
    '@media (max-width: 768px)': {
      padding: '2rem 1rem',
    },
  },

  experienceContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '2rem',
      textAlign: 'center',
    },
  },

  experienceText: {
    maxWidth: '500px',
    '@media (max-width: 768px)': {
      maxWidth: '100%',
      order: 1,
    },
  },

  experienceBadge: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#D4AF37',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '1rem',
  },

  experienceTitle: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight: '700',
    marginBottom: '1.5rem',
    lineHeight: '1.2',
  },

  experienceDescription: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: '1.6',
    marginBottom: '2.5rem',
  },

  experienceStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
      maxWidth: '100%',
      overflow: 'hidden',
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '0.75rem',
    },
  },

  statItem: {
    textAlign: 'center',
    minWidth: '0',
    '@media (max-width: 768px)': {
      padding: '1rem 0.5rem',
      background: 'rgba(212, 175, 55, 0.1)',
      borderRadius: '8px',
      border: '1px solid rgba(212, 175, 55, 0.2)',
    },
    '@media (max-width: 480px)': {
      padding: '0.75rem 0.25rem',
      borderRadius: '6px',
    },
  },

  statNumber: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: '700',
    color: '#D4AF37',
    marginBottom: '4px',
    lineHeight: '1',
    '@media (max-width: 768px)': {
      fontSize: '1.6rem',
      marginBottom: '0.5rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.4rem',
      marginBottom: '0.25rem',
    },
  },

  statLabel: {
    fontSize: 'clamp(0.8rem, 2vw, 13px)',
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
    lineHeight: '1.2',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    '@media (max-width: 768px)': {
      fontSize: '0.8rem',
      color: 'rgba(255,255,255,0.8)',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.7rem',
      hyphens: 'auto',
    },
  },

  experienceImage: {
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    '@media (max-width: 768px)': {
      order: 2,
      margin: '0 auto',
      maxWidth: '100%',
    },
  },

  experienceImg: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
  },

  // Premium Enquiry Section
  enquirySection: {
    padding: '3rem 1.5rem',
    backgroundColor: '#FAF9F7',
  },

  enquiryContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  enquiryGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'start',
  },

  enquiryLeft: {
    paddingRight: '2rem',
  },

  enquiryHeader: {
    marginBottom: '3rem',
  },

  enquiryBadge: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#D4AF37',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '12px',
  },

  enquiryTitle: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#0A0A0A',
    lineHeight: '1.2',
  },

  enquirySubtitle: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6',
  },

  enquiryBenefits: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  benefitCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid rgba(0,0,0,0.05)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  },

  benefitIcon: {
    fontSize: '1.5rem',
    color: '#D4AF37',
    minWidth: '40px',
    paddingTop: '4px',
  },

  benefitTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '4px',
    color: '#0A0A0A',
  },

  benefitText: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
  },

  enquiryRight: {
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
    border: '1px solid rgba(0,0,0,0.05)',
  },

  enquiryForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },

  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },

  formLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#0A0A0A',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  inputIcon: {
    fontSize: '14px',
    color: '#D4AF37',
    opacity: 0.8,
  },

  formInput: {
    padding: '14px 16px',
    border: '1px solid #E5E5E5',
    borderRadius: '10px',
    fontSize: '15px',
    backgroundColor: '#FAF9F7',
    transition: 'all 0.3s ease',
  },

  formSelect: {
    padding: '14px 16px',
    border: '1px solid #E5E5E5',
    borderRadius: '10px',
    fontSize: '15px',
    backgroundColor: '#FAF9F7',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23D4AF37' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    backgroundSize: '16px',
  },

  formTextarea: {
    padding: '14px 16px',
    border: '1px solid #E5E5E5',
    borderRadius: '10px',
    fontSize: '15px',
    backgroundColor: '#FAF9F7',
    resize: 'vertical',
    minHeight: '100px',
    fontFamily: 'inherit',
  },

  submitBtn: {
    padding: '16px 24px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#0A0A0A',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    marginTop: '1rem',
    fontFamily: 'inherit',
  },

  // CTA Section
  ctaSection: {
    padding: '3rem 1.5rem',
    backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.9)), url(${room2Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    color: 'white',
  },

  ctaContent: {
    maxWidth: '700px',
    margin: '0 auto',
  },

  ctaTitle: {
    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
    fontWeight: '700',
    marginBottom: '1rem',
    lineHeight: '1.2',
  },

  ctaText: {
    fontSize: '16px',
    opacity: 0.8,
    marginBottom: '2.5rem',
    lineHeight: '1.6',
  },

  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  ctaPrimaryBtn: {
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#0A0A0A',
    textDecoration: 'none',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '15px',
    transition: 'all 0.3s ease',
  },

  // Footer
  footer: {
    backgroundColor: '#0A0A0A',
    color: 'white',
    padding: '4rem 1.5rem 2rem',
    '@media (max-width: 768px)': {
      padding: '3rem 1rem 1.5rem',
    },
  },

  footerMain: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    marginBottom: '3rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      marginBottom: '2rem',
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: '1fr',
      gap: '1.5rem',
      textAlign: 'center',
    },
  },

  footerColumn: {
    display: 'flex',
    flexDirection: 'column',
  },

  footerLogo: {
    marginBottom: '1.25rem',
  },

  footerLogoText: {
    fontSize: '1.4rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'block',
  },

  footerLogoSubtext: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#D4AF37',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    display: 'block',
    marginTop: '2px',
  },

  footerDescription: {
    fontSize: '14px',
    color: '#999',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
  },

  socialLinks: {
    display: 'flex',
    gap: '12px',
  },

  socialLink: {
    width: '36px',
    height: '36px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },

  footerTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '1.25rem',
    color: 'white',
  },

  footerLink: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '14px',
    marginBottom: '10px',
    transition: 'all 0.3s ease',
    textAlign: 'left',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },

  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    fontSize: '14px',
    color: '#999',
    marginBottom: '12px',
    lineHeight: '1.5',
  },

  contactIcon: {
    fontSize: '14px',
    opacity: 0.7,
    marginTop: '2px',
  },

  footerBottom: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },

  copyright: {
    fontSize: '13px',
    color: '#999',
    textAlign: 'center',
    margin: 0,
  },

  footerLinks: {
    display: 'flex',
    gap: '1.5rem',
  },

  bottomLink: {
    fontSize: '13px',
    color: '#999',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },

  // Animations
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};

export default HomeScreen;