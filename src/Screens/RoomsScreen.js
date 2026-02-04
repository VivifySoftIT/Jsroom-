import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import defaultRooms from '../data/defaultRooms';
import room2Image from '../Assets/room2.jpg';
import {
  FaBed,
  FaWifi,
  FaTv,
  FaSnowflake,
  FaCoffee,
  FaShower,
  FaUsers,
  FaCheckCircle,
  FaStar,
  FaCalendarAlt,
  FaArrowRight,
  FaFilter,
  FaSearch,
  FaTimes,
  FaEye,
  FaPhone,
  FaNewspaper,
  FaChair,
  FaTable,
  FaFire,
  FaHotTub,
  FaImage,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaSave,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaTwitter,
  FaFacebookF
} from 'react-icons/fa';

const RoomsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [editingPrice, setEditingPrice] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [error, setError] = useState(null);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Helper function to get category from room number
  const getCategoryFromRoomNumber = (roomNumber) => {
    if (!roomNumber) return 'single';
    if (roomNumber.startsWith('1') || roomNumber.includes('S')) return 'single';
    if (roomNumber.startsWith('2') || roomNumber.includes('D')) return 'double';
    if (roomNumber.startsWith('3') || roomNumber.includes('T')) return 'triple';
    return 'single';
  };

  // Main function to load rooms
  const loadRooms = () => {
    setLoading(true);
    try {
      console.log('📦 Loading default rooms and updating localStorage...');
      
      // Clear any old cached data and use fresh default rooms (3 rooms only)
      localStorage.removeItem('rooms'); // Clear old data
      setRooms(defaultRooms);
      localStorage.setItem('rooms', JSON.stringify(defaultRooms));
      console.log('✅ Loaded 3 default rooms and updated localStorage');
    } catch (err) {
      console.error("Error loading rooms:", err);
      // Fallback to default rooms
      setRooms(defaultRooms);
    } finally {
      setLoading(false);
    }
  };

  // Load rooms on component mount
  useEffect(() => {
    loadRooms();
  }, []);

  // Image carousel navigation
  const nextImage = () => {
    if (selectedRoom && selectedRoom.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedRoom.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedRoom && selectedRoom.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedRoom.images.length - 1 : prevIndex - 1
      );
    }
  };

  // Filter and transform rooms
  const transformedRooms = rooms;

  const categories = [
    { id: 'all', name: 'All Rooms', count: transformedRooms.length },
    {
      id: 'single',
      name: 'Single',
      count: transformedRooms.filter(r => r.category === 'single').length
    },
    {
      id: 'double',
      name: 'Double',
      count: transformedRooms.filter(r => r.category === 'double').length
    },
    {
      id: 'triple',
      name: 'Triple',
      count: transformedRooms.filter(r => r.category === 'triple').length
    }
  ];

  const filteredRooms = transformedRooms.filter(room => {
    if (!room) return false;

    const matchesCategory = selectedCategory === 'all' || room.category === selectedCategory;
    const matchesPrice = priceRange === 'all' ||
      (priceRange === 'budget' && room.price <= 200) ||
      (priceRange === 'mid' && room.price > 200 && room.price <= 350) ||
      (priceRange === 'luxury' && room.price > 350);

    const safeName = room.name || '';
    const safeDescription = room.description || '';
    const safeSearchTerm = searchTerm || '';

    const matchesSearch =
      safeName.toLowerCase().includes(safeSearchTerm.toLowerCase()) ||
      safeDescription.toLowerCase().includes(safeSearchTerm.toLowerCase());

    return matchesCategory && matchesPrice && matchesSearch;
  });

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setCurrentImageIndex(0);
  };

  // Price editing function
  const handlePriceEdit = (e, roomId, currentPrice) => {
    if (e) e.stopPropagation();
    setEditingPrice(roomId);
    setNewPrice(currentPrice.toString());
  };

  const handlePriceSave = (e, roomId) => {
    if (e) e.stopPropagation();
    const price = parseFloat(newPrice);
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price');
      return;
    }

    try {
      console.log(`🔄 Updating room (ID: ${roomId}) price to ₹${price}...`);

      // Update rooms in state
      const updatedRooms = rooms.map(room =>
        room.id === roomId ? { ...room, price: price } : room
      );
      setRooms(updatedRooms);

      // Save to localStorage
      localStorage.setItem('rooms', JSON.stringify(updatedRooms));

      alert(`✅ Updated price to ₹${price}`);

      setEditingPrice(null);
      setNewPrice('');
    } catch (error) {
      console.error('❌ Error updating room price:', error);
      alert('Failed to update price');
    }
  };

  const handlePriceCancel = (e) => {
    if (e) e.stopPropagation();
    setEditingPrice(null);
    setNewPrice('');
  };



  // Loading state
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading rooms...</p>
      </div>
    );
  }

  // Empty state
  if (transformedRooms.length === 0) {
    return (
      <div style={styles.container}>
        <Navbar />
        <div style={styles.emptyState}>
          <h1 style={styles.emptyStateTitle}>No Rooms Available</h1>
          <p style={styles.emptyStateText}>Rooms will be available soon. Please check back later.</p>
          <button
            onClick={loadRooms}
            style={styles.retryBtn}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Navbar />

      {isAdmin && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#FFF3CD',
          color: '#856404',
          textAlign: 'center',
          marginTop: '80px',
          borderBottom: '1px solid #FFEEBA'
        }}>
          <span>🔧 <strong>Admin Mode</strong></span>
        </div>
      )}

      {/* Hero Section */}
      <section style={isAdmin ? { ...styles.heroSection, marginTop: '0' } : styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <span style={styles.heroBadge}>LUXURY ACCOMMODATIONS</span>
            <h1 style={styles.heroTitle}>Our Premium Rooms & Suites</h1>
            <p style={styles.heroSubtitle}>
              Discover comfort and elegance in every detail. From cozy standard rooms to lavish presidential suites.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section style={styles.filtersSection}>
        <div style={styles.filtersContainer}>
          {/* Search Bar */}
          <div style={styles.searchRow}>
            <div style={styles.searchContainer}>
              <FaSearch style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
          </div>

          {/* Category and Price Filters Row */}
          <div style={styles.filtersRow}>
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

            {/* Price Filter */}
            <div style={styles.priceFilter}>
              <FaFilter style={styles.filterIcon} />
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                style={styles.priceSelect}
              >
                <option value="all">All Prices</option>
                <option value="budget">Budget (≤₹200)</option>
                <option value="mid">Mid-range (₹200-350)</option>
                <option value="luxury">Luxury (₹350+)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section style={styles.roomsSection}>
        <div style={styles.roomsContainer}>
          <div style={styles.roomsGrid}>
            {filteredRooms.map(room => (
              <div key={room.id} style={styles.roomCard}>
                <div
                  style={styles.roomImageContainer}
                  onClick={() => handleRoomSelect(room)}
                >
                  {/* Image Carousel in Room Card */}
                  {room.images && room.images.length > 0 ? (
                    <div style={styles.carouselContainer}>
                      <img
                        src={room.images[0].url}
                        alt={room.images[0].alt || room.name}
                        style={styles.roomImage}
                      />
                      {room.images.length > 1 && (
                        <div style={styles.imageCountBadge}>
                          <FaImage style={styles.imageCountIcon} />
                          +{room.images.length - 1}
                        </div>
                      )}
                    </div>
                  ) : (
                    <img
                      src={room.image}
                      alt={room.name}
                      style={styles.roomImage}
                    />
                  )}

                  <div style={styles.roomOverlay}>
                    <div style={styles.priceContainer}>
                      {editingPrice === room.id ? (
                        <div
                          style={styles.priceEditContainer}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="number"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            style={styles.priceInput}
                            placeholder="Enter price"
                            min="0"
                            step="1"
                          />
                          <button
                            onClick={(e) => handlePriceSave(e, room.id)}
                            style={styles.priceSaveBtn}
                          >
                            <FaSave />
                          </button>
                          <button
                            onClick={(e) => handlePriceCancel(e)}
                            style={styles.priceCancelBtn}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div style={styles.priceDisplayContainer}>
                          <span style={styles.currentPrice}>₹{room.price}</span>
                          {isAdmin && (
                            <button
                              onClick={(e) => handlePriceEdit(e, room.id, room.price)}
                              style={styles.priceEditBtn}
                              title="Edit price"
                            >
                              <FaEdit />
                            </button>
                          )}
                        </div>
                      )}

                      <span style={styles.perNight}>Per Night</span>
                    </div>
                  </div>
                </div>

                <div style={styles.roomContent}>
                  <div style={styles.roomHeader}>
                    <h3 style={styles.roomName}>{room.name}</h3>
                    <div style={styles.roomRating}>
                      <FaStar style={styles.ratingIcon} />
                      <span style={styles.ratingValue}>{room.rating}</span>
                      <span style={styles.reviewCount}>({room.reviews})</span>
                    </div>
                  </div>

                  <p style={styles.roomDescription}>{room.description}</p>

                  <div style={styles.roomSpecs}>
                    <div style={styles.specItem}>
                      <FaBed style={styles.specIcon} />
                      <span>{room.beds}</span>
                    </div>
                    <div style={styles.specItem}>
                      <FaUsers style={styles.specIcon} />
                      <span>Max {room.guests} guests</span>
                    </div>
                    <div style={styles.specItem}>
                      <span style={styles.roomSize}>{room.size}</span>
                    </div>
                  </div>

                  <div style={styles.roomActions}>
                    <button
                      onClick={() => handleRoomSelect(room)}
                      style={styles.viewDetailsBtn}
                    >
                      <FaEye style={styles.btnIcon} />
                      View Details
                    </button>
                    <Link to={`/booking?room=${room.id}`} style={styles.bookBtn}>
                      <FaCalendarAlt style={styles.btnIcon} />
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRooms.length === 0 && (
            <div style={styles.noResults}>
              <h3>No rooms found</h3>
              <p>Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Need Help Choosing?</h2>
          <p style={styles.ctaText}>
            Our concierge team is here to help you find the perfect room for your stay.
          </p>
          <Link to="/contact" style={styles.ctaBtn}>
            Contact Our Team
            <FaArrowRight style={styles.btnIcon} />
          </Link>
        </div>
      </section>


      {/* Room Details Modal with Image Carousel */}
      {
        selectedRoom && (
          <div className="rooms-modal-overlay" style={styles.modalOverlay} onClick={() => setSelectedRoom(null)}>
            <div className="rooms-modal-content" style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button
                style={styles.closeBtn}
                onClick={() => setSelectedRoom(null)}
              >
                <FaTimes />
              </button>

              <div className="rooms-modal-header" style={styles.modalHeader}>
                <div style={styles.modalImageContainer}>
                  {/* Image Carousel in Modal */}
                  {selectedRoom.images && selectedRoom.images.length > 0 ? (
                    <div style={styles.modalCarousel}>
                      <img
                        src={selectedRoom.images[currentImageIndex].url}
                        alt={selectedRoom.images[currentImageIndex].alt || selectedRoom.name}
                        style={styles.modalImage}
                      />

                      {/* Navigation arrows */}
                      {selectedRoom.images.length > 1 && (
                        <>
                          <button
                            style={styles.carouselArrowLeft}
                            onClick={(e) => {
                              e.stopPropagation();
                              prevImage();
                            }}
                          >
                            <FaChevronLeft />
                          </button>
                          <button
                            style={styles.carouselArrowRight}
                            onClick={(e) => {
                              e.stopPropagation();
                              nextImage();
                            }}
                          >
                            <FaChevronRight />
                          </button>

                          {/* Image dots indicator */}
                          <div style={styles.imageDots}>
                            {selectedRoom.images.map((_, index) => (
                              <button
                                key={index}
                                style={{
                                  ...styles.imageDot,
                                  backgroundColor: index === currentImageIndex ? '#D4AF37' : 'rgba(255,255,255,0.5)'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentImageIndex(index);
                                }}
                              />
                            ))}
                          </div>

                          {/* Image counter */}
                          <div style={styles.imageCounter}>
                            {currentImageIndex + 1} / {selectedRoom.images.length}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <img
                      src={selectedRoom.image}
                      alt={selectedRoom.name}
                      style={styles.modalImage}
                    />
                  )}

                </div>

                <div style={styles.modalInfo}>
                  <h2 style={styles.modalTitle}>{selectedRoom.name}</h2>
                  <div style={styles.modalRating}>
                    <FaStar style={styles.ratingIcon} />
                    <span style={styles.ratingValue}>{selectedRoom.rating}</span>
                    <span style={styles.reviewCount}>({selectedRoom.reviews} reviews)</span>
                  </div>
                  <p style={styles.modalDescription}>{selectedRoom.description}</p>

                  <div style={styles.modalSpecs}>
                    <div style={styles.specItem}>
                      <FaBed style={styles.specIcon} />
                      <span>{selectedRoom.beds}</span>
                    </div>
                    <div style={styles.specItem}>
                      <FaUsers style={styles.specIcon} />
                      <span>Max {selectedRoom.guests} guests</span>
                    </div>
                    <div style={styles.specItem}>
                      <span style={styles.roomSize}>{selectedRoom.size}</span>
                    </div>
                    {selectedRoom.acType && (
                      <div style={styles.specItem}>
                        <FaSnowflake style={styles.specIcon} />
                        <span>{selectedRoom.acType}</span>
                      </div>
                    )}
                  </div>

                  <div style={styles.modalPricing}>
                    <div style={styles.priceContainer}>
                      <span style={styles.modalCurrentPrice}>₹{selectedRoom.price}</span>

                      <span style={styles.modalPerNight}>Per Night</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rooms-modal-body" style={styles.modalBody}>
                <div style={styles.amenitiesSection}>
                  <h3 style={styles.sectionTitle}>Room Amenities</h3>
                  <div style={styles.amenitiesGrid}>
                    {selectedRoom.amenities && selectedRoom.amenities.map((amenity, index) => (
                      <div key={index} style={styles.amenityItem}>
                        <FaCheckCircle style={styles.checkIcon} />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.amenitiesSection}>
                  <h3 style={styles.sectionTitle}>Room Features</h3>
                  <div style={styles.amenitiesGrid}>
                    <div style={styles.amenityItem}>
                      <FaCheckCircle style={styles.checkIcon} />
                      <span>Daily Housekeeping</span>
                    </div>
                    <div style={styles.amenityItem}>
                      <FaCheckCircle style={styles.checkIcon} />
                      <span>24/7 Room Service</span>
                    </div>
                    <div style={styles.amenityItem}>
                      <FaCheckCircle style={styles.checkIcon} />
                      <span>Charging Points</span>
                    </div>
                    <div style={styles.amenityItem}>
                      <FaCheckCircle style={styles.checkIcon} />
                      <span>Study Table & Chair</span>
                    </div>
                    <div style={styles.amenityItem}>
                      <FaCheckCircle style={styles.checkIcon} />
                      <span>Wardrobe</span>
                    </div>
                    <div style={styles.amenityItem}>
                      <FaCheckCircle style={styles.checkIcon} />
                      <span>{selectedRoom.view || 'City View'}</span>
                    </div>
                  </div>
                </div>

                <div style={styles.amenitiesSection}>
                  <h3 style={styles.sectionTitle}>Bathroom Facilities</h3>
                  <div style={styles.amenitiesGrid}>
                    <div style={styles.amenityItem}>
                      <FaCheckCircle style={styles.checkIcon} />
                      <span>Clean Towels</span>
                    </div>
                    <div style={styles.amenityItem}>
                      <FaCheckCircle style={styles.checkIcon} />
                      <span>Toiletries</span>
                    </div>
                    <div style={styles.amenityItem}>
                      <FaCheckCircle style={styles.checkIcon} />
                      <span>Hot & Cold Water</span>
                    </div>
                    <div style={styles.amenityItem}>
                      <FaCheckCircle style={styles.checkIcon} />
                      <span>Hair Dryer</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rooms-modal-footer" style={styles.modalFooter}>
                <Link
                  to={`/booking?room=${selectedRoom.id}`}
                  style={styles.modalBookBtn}
                  onClick={() => setSelectedRoom(null)}
                >
                  <FaCalendarAlt style={styles.btnIcon} />
                  Book Now - ₹{selectedRoom.price} Per Night
                </Link>
              </div>
            </div>
          </div>
        )
      }

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
            <Link to="/contact" style={styles.footerLink}>
              Contact
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
    </div >
  );

};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#FAF9F7',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    overflowX: 'hidden',
  },

  // Loading and Empty States
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#FAF9F7',
  },

  spinner: {
    width: '50px',
    height: '50px',
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #D4AF37',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    padding: '2rem',
    textAlign: 'center',
  },
  errorTitle: {
    color: '#EF4444',
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  errorText: {
    color: '#666',
    marginBottom: '2rem',
    maxWidth: '500px',
  },
  retryBtn: {
    padding: '10px 20px',
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  fallbackText: {
    color: '#888',
    fontSize: '0.9rem',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 80px)',
    textAlign: 'center',
    padding: '20px',
  },

  emptyStateTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '1rem',
  },

  emptyStateText: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '2rem',
  },

  // Hero Section
  heroSection: {
    height: '60vh',
    minHeight: '400px',
    backgroundImage: `linear-gradient(rgba(26, 26, 26, 0.7), rgba(26, 26, 26, 0.8)), url(${room2Image})`,
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
    fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
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
    flexDirection: 'column',
    gap: '1.5rem',
  },

  searchRow: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },

  filtersRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },

  searchContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
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
    fontFamily: 'inherit',
  },

  categoryBtnActive: {
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    borderColor: '#D4AF37',
  },

  priceFilter: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  filterIcon: {
    color: '#D4AF37',
    fontSize: '16px',
  },

  priceSelect: {
    padding: '8px 12px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    backgroundColor: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none',
  },

  // Rooms Section
  roomsSection: {
    padding: '3rem 1.5rem',
  },

  // Add Room Form Styles
  addRoomForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  formLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
  },
  formInput: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },

  roomsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  roomsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },

  roomCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    position: 'relative',
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  roomImageContainer: {
    height: '250px',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    flexShrink: 0,
    cursor: 'pointer',
  },

  carouselContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  roomImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },

  imageCountBadge: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '5px 10px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    borderRadius: '15px',
    fontSize: '12px',
    zIndex: 2,
  },

  imageCountIcon: {
    fontSize: '10px',
  },

  roomOverlay: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
    padding: '2rem 1.5rem 1.5rem',
  },

  priceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    flexWrap: 'wrap',
  },

  priceDisplayContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  priceEditContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: '4px 8px',
    borderRadius: '6px',
  },

  priceInput: {
    width: '80px',
    padding: '4px 6px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A1A1A',
    backgroundColor: 'white',
    outline: 'none',
  },

  priceEditBtn: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 6px',
    cursor: 'pointer',
    color: '#D4AF37',
    fontSize: '12px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  priceSaveBtn: {
    backgroundColor: '#10B981',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 6px',
    cursor: 'pointer',
    color: 'white',
    fontSize: '12px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  priceCancelBtn: {
    backgroundColor: '#EF4444',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 6px',
    cursor: 'pointer',
    color: 'white',
    fontSize: '12px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  currentPrice: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
  },

  originalPrice: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.6)',
    textDecoration: 'line-through',
  },

  perNight: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.8)',
  },

  roomContent: {
    padding: '1.2rem',
  },

  roomHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.75rem',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },

  roomName: {
    fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: 0,
    flex: 1,
    minWidth: '0',
  },

  roomRating: {
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

  roomDescription: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
    marginBottom: '1rem',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },

  roomSpecs: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  specItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#666',
  },

  specIcon: {
    color: '#D4AF37',
    fontSize: '14px',
  },

  roomSize: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    color: '#D4AF37',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
  },

  roomActions: {
    display: 'flex',
    gap: '0.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid #F0F0F0',
  },

  viewDetailsBtn: {
    flex: 1,
    padding: '10px 12px',
    backgroundColor: 'transparent',
    color: '#D4AF37',
    border: '1px solid #D4AF37',
    borderRadius: '8px',
    fontWeight: '500',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    minHeight: '44px',
    textDecoration: 'none',
  },

  bookBtn: {
    flex: 1,
    padding: '10px 12px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    transition: 'all 0.3s ease',
    minHeight: '44px',
    border: 'none',
    cursor: 'pointer',
  },

  btnIcon: {
    fontSize: '12px',
  },

  noResults: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666',
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
    fontSize: '16px',
    transition: 'all 0.3s ease',
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
    borderRadius: '12px',
    maxWidth: '900px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 768px)': {
      width: '100%',
      maxHeight: '95vh',
    }
  },

  closeBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    color: 'white',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    transition: 'all 0.3s ease',
  },

  modalHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '1.5rem',
    alignItems: 'start',
  },

  modalImageContainer: {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    height: '350px',
    width: '100%',
  },

  modalCarousel: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  modalImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  carouselArrowLeft: {
    position: 'absolute',
    top: '50%',
    left: '10px',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 2,
    transition: 'all 0.3s ease',
  },

  carouselArrowRight: {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 2,
    transition: 'all 0.3s ease',
  },

  imageDots: {
    position: 'absolute',
    bottom: '15px',
    left: '0',
    right: '0',
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    zIndex: 2,
  },

  imageDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.3s ease',
  },

  imageCounter: {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '15px',
    fontSize: '12px',
    zIndex: 2,
  },

  modalPopularBadge: {
    position: 'absolute',
    top: '0.75rem',
    left: '0.75rem',
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    zIndex: 2,
  },

  modalInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },

  modalTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#1A1A1A',
    margin: 0,
  },

  modalRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },

  modalDescription: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
  },

  modalSpecs: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },

  modalPricing: {
    padding: '0.75rem',
    backgroundColor: '#FAF9F7',
    borderRadius: '8px',
    border: '1px solid #D4AF37',
  },

  modalCurrentPrice: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#1A1A1A',
  },

  modalOriginalPrice: {
    fontSize: '0.9rem',
    color: '#999',
    textDecoration: 'line-through',
  },

  modalPerNight: {
    fontSize: '0.8rem',
    color: '#666',
  },

  modalBody: {
    flex: 1,
    padding: '0 1.5rem',
    overflowY: 'auto',
    maxHeight: 'calc(90vh - 350px)',
    scrollbarWidth: 'thin',
    scrollbarColor: '#D4AF37 #F0F0F0',
    '@media (max-width: 768px)': {
      maxHeight: 'calc(95vh - 200px)',
      padding: '0 1rem',
    }
  },

  amenitiesSection: {
    marginBottom: '1.5rem',
  },

  sectionTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '0.75rem',
    paddingBottom: '0.25rem',
    borderBottom: '1px solid #D4AF37',
  },

  amenitiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '0.5rem',
  },

  amenityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#666',
    padding: '6px 8px',
    backgroundColor: '#FAF9F7',
    borderRadius: '6px',
  },

  checkIcon: {
    color: '#D4AF37',
    fontSize: '12px',
  },

  modalFooter: {
    padding: '1rem 1.5rem',
    borderTop: '1px solid #F0F0F0',
    backgroundColor: '#FAF9F7',
  },

  modalBookBtn: {
    width: '100%',
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    transition: 'all 0.3s ease',
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
};

// Add CSS animation for spinner
const spinStyle = document.createElement('style');
spinStyle.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinStyle);

export default RoomsScreen;