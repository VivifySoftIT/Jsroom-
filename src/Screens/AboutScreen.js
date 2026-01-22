import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { 
  FaStar, 
  FaUsers,
  FaHeart,
  FaLeaf,
  FaShieldAlt,
  FaCalendarAlt,
  FaArrowRight,
  FaQuoteLeft
} from 'react-icons/fa';

// Company images from Unsplash
const aboutImages = {
  hero: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  story: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
  sustainability: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80'
};

const AboutScreen = () => {
  const stats = [
    { number: '2018', label: 'Established', icon: FaCalendarAlt },
    { number: '500+', label: 'Happy Guests', icon: FaUsers },
    { number: '4.9', label: 'Average Rating', icon: FaStar },
    { number: '50+', label: 'Luxury Rooms', icon: FaHeart }
  ];

  const values = [
    {
      icon: FaHeart,
      title: 'Exceptional Service',
      description: 'We believe in creating memorable experiences through personalized, attentive service that exceeds expectations.'
    },
    {
      icon: FaLeaf,
      title: 'Sustainability',
      description: 'Committed to environmental responsibility and sustainable practices in all aspects of our operations.'
    },
    {
      icon: FaShieldAlt,
      title: 'Quality & Safety',
      description: 'Maintaining the highest standards of quality, cleanliness, and safety for our guests and team members.'
    },
    {
      icon: FaUsers,
      title: 'Community',
      description: 'Building lasting relationships with our guests, team, and local community through genuine care and respect.'
    }
  ];

  const testimonials = [
    {
      text: "JS ROOMS exceeded all our expectations. The attention to detail, exceptional service, and beautiful accommodations made our anniversary celebration truly unforgettable.",
      author: "Sarah & Michael Johnson",
      location: "New York, USA",
      rating: 5
    },
    {
      text: "From the moment we arrived, we felt like royalty. The staff went above and beyond to ensure our comfort, and the room amenities were absolutely divine.",
      author: "Anita Desai",
      location: "Mumbai, India",
      rating: 5
    },
    {
      text: "The perfect blend of luxury and sustainability. Beautiful property, incredible amenities, and a team that genuinely cares about creating magical experiences.",
      author: "David Chen",
      location: "Singapore",
      rating: 5
    }
  ];

  return (
    <div style={styles.container}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <span style={styles.heroBadge}>OUR STORY</span>
            <h1 style={styles.heroTitle}>Where Luxury Meets Authenticity</h1>
            <p style={styles.heroSubtitle}>
              Discover the story behind JS ROOMS - a journey of passion, excellence, and unwavering commitment to creating extraordinary experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <div style={styles.statsGrid}>
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} style={styles.statCard}>
                  <div style={styles.statIconContainer}>
                    <IconComponent style={styles.statIcon} />
                  </div>
                  <div style={styles.statNumber}>{stat.number}</div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section style={styles.storySection}>
        <div style={styles.storyContainer}>
          <div style={styles.storyContent}>
            <div style={styles.storyText}>
              <span style={styles.sectionBadge}>FOUNDED IN 2018</span>
              <h2 style={styles.sectionTitle}>Our Journey</h2>
              <p style={styles.storyDescription}>
                JS ROOMS was born from a vision to create a hospitality experience that seamlessly blends luxury with authenticity. 
                Founded by hospitality veterans with a passion for excellence, we set out to redefine what it means to provide 
                exceptional service in the modern era.
              </p>
              <p style={styles.storyDescription}>
                From our humble beginnings as a boutique property, we have grown into a premier destination while maintaining 
                our core values of personalized service, attention to detail, and genuine care for every guest who walks through our doors.
              </p>
              <p style={styles.storyDescription}>
                Today, JS ROOMS stands as a testament to our commitment to excellence, sustainability, and creating memories 
                that last a lifetime. Every corner of our property tells a story, and every team member is dedicated to 
                making your story with us truly special.
              </p>
            </div>
            <div style={styles.storyImage}>
              <img src={aboutImages.story} alt="Our Story" style={styles.storyImg} />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={styles.valuesSection}>
        <div style={styles.valuesContainer}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionBadge}>OUR VALUES</span>
            <h2 style={styles.sectionTitle}>What Drives Us</h2>
            <p style={styles.sectionSubtitle}>
              Our core values guide every decision we make and every interaction we have with our guests.
            </p>
          </div>
          
          <div style={styles.valuesGrid}>
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} style={styles.valueCard}>
                  <div style={styles.valueIconContainer}>
                    <IconComponent style={styles.valueIcon} />
                  </div>
                  <h3 style={styles.valueTitle}>{value.title}</h3>
                  <p style={styles.valueDescription}>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={styles.testimonialsSection}>
        <div style={styles.testimonialsContainer}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionBadge}>GUEST STORIES</span>
            <h2 style={styles.sectionTitle}>What Our Guests Say</h2>
          </div>
          
          <div style={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} style={styles.testimonialCard}>
                <div style={styles.quoteIcon}>
                  <FaQuoteLeft />
                </div>
                <div style={styles.testimonialRating}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} style={styles.starIcon} />
                  ))}
                </div>
                <p style={styles.testimonialText}>{testimonial.text}</p>
                <div style={styles.testimonialAuthor}>
                  <div style={styles.authorName}>{testimonial.author}</div>
                  <div style={styles.authorLocation}>{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Experience the JS ROOMS Difference</h2>
          <p style={styles.ctaText}>
            Join our family of satisfied guests and discover what makes JS ROOMS truly special.
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

  // Hero Section
  heroSection: {
    height: '70vh',
    minHeight: '500px',
    backgroundImage: `linear-gradient(rgba(26, 26, 26, 0.7), rgba(26, 26, 26, 0.8)), url(${aboutImages.hero})`,
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
    maxWidth: '700px',
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
    color: 'rgba(255,255,255,0.8)',
    maxWidth: '600px',
    margin: '0 auto',
  },

  // Stats Section
  statsSection: {
    padding: '4rem 1.5rem',
    backgroundColor: '#1A1A1A',
  },

  statsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
  },

  statCard: {
    textAlign: 'center',
    color: 'white',
  },

  statIconContainer: {
    width: '60px',
    height: '60px',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
    border: '2px solid rgba(212, 175, 55, 0.3)',
  },

  statIcon: {
    fontSize: '24px',
    color: '#D4AF37',
  },

  statNumber: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#D4AF37',
    marginBottom: '0.5rem',
  },

  statLabel: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },

  // Story Section
  storySection: {
    padding: '5rem 1.5rem',
    backgroundColor: 'white',
  },

  storyContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  storyContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
  },

  storyText: {
    maxWidth: '500px',
  },

  sectionBadge: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#D4AF37',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '1rem',
  },

  sectionTitle: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: '1.2',
    marginBottom: '1.5rem',
  },

  storyDescription: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.7',
    marginBottom: '1.5rem',
  },

  storyImage: {
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  },

  storyImg: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
  },

  // Values Section
  valuesSection: {
    padding: '5rem 1.5rem',
    backgroundColor: '#FAF9F7',
  },

  valuesContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  sectionHeader: {
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto 3.5rem',
  },

  sectionSubtitle: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6',
    marginTop: '1rem',
  },

  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },

  valueCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '16px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
  },

  valueIconContainer: {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.25rem',
  },

  valueIcon: {
    fontSize: '24px',
    color: 'white',
  },

  valueTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '0.75rem',
  },

  valueDescription: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
  },

  // Team Section
  teamSection: {
    padding: '5rem 1.5rem',
    backgroundColor: 'white',
  },

  teamContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },

  teamCard: {
    backgroundColor: '#FAF9F7',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },

  teamImageContainer: {
    position: 'relative',
    height: '300px',
    overflow: 'hidden',
  },

  teamImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },

  teamOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(26, 26, 26, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'all 0.3s ease',
  },

  socialLinks: {
    display: 'flex',
    gap: '1rem',
  },

  socialLink: {
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(212, 175, 55, 0.9)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1A1A1A',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  },

  teamInfo: {
    padding: '1.5rem',
    textAlign: 'center',
  },

  teamName: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '0.5rem',
  },

  teamPosition: {
    fontSize: '14px',
    color: '#D4AF37',
    fontWeight: '500',
    marginBottom: '1rem',
  },

  teamBio: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
  },

  // Awards Section
  awardsSection: {
    padding: '5rem 1.5rem',
    backgroundColor: '#1A1A1A',
  },

  awardsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  awardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },

  awardCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: '2rem',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'all 0.3s ease',
  },

  awardIconContainer: {
    width: '60px',
    height: '60px',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  awardIcon: {
    fontSize: '24px',
    color: '#D4AF37',
  },

  awardContent: {
    color: 'white',
  },

  awardYear: {
    fontSize: '12px',
    color: '#D4AF37',
    fontWeight: '600',
    marginBottom: '0.25rem',
  },

  awardTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
  },

  awardOrg: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.7)',
  },

  // Testimonials Section
  testimonialsSection: {
    padding: '5rem 1.5rem',
    backgroundColor: '#FAF9F7',
  },

  testimonialsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
  },

  testimonialCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    position: 'relative',
  },

  quoteIcon: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    fontSize: '24px',
    color: 'rgba(212, 175, 55, 0.3)',
  },

  testimonialRating: {
    display: 'flex',
    gap: '4px',
    marginBottom: '1rem',
  },

  starIcon: {
    fontSize: '16px',
    color: '#D4AF37',
  },

  testimonialText: {
    fontSize: '15px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    fontStyle: 'italic',
  },

  testimonialAuthor: {
    borderTop: '1px solid #F0F0F0',
    paddingTop: '1rem',
  },

  authorName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '0.25rem',
  },

  authorLocation: {
    fontSize: '13px',
    color: '#999',
  },

  // Sustainability Section
  sustainabilitySection: {
    padding: '5rem 1.5rem',
    backgroundColor: 'white',
  },

  sustainabilityContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  sustainabilityContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
  },

  sustainabilityText: {
    maxWidth: '500px',
  },

  sustainabilityDescription: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.7',
    marginBottom: '2rem',
  },

  sustainabilityFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  sustainabilityFeature: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
  },

  featureIcon: {
    fontSize: '20px',
    color: '#D4AF37',
    marginTop: '4px',
    flexShrink: 0,
  },

  featureTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '0.25rem',
  },

  featureText: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
  },

  sustainabilityImage: {
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  },

  sustainabilityImg: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
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

  btnIcon: {
    fontSize: '14px',
  },
};

export default AboutScreen;