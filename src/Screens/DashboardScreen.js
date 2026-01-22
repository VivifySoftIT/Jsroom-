import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { 
  FaCalendarAlt, 
  FaUser,
  FaUsers,
  FaBed,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaEdit,
  FaEye,
  FaDownload,
  FaStar,
  FaHeart,
  FaGift,
  FaCreditCard,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaArrowRight,
  FaPlus
} from 'react-icons/fa';

const DashboardScreen = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: '123 Main Street, Mumbai, India',
    memberSince: '2023',
    loyaltyPoints: 2450,
    totalStays: 8,
    favoriteRoom: 'Double AC Room'
  });

  const [bookings, setBookings] = useState([
    {
      id: 'JSR-ABC123',
      roomName: 'Triple AC Room',
      roomImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
      checkIn: '2024-02-15',
      checkOut: '2024-02-18',
      guests: 2,
      nights: 3,
      totalAmount: 1797,
      status: 'confirmed',
      bookingDate: '2024-01-20'
    },
    {
      id: 'JSR-DEF456',
      roomName: 'Double AC Room',
      roomImage: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
      checkIn: '2024-01-10',
      checkOut: '2024-01-12',
      guests: 2,
      nights: 2,
      totalAmount: 598,
      status: 'completed',
      bookingDate: '2023-12-15'
    },
    {
      id: 'JSR-GHI789',
      roomName: 'Single AC Room',
      roomImage: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
      checkIn: '2023-12-20',
      checkOut: '2023-12-23',
      guests: 1,
      nights: 3,
      totalAmount: 597,
      status: 'completed',
      bookingDate: '2023-11-25'
    }
  ]);

  const [preferences, setPreferences] = useState({
    roomType: 'suite',
    bedType: 'king',
    floorPreference: 'high',
    smokingPreference: 'non-smoking',
    specialRequests: 'Late check-out when possible',
    dietaryRestrictions: 'Vegetarian',
    notifications: {
      email: true,
      sms: true,
      promotions: true
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#D4AF37';
      case 'completed': return '#28a745';
      case 'cancelled': return '#dc3545';
      case 'pending': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  const tabs = [
    { id: 'bookings', name: 'My Bookings', icon: FaCalendarAlt },
    { id: 'profile', name: 'Profile', icon: FaUser },
    { id: 'preferences', name: 'Preferences', icon: FaCog },
    { id: 'loyalty', name: 'Loyalty Program', icon: FaGift }
  ];

  const loyaltyBenefits = [
    { icon: FaGift, title: 'Welcome Amenities', description: 'Complimentary room upgrades and welcome gifts' },
    { icon: FaClock, title: 'Priority Check-in', description: 'Skip the lines with priority check-in service' },
    { icon: FaBed, title: 'Late Check-out', description: 'Enjoy late check-out until 2 PM at no extra charge' },
    { icon: FaStar, title: 'Exclusive Offers', description: 'Access to member-only rates and special promotions' }
  ];

  return (
    <div style={styles.container}>
      <Navbar />
      
      {/* Dashboard Header */}
      <section style={styles.headerSection}>
        <div style={styles.headerContainer}>
          <div style={styles.welcomeContent}>
            <h1 style={styles.welcomeTitle}>Welcome back, {user.name.split(' ')[0]}!</h1>
            <p style={styles.welcomeSubtitle}>
              Manage your bookings, preferences, and loyalty rewards all in one place.
            </p>
          </div>
          <div style={styles.quickStats}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{user.totalStays}</div>
              <div style={styles.statLabel}>Total Stays</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{user.loyaltyPoints}</div>
              <div style={styles.statLabel}>Loyalty Points</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{bookings.filter(b => b.status === 'confirmed').length}</div>
              <div style={styles.statLabel}>Upcoming</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section style={styles.dashboardSection}>
        <div style={styles.dashboardContainer}>
          <div style={styles.dashboardGrid}>
            {/* Sidebar Navigation */}
            <div style={styles.sidebar}>
              <div style={styles.sidebarContent}>
                <div style={styles.userProfile}>
                  <div style={styles.userAvatar}>
                    <FaUser style={styles.avatarIcon} />
                  </div>
                  <div style={styles.userInfo}>
                    <h3 style={styles.userName}>{user.name}</h3>
                    <p style={styles.userEmail}>{user.email}</p>
                    <span style={styles.memberBadge}>Gold Member</span>
                  </div>
                </div>

                <nav style={styles.sidebarNav}>
                  {tabs.map(tab => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                          ...styles.navItem,
                          ...(activeTab === tab.id ? styles.navItemActive : {})
                        }}
                      >
                        <IconComponent style={styles.navIcon} />
                        <span>{tab.name}</span>
                      </button>
                    );
                  })}
                </nav>

                <div style={styles.sidebarActions}>
                  <Link to="/rooms" style={styles.newBookingBtn}>
                    <FaPlus style={styles.btnIcon} />
                    New Booking
                  </Link>
                  <button style={styles.logoutBtn}>
                    <FaSignOutAlt style={styles.btnIcon} />
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div style={styles.mainContent}>
              {/* My Bookings Tab */}
              {activeTab === 'bookings' && (
                <div style={styles.tabContent}>
                  <div style={styles.tabHeader}>
                    <h2 style={styles.tabTitle}>My Bookings</h2>
                    <Link to="/rooms" style={styles.newBookingBtnSmall}>
                      <FaPlus style={styles.btnIcon} />
                      New Booking
                    </Link>
                  </div>

                  <div style={styles.bookingsGrid}>
                    {bookings.map(booking => (
                      <div key={booking.id} style={styles.bookingCard}>
                        <div style={styles.bookingHeader}>
                          <div style={styles.bookingId}>#{booking.id}</div>
                          <div 
                            style={{
                              ...styles.bookingStatus,
                              backgroundColor: getStatusColor(booking.status),
                            }}
                          >
                            {getStatusText(booking.status)}
                          </div>
                        </div>

                        <div style={styles.bookingContent}>
                          <div style={styles.bookingImageContainer}>
                            <img src={booking.roomImage} alt={booking.roomName} style={styles.bookingImage} />
                          </div>
                          
                          <div style={styles.bookingDetails}>
                            <h3 style={styles.bookingRoomName}>{booking.roomName}</h3>
                            
                            <div style={styles.bookingInfo}>
                              <div style={styles.infoItem}>
                                <FaCalendarAlt style={styles.infoIcon} />
                                <span>{booking.checkIn} - {booking.checkOut}</span>
                              </div>
                              <div style={styles.infoItem}>
                                <FaUsers style={styles.infoIcon} />
                                <span>{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</span>
                              </div>
                              <div style={styles.infoItem}>
                                <FaClock style={styles.infoIcon} />
                                <span>{booking.nights} Night{booking.nights > 1 ? 's' : ''}</span>
                              </div>
                            </div>

                            <div style={styles.bookingPrice}>
                              <span style={styles.totalAmount}>₹{booking.totalAmount}</span>
                              <span style={styles.priceLabel}>Total</span>
                            </div>
                          </div>
                        </div>

                        <div style={styles.bookingActions}>
                          <button style={styles.actionBtn}>
                            <FaEye style={styles.actionIcon} />
                            View Details
                          </button>
                          <button style={styles.actionBtn}>
                            <FaDownload style={styles.actionIcon} />
                            Download
                          </button>
                          {booking.status === 'confirmed' && (
                            <button style={styles.actionBtnPrimary}>
                              <FaEdit style={styles.actionIcon} />
                              Modify
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div style={styles.tabContent}>
                  <div style={styles.tabHeader}>
                    <h2 style={styles.tabTitle}>Profile Information</h2>
                    <button style={styles.editBtn}>
                      <FaEdit style={styles.btnIcon} />
                      Edit Profile
                    </button>
                  </div>

                  <div style={styles.profileGrid}>
                    <div style={styles.profileCard}>
                      <h3 style={styles.cardTitle}>Personal Information</h3>
                      <div style={styles.profileFields}>
                        <div style={styles.profileField}>
                          <label style={styles.fieldLabel}>Full Name</label>
                          <div style={styles.fieldValue}>{user.name}</div>
                        </div>
                        <div style={styles.profileField}>
                          <label style={styles.fieldLabel}>Email Address</label>
                          <div style={styles.fieldValue}>{user.email}</div>
                        </div>
                        <div style={styles.profileField}>
                          <label style={styles.fieldLabel}>Phone Number</label>
                          <div style={styles.fieldValue}>{user.phone}</div>
                        </div>
                        <div style={styles.profileField}>
                          <label style={styles.fieldLabel}>Address</label>
                          <div style={styles.fieldValue}>{user.address}</div>
                        </div>
                      </div>
                    </div>

                    <div style={styles.profileCard}>
                      <h3 style={styles.cardTitle}>Account Details</h3>
                      <div style={styles.profileFields}>
                        <div style={styles.profileField}>
                          <label style={styles.fieldLabel}>Member Since</label>
                          <div style={styles.fieldValue}>{user.memberSince}</div>
                        </div>
                        <div style={styles.profileField}>
                          <label style={styles.fieldLabel}>Membership Level</label>
                          <div style={styles.fieldValue}>
                            <span style={styles.membershipBadge}>Gold Member</span>
                          </div>
                        </div>
                        <div style={styles.profileField}>
                          <label style={styles.fieldLabel}>Favorite Room Type</label>
                          <div style={styles.fieldValue}>{user.favoriteRoom}</div>
                        </div>
                        <div style={styles.profileField}>
                          <label style={styles.fieldLabel}>Total Bookings</label>
                          <div style={styles.fieldValue}>{user.totalStays} stays</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div style={styles.tabContent}>
                  <div style={styles.tabHeader}>
                    <h2 style={styles.tabTitle}>Preferences & Settings</h2>
                    <button style={styles.saveBtn}>
                      <FaCheckCircle style={styles.btnIcon} />
                      Save Changes
                    </button>
                  </div>

                  <div style={styles.preferencesGrid}>
                    <div style={styles.preferenceCard}>
                      <h3 style={styles.cardTitle}>Room Preferences</h3>
                      <div style={styles.preferenceFields}>
                        <div style={styles.preferenceField}>
                          <label style={styles.fieldLabel}>Preferred Room Type</label>
                          <select style={styles.selectInput} value={preferences.roomType}>
                            <option value="single">Single Room</option>
                            <option value="double">Double Room</option>
                            <option value="triple">Triple Room</option>
                          </select>
                        </div>
                        <div style={styles.preferenceField}>
                          <label style={styles.fieldLabel}>Bed Type</label>
                          <select style={styles.selectInput} value={preferences.bedType}>
                            <option value="single">Single Bed</option>
                            <option value="queen">Queen Bed</option>
                            <option value="king">King Bed</option>
                            <option value="twin">Twin Beds</option>
                          </select>
                        </div>
                        <div style={styles.preferenceField}>
                          <label style={styles.fieldLabel}>Floor Preference</label>
                          <select style={styles.selectInput} value={preferences.floorPreference}>
                            <option value="low">Low Floor (1-5)</option>
                            <option value="mid">Mid Floor (6-10)</option>
                            <option value="high">High Floor (11+)</option>
                          </select>
                        </div>
                        <div style={styles.preferenceField}>
                          <label style={styles.fieldLabel}>Smoking Preference</label>
                          <select style={styles.selectInput} value={preferences.smokingPreference}>
                            <option value="non-smoking">Non-Smoking</option>
                            <option value="smoking">Smoking</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div style={styles.preferenceCard}>
                      <h3 style={styles.cardTitle}>Special Requests</h3>
                      <div style={styles.preferenceFields}>
                        <div style={styles.preferenceField}>
                          <label style={styles.fieldLabel}>Default Special Requests</label>
                          <textarea 
                            style={styles.textareaInput}
                            value={preferences.specialRequests}
                            placeholder="Enter any special requests..."
                            rows="3"
                          />
                        </div>
                        <div style={styles.preferenceField}>
                          <label style={styles.fieldLabel}>Dietary Restrictions</label>
                          <input 
                            type="text"
                            style={styles.textInput}
                            value={preferences.dietaryRestrictions}
                            placeholder="e.g., Vegetarian, Vegan, Gluten-free"
                          />
                        </div>
                      </div>
                    </div>

                    <div style={styles.preferenceCard}>
                      <h3 style={styles.cardTitle}>Notification Settings</h3>
                      <div style={styles.notificationSettings}>
                        <div style={styles.notificationItem}>
                          <div style={styles.notificationInfo}>
                            <h4 style={styles.notificationTitle}>Email Notifications</h4>
                            <p style={styles.notificationDesc}>Booking confirmations and updates</p>
                          </div>
                          <label style={styles.toggleSwitch}>
                            <input 
                              type="checkbox" 
                              checked={preferences.notifications.email}
                              style={styles.toggleInput}
                            />
                            <span style={styles.toggleSlider}></span>
                          </label>
                        </div>
                        <div style={styles.notificationItem}>
                          <div style={styles.notificationInfo}>
                            <h4 style={styles.notificationTitle}>SMS Notifications</h4>
                            <p style={styles.notificationDesc}>Check-in reminders and alerts</p>
                          </div>
                          <label style={styles.toggleSwitch}>
                            <input 
                              type="checkbox" 
                              checked={preferences.notifications.sms}
                              style={styles.toggleInput}
                            />
                            <span style={styles.toggleSlider}></span>
                          </label>
                        </div>
                        <div style={styles.notificationItem}>
                          <div style={styles.notificationInfo}>
                            <h4 style={styles.notificationTitle}>Promotional Offers</h4>
                            <p style={styles.notificationDesc}>Special deals and exclusive offers</p>
                          </div>
                          <label style={styles.toggleSwitch}>
                            <input 
                              type="checkbox" 
                              checked={preferences.notifications.promotions}
                              style={styles.toggleInput}
                            />
                            <span style={styles.toggleSlider}></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Loyalty Program Tab */}
              {activeTab === 'loyalty' && (
                <div style={styles.tabContent}>
                  <div style={styles.tabHeader}>
                    <h2 style={styles.tabTitle}>Loyalty Program</h2>
                    <div style={styles.loyaltyLevel}>
                      <FaStar style={styles.loyaltyIcon} />
                      Gold Member
                    </div>
                  </div>

                  <div style={styles.loyaltyOverview}>
                    <div style={styles.loyaltyCard}>
                      <div style={styles.loyaltyHeader}>
                        <h3 style={styles.loyaltyTitle}>Your Points Balance</h3>
                        <div style={styles.pointsBalance}>{user.loyaltyPoints}</div>
                      </div>
                      <div style={styles.loyaltyProgress}>
                        <div style={styles.progressBar}>
                          <div style={styles.progressFill}></div>
                        </div>
                        <div style={styles.progressText}>
                          <span>Gold Member</span>
                          <span>750 points to Platinum</span>
                        </div>
                      </div>
                    </div>

                    <div style={styles.loyaltyStats}>
                      <div style={styles.loyaltyStat}>
                        <div style={styles.statIcon}>
                          <FaCalendarAlt />
                        </div>
                        <div style={styles.statInfo}>
                          <div style={styles.statNumber}>{user.totalStays}</div>
                          <div style={styles.statLabel}>Total Stays</div>
                        </div>
                      </div>
                      <div style={styles.loyaltyStat}>
                        <div style={styles.statIcon}>
                          <FaHeart />
                        </div>
                        <div style={styles.statInfo}>
                          <div style={styles.statNumber}>4.9</div>
                          <div style={styles.statLabel}>Avg Rating</div>
                        </div>
                      </div>
                      <div style={styles.loyaltyStat}>
                        <div style={styles.statIcon}>
                          <FaGift />
                        </div>
                        <div style={styles.statInfo}>
                          <div style={styles.statNumber}>12</div>
                          <div style={styles.statLabel}>Rewards Used</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={styles.loyaltyBenefits}>
                    <h3 style={styles.benefitsTitle}>Your Gold Member Benefits</h3>
                    <div style={styles.benefitsGrid}>
                      {loyaltyBenefits.map((benefit, index) => {
                        const IconComponent = benefit.icon;
                        return (
                          <div key={index} style={styles.benefitCard}>
                            <div style={styles.benefitIcon}>
                              <IconComponent />
                            </div>
                            <h4 style={styles.benefitTitle}>{benefit.title}</h4>
                            <p style={styles.benefitDescription}>{benefit.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div style={styles.rewardsSection}>
                    <h3 style={styles.rewardsTitle}>Redeem Your Points</h3>
                    <div style={styles.rewardsGrid}>
                      <div style={styles.rewardCard}>
                        <h4 style={styles.rewardTitle}>Room Upgrade</h4>
                        <p style={styles.rewardDescription}>Upgrade to the next room category</p>
                        <div style={styles.rewardPoints}>500 points</div>
                        <button style={styles.redeemBtn}>Redeem</button>
                      </div>
                      <div style={styles.rewardCard}>
                        <h4 style={styles.rewardTitle}>Late Checkout</h4>
                        <p style={styles.rewardDescription}>Extended checkout until 2 PM</p>
                        <div style={styles.rewardPoints}>800 points</div>
                        <button style={styles.redeemBtn}>Redeem</button>
                      </div>
                      <div style={styles.rewardCard}>
                        <h4 style={styles.rewardTitle}>Free Night Stay</h4>
                        <p style={styles.rewardDescription}>One complimentary night stay</p>
                        <div style={styles.rewardPoints}>1000 points</div>
                        <button style={styles.redeemBtn}>Redeem</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
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

  // Header Section
  headerSection: {
    padding: '2rem 1.5rem',
    backgroundColor: '#1A1A1A',
    marginTop: '80px',
  },

  headerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '2rem',
  },

  welcomeContent: {
    color: 'white',
  },

  welcomeTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },

  welcomeSubtitle: {
    fontSize: '1rem',
    opacity: 0.8,
    lineHeight: '1.5',
  },

  quickStats: {
    display: 'flex',
    gap: '2rem',
  },

  statCard: {
    textAlign: 'center',
    color: 'white',
  },

  statNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#D4AF37',
    marginBottom: '0.25rem',
  },

  statLabel: {
    fontSize: '0.9rem',
    opacity: 0.8,
  },

  // Dashboard Section
  dashboardSection: {
    padding: '2rem 1.5rem',
  },

  dashboardContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '2rem',
    alignItems: 'start',
  },

  // Sidebar
  sidebar: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: '100px',
  },

  sidebarContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },

  userProfile: {
    textAlign: 'center',
    paddingBottom: '2rem',
    borderBottom: '1px solid #F0F0F0',
  },

  userAvatar: {
    width: '80px',
    height: '80px',
    backgroundColor: '#D4AF37',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
  },

  avatarIcon: {
    fontSize: '2rem',
    color: '#1A1A1A',
  },

  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  userName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: 0,
  },

  userEmail: {
    fontSize: '0.9rem',
    color: '#666',
    margin: 0,
  },

  memberBadge: {
    display: 'inline-block',
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '600',
  },

  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '10px',
    color: '#666',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left',
    fontFamily: 'inherit',
  },

  navItemActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    color: '#D4AF37',
  },

  navIcon: {
    fontSize: '16px',
  },

  sidebarActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    paddingTop: '2rem',
    borderTop: '1px solid #F0F0F0',
  },

  newBookingBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 16px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    textDecoration: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },

  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: 'transparent',
    color: '#dc3545',
    border: '1px solid #dc3545',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },

  btnIcon: {
    fontSize: '14px',
  },

  // Main Content
  mainContent: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    minHeight: '600px',
  },

  tabContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },

  tabHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '1rem',
    borderBottom: '1px solid #F0F0F0',
  },

  tabTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: 0,
  },

  newBookingBtnSmall: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },

  editBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'transparent',
    color: '#D4AF37',
    border: '1px solid #D4AF37',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },

  saveBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },

  // Bookings
  bookingsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  bookingCard: {
    border: '1px solid #E5E5E5',
    borderRadius: '12px',
    padding: '1.5rem',
    transition: 'all 0.3s ease',
  },

  bookingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },

  bookingId: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#666',
  },

  bookingStatus: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'white',
  },

  bookingContent: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
  },

  bookingImageContainer: {
    flexShrink: 0,
  },

  bookingImage: {
    width: '120px',
    height: '90px',
    objectFit: 'cover',
    borderRadius: '8px',
  },

  bookingDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },

  bookingRoomName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: 0,
  },

  bookingInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#666',
  },

  infoIcon: {
    fontSize: '14px',
    color: '#D4AF37',
    width: '16px',
  },

  bookingPrice: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    marginTop: 'auto',
  },

  totalAmount: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#1A1A1A',
  },

  priceLabel: {
    fontSize: '0.9rem',
    color: '#666',
  },

  bookingActions: {
    display: 'flex',
    gap: '0.75rem',
    paddingTop: '1rem',
    borderTop: '1px solid #F0F0F0',
  },

  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    backgroundColor: 'transparent',
    color: '#666',
    border: '1px solid #E5E5E5',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },

  actionBtnPrimary: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },

  actionIcon: {
    fontSize: '12px',
  },

  // Profile
  profileGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
  },

  profileCard: {
    border: '1px solid #E5E5E5',
    borderRadius: '12px',
    padding: '2rem',
  },

  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '1.5rem',
  },

  profileFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  profileField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  fieldLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#666',
  },

  fieldValue: {
    fontSize: '15px',
    color: '#1A1A1A',
    fontWeight: '500',
  },

  membershipBadge: {
    display: 'inline-block',
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
  },

  // Preferences
  preferencesGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },

  preferenceCard: {
    border: '1px solid #E5E5E5',
    borderRadius: '12px',
    padding: '2rem',
  },

  preferenceFields: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
  },

  preferenceField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  selectInput: {
    padding: '10px 12px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#FAF9F7',
    outline: 'none',
    cursor: 'pointer',
  },

  textInput: {
    padding: '10px 12px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#FAF9F7',
    outline: 'none',
  },

  textareaInput: {
    padding: '10px 12px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#FAF9F7',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
  },

  notificationSettings: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  notificationItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#FAF9F7',
    borderRadius: '8px',
  },

  notificationInfo: {
    flex: 1,
  },

  notificationTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: '0 0 0.25rem 0',
  },

  notificationDesc: {
    fontSize: '13px',
    color: '#666',
    margin: 0,
  },

  toggleSwitch: {
    position: 'relative',
    display: 'inline-block',
    width: '50px',
    height: '24px',
  },

  toggleInput: {
    opacity: 0,
    width: 0,
    height: 0,
  },

  toggleSlider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ccc',
    borderRadius: '24px',
    transition: '0.4s',
  },

  // Loyalty Program
  loyaltyLevel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
  },

  loyaltyIcon: {
    fontSize: '16px',
  },

  loyaltyOverview: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    marginBottom: '3rem',
  },

  loyaltyCard: {
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    padding: '2rem',
    borderRadius: '16px',
  },

  loyaltyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },

  loyaltyTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: 0,
  },

  pointsBalance: {
    fontSize: '2.5rem',
    fontWeight: '700',
  },

  loyaltyProgress: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(26, 26, 26, 0.2)',
    borderRadius: '4px',
    overflow: 'hidden',
  },

  progressFill: {
    width: '75%',
    height: '100%',
    backgroundColor: '#1A1A1A',
    borderRadius: '4px',
  },

  progressText: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    fontWeight: '500',
  },

  loyaltyStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  loyaltyStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#FAF9F7',
    borderRadius: '12px',
  },

  statIcon: {
    width: '40px',
    height: '40px',
    backgroundColor: '#D4AF37',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1A1A1A',
    fontSize: '16px',
  },

  statInfo: {
    display: 'flex',
    flexDirection: 'column',
  },

  loyaltyBenefits: {
    marginBottom: '3rem',
  },

  benefitsTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '1.5rem',
  },

  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.5rem',
  },

  benefitCard: {
    padding: '1.5rem',
    border: '1px solid #E5E5E5',
    borderRadius: '12px',
    textAlign: 'center',
  },

  benefitIcon: {
    width: '50px',
    height: '50px',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
    color: '#D4AF37',
    fontSize: '20px',
  },

  benefitTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '0.5rem',
  },

  benefitDescription: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
  },

  rewardsSection: {
    borderTop: '1px solid #E5E5E5',
    paddingTop: '2rem',
  },

  rewardsTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '1.5rem',
  },

  rewardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
  },

  rewardCard: {
    padding: '1.5rem',
    border: '1px solid #E5E5E5',
    borderRadius: '12px',
    textAlign: 'center',
  },

  rewardTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '0.5rem',
  },

  rewardDescription: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '1rem',
    lineHeight: '1.4',
  },

  rewardPoints: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#D4AF37',
    marginBottom: '1rem',
  },

  redeemBtn: {
    padding: '8px 16px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },
};

export default DashboardScreen;