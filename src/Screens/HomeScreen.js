import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { 
  FaBed, 
  FaUtensils, 
  FaWifi, 
  FaStar,
  FaCalendarAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaConciergeBell,
  FaUsers,
  FaCheckCircle
} from 'react-icons/fa';

// Import images
const heroBackground = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
const luxurySuite = 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80';
const diningArea = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80';
const mountainView = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80';
const logoImage = '../Assets/logoimg.png';

function HomeScreen() {
  const [enquiryData, setEnquiryData] = useState({
    fullName: '',
    email: '',
    phone: '',
    roomType: '',
    specialRequests: '',
    checkIn: '',
    checkOut: '',
    guests: '1'
  });

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your enquiry! We will contact you soon.');
    setEnquiryData({
      fullName: '',
      email: '',
      phone: '',
      roomType: '',
      specialRequests: '',
      checkIn: '',
      checkOut: '',
      guests: '1'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnquiryData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
                At JS Rooms
              </h1>
              <p style={styles.heroSubtitle}>
                Premium accommodations with breathtaking views and Luxury Services.
              </p>
              <div style={styles.heroButtons}>
                <Link to="/rooms" style={styles.primaryBtn}>
                  <FaCalendarAlt style={{ marginRight: '10px' }} />
                  <span>Book Your Stay</span>
                </Link>
                <Link to="/contact" style={styles.secondaryBtn}>
                  <span>Plan Your Stay</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Services */}
        <section style={styles.featuresSection}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionSubtitle}>EXCLUSIVE Services</span>
            <h2 style={styles.sectionTitle}>Premium Experiences</h2>
          </div>
          
          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureIconContainer}>
                <FaBed style={styles.featureIcon} />
              </div>
              <h3 style={styles.featureTitle}>Luxury Suites</h3>
              <p style={styles.featureDescription}>
                Elegant rooms with premium Services  
              </p>
            </div>
            
            <div style={styles.featureCard}>
              <div style={styles.featureIconContainer}>
                <FaUtensils style={styles.featureIcon} />
              </div>
              <h3 style={styles.featureTitle}>Fine Dining</h3>
              <p style={styles.featureDescription}>
                Gourmet cuisine by award-winning chefs using local ingredients
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
                <img src={luxurySuite} alt="Deluxe Suite" style={styles.roomImage} />
                <div style={styles.roomOverlay}>
                  <span style={styles.roomPrice}>₹299/night</span>
                </div>
              </div>
              <div style={styles.roomContent}>
                <h3 style={styles.roomTitle}>Deluxe Suite</h3>
                <p style={styles.roomDescription}>
                  Spacious suite with panoramic mountain views and private balcony
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
                <img src={diningArea} alt="Executive Room" style={styles.roomImage} />
                <div style={styles.roomOverlay}>
                  <span style={styles.roomPrice}>₹199/night</span>
                </div>
              </div>
              <div style={styles.roomContent}>
                <h3 style={styles.roomTitle}>Executive Room</h3>
                <p style={styles.roomDescription}>
                  Comfortable room with premium Services and stunning views
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
        <section style={styles.experienceSection}>
          <div style={styles.experienceContent}>
            <div style={styles.experienceText}>
              <span style={styles.experienceBadge}>THE EXPERIENCE</span>
              <h2 style={styles.experienceTitle}>
                Crafting Unforgettable Memories
              </h2>
              <p style={styles.experienceDescription}>
                At JS Rooms, luxury is found in the details. Our dedicated team ensures 
                every aspect of your stay exceeds expectations with personalized service.
              </p>
              <div style={styles.experienceStats}>
                <div style={styles.statItem}>
                  <div style={styles.statNumber}>500+</div>
                  <div style={styles.statLabel}>Happy Guests</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statNumber}>50+</div>
                  <div style={styles.statLabel}>Luxury Rooms</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statNumber}>4.9</div>
                  <div style={styles.statLabel}>Rating</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statNumber}>24/7</div>
                  <div style={styles.statLabel}>Service</div>
                </div>
              </div>
            </div>
            <div style={styles.experienceImage}>
              <img src={mountainView} alt="Mountain View" style={styles.experienceImg} />
            </div>
          </div>
        </section>

        {/* Premium Enquiry Form */}
        <section id="enquiry" style={styles.enquirySection}>
          <div style={styles.enquiryContainer}>
            <div style={styles.enquiryGrid}>
              {/* Left Column - Form Header & Info */}
              <div style={styles.enquiryLeft}>
                <div style={styles.enquiryHeader}>
                  <span style={styles.enquiryBadge}>PLAN YOUR STAY</span>
                  <h2 style={styles.enquiryTitle}>Request a Custom Quote</h2>
                  <p style={styles.enquirySubtitle}>
                    Let our concierge team create the perfect experience for you. 
                    Fill in your details and we'll get back to you within 24 hours.
                  </p>
                </div>
                
                <div style={styles.enquiryBenefits}>
                  <div style={styles.benefitCard}>
                    <FaConciergeBell style={styles.benefitIcon} />
                    <div>
                      <h4 style={styles.benefitTitle}>Personalized Service</h4>
                      <p style={styles.benefitText}>Tailored recommendations based on your preferences</p>
                    </div>
                  </div>
                  
                  <div style={styles.benefitCard}>
                    <FaStar style={styles.benefitIcon} />
                    <div>
                      <h4 style={styles.benefitTitle}>Best Rate Guarantee</h4>
                      <p style={styles.benefitText}>Get the best available rates for your stay</p>
                    </div>
                  </div>
                  
                  <div style={styles.benefitCard}>
                    <FaUsers style={styles.benefitIcon} />
                    <div>
                      <h4 style={styles.benefitTitle}>Dedicated Support</h4>
                      <p style={styles.benefitText}>24/7 concierge support for all your needs</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Form */}
              <div style={styles.enquiryRight}>
                <form onSubmit={handleEnquirySubmit} style={styles.enquiryForm}>
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>
                        <FaUser style={styles.inputIcon} />
                        Full Name
                      </label>
                      <input 
                        type="text"
                        name="fullName"
                        value={enquiryData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        style={styles.formInput}
                        required
                      />
                    </div>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>
                        <FaEnvelope style={styles.inputIcon} />
                        Email Address
                      </label>
                      <input 
                        type="email"
                        name="email"
                        value={enquiryData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        style={styles.formInput}
                        required
                      />
                    </div>
                  </div>
                  
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>
                        <FaPhone style={styles.inputIcon} />
                        Phone Number
                      </label>
                      <input 
                        type="tel"
                        name="phone"
                        value={enquiryData.phone}
                        onChange={handleInputChange}
                        placeholder="+91"
                        style={styles.formInput}
                        required
                      />
                    </div>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>
                        <FaBed style={styles.inputIcon} />
                        Room Type
                      </label>
                      <select 
                        name="roomType"
                        value={enquiryData.roomType}
                        onChange={handleInputChange}
                        style={styles.formSelect}
                        required
                      >
                        <option value="">Select room type</option>
                        <option value="deluxe">Deluxe Suite - $299/night</option>
                        <option value="executive">Executive Room - $199/night</option>
                      </select>
                    </div>
                  </div>
                  
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Check-in Date</label>
                      <input 
                        type="date"
                        name="checkIn"
                        value={enquiryData.checkIn}
                        onChange={handleInputChange}
                        style={styles.formInput}
                        required
                      />
                    </div>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Check-out Date</label>
                      <input 
                        type="date"
                        name="checkOut"
                        value={enquiryData.checkOut}
                        onChange={handleInputChange}
                        style={styles.formInput}
                        required
                      />
                    </div>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Number of Guests</label>
                      <select 
                        name="guests"
                        value={enquiryData.guests}
                        onChange={handleInputChange}
                        style={styles.formSelect}
                        required
                      >
                        {[1,2,3,4,5,6].map(num => (
                          <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      <FaConciergeBell style={styles.inputIcon} />
                      Special Requests
                    </label>
                    <textarea 
                      name="specialRequests"
                      value={enquiryData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="Tell us about any special requirements, dietary needs, or preferences..."
                      rows="4"
                      style={styles.formTextarea}
                    ></textarea>
                  </div>
                  
                  <button type="submit" style={styles.submitBtn}>
                    <FaEnvelope style={{ marginRight: '10px' }} />
                    <span>Send Enquiry</span>
                    <FaArrowRight style={{ marginLeft: '10px' }} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={styles.ctaSection}>
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaTitle}>Ready for an Unforgettable Experience?</h2>
            <p style={styles.ctaText}>
              Book your stay at JS Rooms and discover luxury redefined.
            </p>
            <div style={styles.ctaButtons}>
              <Link to="/rooms" style={styles.ctaPrimaryBtn}>
                <span>Book Now</span>
              </Link>
              <Link to="/contact" style={styles.ctaSecondaryBtn}>
                <span>Plan Your Stay</span>
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
              <span style={styles.footerLogoText}>JS Rooms</span>
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
              Rooms & Suites
            </Link>
            <Link to="/services" style={styles.footerLink}>
              Dining
            </Link>
            <Link to="/services" style={styles.footerLink}>
              Services
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
            © {new Date().getFullYear()} JS Rooms Luxury Lodge. All rights reserved.
          </p>
          <div style={styles.footerLinks}>
            <Link to="/privacy" style={styles.bottomLink}>Privacy</Link>
            <Link to="/terms" style={styles.bottomLink}>Terms</Link>
            <Link to="/cookies" style={styles.bottomLink}>Cookies</Link>
          </div>
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
  
// Then remove ALL marginTop from heroSection:
heroSection: {
  height: '90vh',
  minHeight: '600px',
  backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.8)), url(${heroBackground})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  padding: '0 1.5rem', // No margin or padding-top needed
},

container: {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  backgroundColor: '#FAF9F7',
  color: '#1A1A1A',
  overflowX: 'hidden',
  paddingTop: '80px', // Add padding-top here to push everything down
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
    padding: '5rem 1.5rem',
    backgroundColor: '#FAF9F7',
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
    padding: '5rem 1.5rem',
    backgroundColor: 'white',
  },
  
  roomsGrid: {
    maxWidth: '1200px',
    margin: '0 auto 3rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
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
    padding: '5rem 1.5rem',
    backgroundColor: '#0A0A0A',
    color: 'white',
  },
  
  experienceContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
  },
  
  experienceText: {
    maxWidth: '500px',
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
  },
  
  statItem: {
    textAlign: 'center',
  },
  
  statNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#D4AF37',
    marginBottom: '4px',
  },
  
  statLabel: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },
  
  experienceImage: {
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
  },
  
  experienceImg: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
  },
  
  // Premium Enquiry Section
  enquirySection: {
    padding: '5rem 1.5rem',
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
    padding: '5rem 1.5rem',
    backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.9)), url(${diningArea})`,
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
  
  ctaSecondaryBtn: {
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
  
  // Footer
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