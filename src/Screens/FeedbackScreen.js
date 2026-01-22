import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import { 
  FaStar, 
  FaUser,
  FaEnvelope,
  FaPhone,
  FaComments,
  FaCheckCircle,
  FaCalendarAlt
} from 'react-icons/fa';

const FeedbackScreen = () => {
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    phone: '',
    stayDate: '',
    overallRating: 0,
    feedback: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState({});

  const handleInputChange = (field, value) => {
    setFeedbackData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStarClick = (rating) => {
    handleInputChange('overallRating', rating);
  };

  const handleStarHover = (rating) => {
    setHoveredStar({ overall: rating });
  };

  const handleStarLeave = () => {
    setHoveredStar({});
  };

  const renderStars = (currentRating) => {
    const stars = [];
    const displayRating = hoveredStar.overall || currentRating;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          style={{
            ...styles.star,
            color: i <= displayRating ? '#D4AF37' : '#E5E5E5',
            cursor: 'pointer'
          }}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={() => handleStarLeave()}
        />
      );
    }
    return stars;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', feedbackData);
    setIsSubmitted(true);
  };

  // Sample existing reviews
  const existingReviews = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      rating: 5,
      date: '2024-01-20',
      review: 'Excellent service and beautiful rooms. The staff was very helpful and the location is perfect. Highly recommended!',
      stayType: 'Business Trip'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      rating: 4,
      date: '2024-01-18',
      review: 'Great experience overall. The room was clean and comfortable. The only minor issue was the WiFi speed in the evening.',
      stayType: 'Family Vacation'
    },
    {
      id: 3,
      name: 'Michael Johnson',
      rating: 5,
      date: '2024-01-15',
      review: 'Outstanding hospitality! The premium suite was luxurious and the amenities were exceptional. Will definitely return.',
      stayType: 'Leisure'
    },
    {
      id: 4,
      name: 'Anita Patel',
      rating: 4,
      date: '2024-01-12',
      review: 'Very good hotel with excellent amenities. The staff is courteous and the service was excellent.',
      stayType: 'Weekend Getaway'
    }
  ];

  if (isSubmitted) {
    return (
      <div style={styles.container}>
        <Navbar />
        <div style={styles.successContainer}>
          <div style={styles.successContent}>
            <div style={styles.successIcon}>
              <FaCheckCircle />
            </div>
            <h1 style={styles.successTitle}>Thank You for Your Feedback!</h1>
            <p style={styles.successMessage}>
              Your review has been submitted successfully. We appreciate your time and feedback 
              to help us improve our services.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              style={styles.backBtn}
            >
              Submit Another Review
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <span style={styles.heroBadge}>YOUR OPINION MATTERS</span>
            <h1 style={styles.heroTitle}>Share Your Experience</h1>
            <p style={styles.heroSubtitle}>
              Help us improve by sharing your feedback and rating your stay at JS ROOMS.
            </p>
          </div>
        </div>
      </section>

      <div style={styles.mainContainer}>
        <div style={styles.contentGrid}>
          {/* Feedback Form */}
          <div style={styles.feedbackForm}>
            <div style={styles.formCard}>
              <h2 style={styles.formTitle}>Rate Your Stay</h2>
              
              <form onSubmit={handleSubmit}>
                {/* Guest Information */}
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>Guest Information</h3>
                  <div style={styles.formGrid}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>
                        <FaUser style={styles.labelIcon} />
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={feedbackData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        style={styles.input}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>
                        <FaEnvelope style={styles.labelIcon} />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={feedbackData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        style={styles.input}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>
                        <FaPhone style={styles.labelIcon} />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={feedbackData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        style={styles.input}
                        placeholder="+91"
                        required
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>
                        <FaCalendarAlt style={styles.labelIcon} />
                        Stay Date
                      </label>
                      <input
                        type="date"
                        value={feedbackData.stayDate}
                        onChange={(e) => handleInputChange('stayDate', e.target.value)}
                        style={styles.input}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Written Feedback */}
                <div style={styles.section}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <FaComments style={styles.labelIcon} />
                      Tell us about your experience
                    </label>
                    <textarea
                      value={feedbackData.feedback}
                      onChange={(e) => handleInputChange('feedback', e.target.value)}
                      style={styles.textarea}
                      placeholder="Share your experience, what you liked, and any suggestions for improvement..."
                      rows="6"
                      required
                    />
                  </div>
                </div>

                {/* Overall Rating */}
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>Overall Rating</h3>
                  <div style={styles.overallRating}>
                    <div style={styles.starsContainer}>
                      {renderStars(feedbackData.overallRating)}
                    </div>
                    <span style={styles.ratingText}>
                      {feedbackData.overallRating > 0 && `${feedbackData.overallRating} out of 5 stars`}
                    </span>
                  </div>
                </div>

                <button type="submit" style={styles.submitBtn}>
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>

          {/* Recent Reviews */}
          <div style={styles.reviewsSection}>
            <div style={styles.reviewsCard}>
              <h3 style={styles.reviewsTitle}>Recent Guest Reviews</h3>
              <div style={styles.reviewsList}>
                {existingReviews.map(review => (
                  <div key={review.id} style={styles.reviewItem}>
                    <div style={styles.reviewHeader}>
                      <div style={styles.reviewerInfo}>
                        <div style={styles.reviewerAvatar}>
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div style={styles.reviewerName}>{review.name}</div>
                          <div style={styles.reviewDate}>{review.date}</div>
                        </div>
                      </div>
                      <div style={styles.reviewRating}>
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            style={{
                              ...styles.reviewStar,
                              color: i < review.rating ? '#D4AF37' : '#E5E5E5'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div style={styles.reviewStayType}>{review.stayType}</div>
                    <p style={styles.reviewText}>{review.review}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
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
    height: '50vh',
    minHeight: '300px',
    backgroundImage: 'linear-gradient(rgba(26, 26, 26, 0.7), rgba(26, 26, 26, 0.8)), url(https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
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
    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
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

  // Main Container
  mainContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '3rem 1.5rem',
  },

  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '3rem',
    alignItems: 'start',
  },

  // Feedback Form
  feedbackForm: {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },

  formCard: {
    padding: '2rem',
  },

  formTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '2rem',
  },

  section: {
    marginBottom: '2rem',
    paddingBottom: '2rem',
    borderBottom: '1px solid #F0F0F0',
  },

  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '1rem',
  },

  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1rem',
  },

  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },

  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  labelIcon: {
    fontSize: '14px',
    color: '#D4AF37',
  },

  input: {
    padding: '12px 16px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#FAF9F7',
    outline: 'none',
    transition: 'all 0.3s ease',
  },

  textarea: {
    padding: '12px 16px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#FAF9F7',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'all 0.3s ease',
  },

  // Rating Styles
  overallRating: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    padding: '2rem',
    backgroundColor: '#FAF9F7',
    borderRadius: '12px',
  },

  starsContainer: {
    display: 'flex',
    gap: '8px',
  },

  star: {
    fontSize: '24px',
    transition: 'all 0.3s ease',
  },

  ratingText: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '500',
  },

  submitBtn: {
    width: '100%',
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },

  // Reviews Section
  reviewsSection: {
    position: 'sticky',
    top: '100px',
  },

  reviewsCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },

  reviewsTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '1.5rem',
  },

  reviewsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  reviewItem: {
    padding: '1.5rem',
    backgroundColor: '#FAF9F7',
    borderRadius: '12px',
    border: '1px solid #F0F0F0',
  },

  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.5rem',
  },

  reviewerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  reviewerAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#D4AF37',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: '600',
    color: '#1A1A1A',
  },

  reviewerName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A1A1A',
  },

  reviewDate: {
    fontSize: '12px',
    color: '#666',
  },

  reviewRating: {
    display: 'flex',
    gap: '2px',
  },

  reviewStar: {
    fontSize: '12px',
  },

  reviewStayType: {
    fontSize: '12px',
    color: '#D4AF37',
    fontWeight: '500',
    marginBottom: '0.5rem',
  },

  reviewText: {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.5',
    margin: 0,
  },

  // Success Page
  successContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    marginTop: '80px',
  },

  successContent: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '3rem',
    textAlign: 'center',
    maxWidth: '500px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
  },

  successIcon: {
    fontSize: '4rem',
    color: '#D4AF37',
    marginBottom: '1.5rem',
  },

  successTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: '1rem',
  },

  successMessage: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '2rem',
  },

  backBtn: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },
};

export default FeedbackScreen;