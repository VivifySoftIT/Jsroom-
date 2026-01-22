import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
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
  FaHotTub
} from 'react-icons/fa';

// Room images from Unsplash
const roomImages = {
  single: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
  double: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
  triple: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80'
};

const RoomsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);

  const rooms = [
    {
      id: 1,
      name: 'Single AC Room',
      category: 'single',
      price: 299,
      originalPrice: 349,
      image: roomImages.single,
      size: '25 m²',
      guests: 1,
      beds: '1 Single Bed',
      rating: 4.7,
      reviews: 89,
      features: ['City View', 'Study Table', 'Modern Bathroom', 'Air Conditioning'],
      amenities: ['Free WiFi', 'Smart TV', 'Mini Fridge', 'Room Service', 'AC', 'Coffee Machine'],
      description: 'Comfortable single bedroom with modern amenities and city views, perfect for solo travelers.',
      popular: true,
      acType: 'ac',
      detailedAmenities: {
        popularWithGuests: ['Heater', 'Daily Housekeeping', 'Free Wi-Fi', 'Laundry Service', 'Bathroom', 'Air Conditioning', '24-hour Room Service'],
        roomFeatures: ['Charging Points', 'Chair', 'Study Table'],
        mediaEntertainment: ['TV'],
        bathroom: ['Towels', 'Toiletries', 'Geyser/Water Heater', 'Hot & Cold Water'],
        otherFacilities: ['Newspaper']
      }
    },
    {
      id: 2,
      name: 'Single Non-AC Room',
      category: 'single',
      price: 199,
      originalPrice: 249,
      image: roomImages.single,
      size: '25 m²',
      guests: 1,
      beds: '1 Single Bed',
      rating: 4.5,
      reviews: 124,
      features: ['Garden View', 'Study Table', 'Natural Ventilation', 'Ceiling Fan'],
      amenities: ['Free WiFi', 'TV', 'Mini Fridge', 'Room Service', 'Fan'],
      description: 'Comfortable single bedroom with natural ventilation and garden views, ideal for budget-conscious travelers.',
      popular: false,
      acType: 'non-ac',
      detailedAmenities: {
        popularWithGuests: ['Heater', 'Daily Housekeeping', 'Free Wi-Fi', 'Laundry Service', 'Bathroom', 'Ceiling Fan'],
        roomFeatures: ['Charging Points', 'Chair', 'Study Table'],
        mediaEntertainment: ['TV'],
        bathroom: ['Towels', 'Toiletries', 'Geyser/Water Heater', 'Hot & Cold Water'],
        otherFacilities: ['Newspaper']
      }
    },
    {
      id: 3,
      name: 'Double AC Room',
      category: 'double',
      price: 499,
      originalPrice: 549,
      image: roomImages.double,
      size: '35 m²',
      guests: 2,
      beds: '1 Double Bed',
      rating: 4.8,
      reviews: 156,
      features: ['City View', 'Seating Area', 'Modern Bathroom', 'Air Conditioning'],
      amenities: ['Free WiFi', 'Smart TV', 'Mini Fridge', 'Room Service', 'AC', 'Coffee Machine'],
      description: 'Spacious double bedroom perfect for couples with elegant furnishings and city views.',
      popular: true,
      acType: 'ac',
      detailedAmenities: {
        popularWithGuests: ['Heater', 'Daily Housekeeping', 'Free Wi-Fi', 'Laundry Service', 'Bathroom', 'Air Conditioning', '24-hour Room Service'],
        roomFeatures: ['Charging Points', 'Chair', 'Centre Table', 'Wardrobe'],
        mediaEntertainment: ['TV'],
        bathroom: ['Towels', 'Toiletries', 'Geyser/Water Heater', 'Hot & Cold Water'],
        otherFacilities: ['Newspaper']
      }
    },
    {
      id: 4,
      name: 'Double Non-AC Room',
      category: 'double',
      price: 399,
      originalPrice: 449,
      image: roomImages.double,
      size: '35 m²',
      guests: 2,
      beds: '1 Double Bed',
      rating: 4.6,
      reviews: 203,
      features: ['Garden View', 'Seating Area', 'Natural Ventilation', 'Ceiling Fan'],
      amenities: ['Free WiFi', 'TV', 'Mini Fridge', 'Room Service', 'Fan'],
      description: 'Comfortable double bedroom with natural ventilation and garden views, perfect for couples.',
      popular: false,
      acType: 'non-ac',
      detailedAmenities: {
        popularWithGuests: ['Heater', 'Daily Housekeeping', 'Free Wi-Fi', 'Laundry Service', 'Bathroom', 'Ceiling Fan'],
        roomFeatures: ['Charging Points', 'Chair', 'Centre Table', 'Garden View'],
        mediaEntertainment: ['TV'],
        bathroom: ['Towels', 'Toiletries', 'Geyser/Water Heater', 'Hot & Cold Water'],
        otherFacilities: ['Newspaper']
      }
    },
    {
      id: 5,
      name: 'Triple AC Room',
      category: 'triple',
      price: 699,
      originalPrice: 749,
      image: roomImages.triple,
      size: '45 m²',
      guests: 3,
      beds: '3 Single Beds',
      rating: 4.6,
      reviews: 94,
      features: ['City View', 'Large Space', 'Modern Bathroom', 'Air Conditioning'],
      amenities: ['Free WiFi', 'Smart TV', 'Mini Fridge', 'Room Service', 'AC', 'Coffee Machine'],
      description: 'Large triple bedroom ideal for families or groups with three comfortable beds and ample space.',
      popular: true,
      acType: 'ac',
      detailedAmenities: {
        popularWithGuests: ['Heater', 'Daily Housekeeping', 'Free Wi-Fi', 'Laundry Service', 'Bathroom', 'Air Conditioning', '24-hour Room Service'],
        roomFeatures: ['Charging Points', 'Chairs', 'Centre Table', 'Large Wardrobe'],
        mediaEntertainment: ['TV'],
        bathroom: ['Towels', 'Toiletries', 'Geyser/Water Heater', 'Hot & Cold Water'],
        otherFacilities: ['Newspaper']
      }
    },
    {
      id: 6,
      name: 'Triple Non-AC Room',
      category: 'triple',
      price: 599,
      originalPrice: 649,
      image: roomImages.triple,
      size: '45 m²',
      guests: 3,
      beds: '3 Single Beds',
      rating: 4.4,
      reviews: 167,
      features: ['Garden View', 'Large Space', 'Natural Ventilation', 'Ceiling Fans'],
      amenities: ['Free WiFi', 'TV', 'Mini Fridge', 'Room Service', 'Fans'],
      description: 'Spacious triple bedroom with natural ventilation, perfect for families or groups on a budget.',
      popular: false,
      acType: 'non-ac',
      detailedAmenities: {
        popularWithGuests: ['Heater', 'Daily Housekeeping', 'Free Wi-Fi', 'Laundry Service', 'Bathroom', 'Ceiling Fans'],
        roomFeatures: ['Charging Points', 'Chairs', 'Centre Table', 'Large Wardrobe'],
        mediaEntertainment: ['TV'],
        bathroom: ['Towels', 'Toiletries', 'Geyser/Water Heater', 'Hot & Cold Water'],
        otherFacilities: ['Newspaper']
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Rooms', count: rooms.length },
    { id: 'single', name: 'Single', count: rooms.filter(r => r.category === 'single').length },
    { id: 'double', name: 'Double', count: rooms.filter(r => r.category === 'double').length },
    { id: 'triple', name: 'Triple', count: rooms.filter(r => r.category === 'triple').length }
  ];

  const filteredRooms = rooms.filter(room => {
    const matchesCategory = selectedCategory === 'all' || room.category === selectedCategory;
    const matchesPrice = priceRange === 'all' || 
      (priceRange === 'budget' && room.price <= 200) ||
      (priceRange === 'mid' && room.price > 200 && room.price <= 350) ||
      (priceRange === 'luxury' && room.price > 350);
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesPrice && matchesSearch;
  });

  return (
    <div style={styles.container}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={styles.heroSection}>
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
          {/* Search Bar - Full Width Row */}
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
                {room.popular && (
                  <div style={styles.popularBadge}>
                    <FaStar style={styles.starIcon} />
                    Popular
                  </div>
                )}
                
                <div style={styles.roomImageContainer}>
                  <img src={room.image} alt={room.name} style={styles.roomImage} />
                  <div style={styles.roomOverlay}>
                    <div style={styles.priceContainer}>
                      <span style={styles.currentPrice}>₹{room.price}</span>
                      {room.originalPrice > room.price && (
                        <span style={styles.originalPrice}>₹{room.originalPrice}</span>
                      )}
                      <span style={styles.perNight}>/night</span>
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
                      onClick={() => setSelectedRoom(room)}
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

      {/* Room Details Modal */}
      {selectedRoom && (
        <div style={styles.modalOverlay} onClick={() => setSelectedRoom(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.closeBtn}
              onClick={() => setSelectedRoom(null)}
            >
              <FaTimes />
            </button>
            
            <div style={styles.modalHeader}>
              <div style={styles.modalImageContainer}>
                <img 
                  src={selectedRoom.image} 
                  alt={selectedRoom.name} 
                  style={styles.modalImage}
                />
                {selectedRoom.popular && (
                  <div style={styles.modalPopularBadge}>
                    <FaStar style={styles.starIcon} />
                    Popular
                  </div>
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
                </div>

                <div style={styles.modalPricing}>
                  <div style={styles.priceContainer}>
                    <span style={styles.modalCurrentPrice}>₹{selectedRoom.price}</span>
                    {selectedRoom.originalPrice > selectedRoom.price && (
                      <span style={styles.modalOriginalPrice}>₹{selectedRoom.originalPrice}</span>
                    )}
                    <span style={styles.modalPerNight}>/night</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.amenitiesSection}>
                <h3 style={styles.sectionTitle}>Popular with Guests</h3>
                <div style={styles.amenitiesGrid}>
                  {selectedRoom.detailedAmenities.popularWithGuests.map((amenity, index) => (
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
                  {selectedRoom.detailedAmenities.roomFeatures.map((feature, index) => (
                    <div key={index} style={styles.amenityItem}>
                      <FaCheckCircle style={styles.checkIcon} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.amenitiesSection}>
                <h3 style={styles.sectionTitle}>Media and Entertainment</h3>
                <div style={styles.amenitiesGrid}>
                  {selectedRoom.detailedAmenities.mediaEntertainment.map((media, index) => (
                    <div key={index} style={styles.amenityItem}>
                      <FaCheckCircle style={styles.checkIcon} />
                      <span>{media}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.amenitiesSection}>
                <h3 style={styles.sectionTitle}>Bathroom</h3>
                <div style={styles.amenitiesGrid}>
                  {selectedRoom.detailedAmenities.bathroom.map((bathroom, index) => (
                    <div key={index} style={styles.amenityItem}>
                      <FaCheckCircle style={styles.checkIcon} />
                      <span>{bathroom}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.amenitiesSection}>
                <h3 style={styles.sectionTitle}>Other Facilities</h3>
                <div style={styles.amenitiesGrid}>
                  {selectedRoom.detailedAmenities.otherFacilities.map((facility, index) => (
                    <div key={index} style={styles.amenityItem}>
                      <FaCheckCircle style={styles.checkIcon} />
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <Link 
                to={`/booking?room=${selectedRoom.id}`} 
                style={styles.modalBookBtn}
                onClick={() => setSelectedRoom(null)}
              >
                <FaCalendarAlt style={styles.btnIcon} />
                Book Now - ₹{selectedRoom.price}/night
              </Link>
            </div>
          </div>
        </div>
      )}
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
    backgroundImage: 'linear-gradient(rgba(26, 26, 26, 0.7), rgba(26, 26, 26, 0.8)), url(https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
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
    width: '400px',
    maxWidth: '100%',
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

  roomsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  roomsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
  },

  roomCard: {
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

  roomImageContainer: {
    height: '250px',
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
    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
    padding: '2rem 1.5rem 1.5rem',
  },

  priceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
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
    padding: '1.5rem',
  },

  roomHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.75rem',
  },

  roomName: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: 0,
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
  },

  roomSpecs: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
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

  roomFeatures: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
  },

  featureTag: {
    backgroundColor: '#F0F0F0',
    color: '#666',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
  },

  moreFeatures: {
    color: '#D4AF37',
    fontSize: '12px',
    fontWeight: '500',
  },

  roomAmenities: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },

  amenityItem: {
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

  roomActions: {
    display: 'flex',
    gap: '0.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid #F0F0F0',
  },

  viewDetailsBtn: {
    flex: 1,
    padding: '8px 12px',
    backgroundColor: 'transparent',
    color: '#D4AF37',
    border: '1px solid #D4AF37',
    borderRadius: '8px',
    fontWeight: '500',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },

  bookBtn: {
    flex: 1,
    padding: '8px 12px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    transition: 'all 0.3s ease',
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
    padding: '2rem',
  },

  modalContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '85vh',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
    display: 'flex',
    flexDirection: 'column',
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
  },

  modalHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    padding: '1.5rem',
    alignItems: 'start',
  },

  modalImageContainer: {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
  },

  modalImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
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
    maxHeight: 'calc(85vh - 300px)',
    scrollbarWidth: 'thin',
    scrollbarColor: '#D4AF37 #F0F0F0',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
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
  },
};

export default RoomsScreen;