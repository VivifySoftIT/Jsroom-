import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { 
  FaPhone, 
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaCalendarAlt,
  FaArrowRight,
  FaCheckCircle,
  FaUser,
  FaComments,
  FaHeadset,
  FaQuestionCircle
} from 'react-icons/fa';

const ContactScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone',
      details: ['+91 894 738 2799', '+91 894 738 2800'],
      description: 'Available 24/7 for reservations and assistance'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: ['info@jsrooms.com', 'reservations@jsrooms.com'],
      description: 'We respond within 2 hours during business hours'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Address',
      details: ['123 Luxury Lane', 'Mountain View, CA 94040', 'United States'],
      description: 'Located in the heart of the city'
    },
    {
      icon: FaClock,
      title: 'Business Hours',
      details: ['Mon - Sun: 24/7', 'Front Desk: Always Open', 'Concierge: 6 AM - 11 PM'],
      description: 'Our team is here whenever you need us'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: FaQuestionCircle },
    { value: 'reservation', label: 'Reservations', icon: FaCalendarAlt },
    { value: 'support', label: 'Guest Support', icon: FaHeadset },
    { value: 'feedback', label: 'Feedback', icon: FaComments }
  ];

  const departments = [
    {
      name: 'Reservations',
      phone: '+91 894 738 2799',
      email: 'reservations@jsrooms.com',
      hours: '24/7',
      description: 'Book your stay or modify existing reservations'
    },
    {
      name: 'Guest Services',
      phone: '+91 894 738 2800',
      email: 'guestservices@jsrooms.com',
      hours: '6 AM - 11 PM',
      description: 'Assistance during your stay and special requests'
    },
    {
      name: 'Events & Meetings',
      phone: '+91 894 738 2801',
      email: 'events@jsrooms.com',
      hours: '9 AM - 6 PM',
      description: 'Corporate events, weddings, and private functions'
    }
  ];

  return (
    <div style={styles.container}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <span style={styles.heroBadge}>GET IN TOUCH</span>
            <h1 style={styles.heroTitle}>Contact JS Rooms</h1>
            <p style={styles.heroSubtitle}>
              We're here to help make your stay exceptional. Reach out to us for reservations, inquiries, or assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section style={styles.contactInfoSection}>
        <div style={styles.contactInfoContainer}>
          <div style={styles.contactInfoGrid}>
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} style={styles.contactInfoCard}>
                  <div style={styles.contactIconContainer}>
                    <IconComponent style={styles.contactIcon} />
                  </div>
                  <h3 style={styles.contactInfoTitle}>{info.title}</h3>
                  <div style={styles.contactDetails}>
                    {info.details.map((detail, idx) => (
                      <div key={idx} style={styles.contactDetail}>{detail}</div>
                    ))}
                  </div>
                  <p style={styles.contactDescription}>{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section style={styles.mainContactSection}>
        <div style={styles.mainContactContainer}>
          <div style={styles.contactGrid}>
            {/* Contact Form */}
            <div style={styles.contactFormSection}>
              <div style={styles.formHeader}>
                <h2 style={styles.formTitle}>Send us a Message</h2>
                <p style={styles.formSubtitle}>
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              {isSubmitted ? (
                <div style={styles.successMessage}>
                  <FaCheckCircle style={styles.successIcon} />
                  <h3 style={styles.successTitle}>Message Sent Successfully!</h3>
                  <p style={styles.successText}>
                    Thank you for contacting us. We'll respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={styles.contactForm}>
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>
                        <FaUser style={styles.inputIcon} />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
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
                        value={formData.email}
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
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91"
                        style={styles.formInput}
                      />
                    </div>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Inquiry Type</label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        style={styles.formSelect}
                      >
                        {inquiryTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief subject of your inquiry"
                      style={styles.formInput}
                      required
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      <FaComments style={styles.inputIcon} />
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please provide details about your inquiry..."
                      rows="5"
                      style={styles.formTextarea}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" style={styles.submitBtn}>
                    <FaArrowRight style={styles.btnIcon} />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Departments & Quick Contact */}
            <div style={styles.quickContactSection}>
          

              <div style={styles.departmentsList}>
                {departments.map((dept, index) => (
                  <div key={index} style={styles.departmentCard}>
                    <h4 style={styles.departmentName}>{dept.name}</h4>
                    <p style={styles.departmentDescription}>{dept.description}</p>
                    <div style={styles.departmentContact}>
                      <div style={styles.contactMethod}>
                        <FaPhone style={styles.methodIcon} />
                        <span>{dept.phone}</span>
                      </div>
                      <div style={styles.contactMethod}>
                        <FaEnvelope style={styles.methodIcon} />
                        <span>{dept.email}</span>
                      </div>
                      <div style={styles.contactMethod}>
                        <FaClock style={styles.methodIcon} />
                        <span>{dept.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

        
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={styles.mapSection}>
        <div style={styles.mapContainer}>
          <div style={styles.mapContent}>
            <div style={styles.mapInfo}>
              <h3 style={styles.mapTitle}>Visit Us</h3>
              <p style={styles.mapDescription}>
                Located in the heart of the city with easy access to major attractions, 
                shopping districts, and business centers.
              </p>
              <div style={styles.mapAddress}>
                <FaMapMarkerAlt style={styles.mapIcon} />
                <div>
                  <div style={styles.addressLine}>123 Luxury Lane</div>
                  <div style={styles.addressLine}>Mountain View, CA 94040</div>
                  <div style={styles.addressLine}>United States</div>
                </div>
              </div>
              <div style={styles.mapActions}>
                <button style={styles.directionsBtn}>
                  <FaMapMarkerAlt style={styles.btnIcon} />
                  Get Directions
                </button>
              </div>
            </div>
            <div style={styles.mapPlaceholder}>
              <div style={styles.mapPlaceholderContent}>
                <FaMapMarkerAlt style={styles.mapPlaceholderIcon} />
                <p>Interactive Map</p>
                <small>Click to view full map</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Experience JS Rooms?</h2>
          <p style={styles.ctaText}>
            Don't wait - book your luxury stay today and discover what makes us special.
          </p>
          <div style={styles.ctaButtons}>
            <Link to="/rooms" style={styles.ctaBtn}>
              <FaCalendarAlt style={styles.btnIcon} />
              Book Now
            </Link>
            <a href="tel:+918947382799" style={styles.ctaSecondaryBtn}>
              <FaPhone style={styles.btnIcon} />
              Call Us
            </a>
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
    backgroundImage: 'linear-gradient(rgba(26, 26, 26, 0.7), rgba(26, 26, 26, 0.8)), url(https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
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

  // Contact Info Section
  contactInfoSection: {
    padding: '4rem 1.5rem',
    backgroundColor: 'white',
  },

  contactInfoContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  contactInfoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },

  contactInfoCard: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#FAF9F7',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
  },

  contactIconContainer: {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.25rem',
  },

  contactIcon: {
    fontSize: '24px',
    color: 'white',
  },

  contactInfoTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '1rem',
  },

  contactDetails: {
    marginBottom: '1rem',
  },

  contactDetail: {
    fontSize: '14px',
    color: '#1A1A1A',
    fontWeight: '500',
    marginBottom: '0.25rem',
  },

  contactDescription: {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.5',
  },

  // Main Contact Section
  mainContactSection: {
    padding: '4rem 1.5rem',
    backgroundColor: '#FAF9F7',
  },

  mainContactContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  contactGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '4rem',
    alignItems: 'start',
  },

  // Contact Form
  contactFormSection: {
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
  },

  formHeader: {
    marginBottom: '2rem',
  },

  formTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '0.5rem',
  },

  formSubtitle: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
  },

  contactForm: {
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
    color: '#1A1A1A',
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
    outline: 'none',
  },

  formSelect: {
    padding: '14px 16px',
    border: '1px solid #E5E5E5',
    borderRadius: '10px',
    fontSize: '15px',
    backgroundColor: '#FAF9F7',
    cursor: 'pointer',
    outline: 'none',
  },

  formTextarea: {
    padding: '14px 16px',
    border: '1px solid #E5E5E5',
    borderRadius: '10px',
    fontSize: '15px',
    backgroundColor: '#FAF9F7',
    resize: 'vertical',
    minHeight: '120px',
    fontFamily: 'inherit',
    outline: 'none',
  },

  submitBtn: {
    padding: '16px 24px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    marginTop: '1rem',
    fontFamily: 'inherit',
  },

  // Success Message
  successMessage: {
    textAlign: 'center',
    padding: '3rem 2rem',
  },

  successIcon: {
    fontSize: '3rem',
    color: '#D4AF37',
    marginBottom: '1rem',
  },

  successTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '0.5rem',
  },

  successText: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.5',
  },

  // Quick Contact Section
  quickContactSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },

  quickContactHeader: {
    textAlign: 'center',
  },

  quickContactTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '0.5rem',
  },

  quickContactSubtitle: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
  },

  departmentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  departmentCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },

  departmentName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '0.5rem',
  },

  departmentDescription: {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.4',
    marginBottom: '1rem',
  },

  departmentContact: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  contactMethod: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#1A1A1A',
  },

  methodIcon: {
    fontSize: '12px',
    color: '#D4AF37',
    width: '16px',
  },

  // Social Section
  socialSection: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    textAlign: 'center',
  },

  socialTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '1rem',
  },

  socialLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
  },

  socialLink: {
    width: '40px',
    height: '40px',
    backgroundColor: '#D4AF37',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1A1A1A',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  },

  // Map Section
  mapSection: {
    padding: '4rem 1.5rem',
    backgroundColor: '#FAF9F7',
  },

  mapContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  mapContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '3rem',
    alignItems: 'center',
  },

  mapInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  mapTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1A1A1A',
  },

  mapDescription: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6',
  },

  mapAddress: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },

  mapIcon: {
    fontSize: '20px',
    color: '#D4AF37',
    marginTop: '2px',
  },

  addressLine: {
    fontSize: '14px',
    color: '#1A1A1A',
    marginBottom: '0.25rem',
  },

  mapActions: {
    display: 'flex',
    gap: '1rem',
  },

  directionsBtn: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },

  mapPlaceholder: {
    height: '400px',
    backgroundColor: '#E5E5E5',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  mapPlaceholderContent: {
    textAlign: 'center',
    color: '#666',
  },

  mapPlaceholderIcon: {
    fontSize: '3rem',
    color: '#D4AF37',
    marginBottom: '1rem',
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

export default ContactScreen;