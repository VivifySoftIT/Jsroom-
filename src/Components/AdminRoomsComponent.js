import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import config from '../config/apiConfig';
import { 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaEdit, 
  FaTrash,
  FaPlus,
  FaBed,
  FaUsers,
  FaStar,
  FaCheckCircle,
  FaTimes,
  FaImage,
  FaSave,
  FaUpload
} from 'react-icons/fa';

const AdminRoomsComponent = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // view, edit, add
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [apiStatus, setApiStatus] = useState('loading'); // 'loading', 'success', 'fallback'

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        setApiStatus('loading');
        console.log('AdminRoomsComponent: Starting to fetch categories...');
        const categoriesResponse = await apiService.getCategories();
        console.log('AdminRoomsComponent: Received categories response:', categoriesResponse);
        
        // Extract data and source from response
        const categoriesData = categoriesResponse.data || categoriesResponse;
        const dataSource = categoriesResponse.source || 'unknown';
        
        setCategories(categoriesData);
        
        // Set API status based on data source
        setApiStatus(dataSource === 'api' ? 'success' : 'fallback');
        
        if (config.ENABLE_LOGGING) {
          console.log(`AdminRoomsComponent: Using ${dataSource} data:`, categoriesData);
        }
        
      } catch (error) {
        console.error('AdminRoomsComponent: Failed to fetch categories:', error);
        setApiStatus('fallback');
        // Set fallback categories from config
        setCategories(config.FALLBACK_CATEGORIES);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Mock comprehensive room data
  useEffect(() => {
    const mockRooms = [
      {
        id: 1,
        roomNumber: '101',
        category: 'single',
        description: 'Comfortable single bedroom with modern amenities and city views.',
        price: 299,
        originalPrice: 349,
        size: '25 m²',
        maxGuests: 1,
        bedConfiguration: '1 Single Bed',
        floor: 1,
        view: 'city',
        status: 'available',
        acType: 'ac',
        popular: true,
        rating: {
          average: 4.7,
          count: 89
        },
        images: [
          {
            url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
            alt: 'Room 101 - Single AC Room',
            isPrimary: true
          },
          {
            url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
            alt: 'Room 101 - Bedroom View',
            isPrimary: false
          }
        ],
        amenities: [
          { name: 'Free WiFi', icon: 'FaWifi', category: 'technology' },
          { name: 'Smart TV', icon: 'FaTv', category: 'entertainment' },
          { name: 'Mini Fridge', icon: 'FaCoffee', category: 'comfort' },
          { name: 'Room Service', icon: 'FaCheckCircle', category: 'basic' },
          { name: 'AC', icon: 'FaSnowflake', category: 'comfort' },
          { name: 'Coffee Machine', icon: 'FaCoffee', category: 'comfort' }
        ],
        detailedAmenities: {
          popularWithGuests: ['Heater', 'Daily Housekeeping', 'Free Wi-Fi', 'Laundry Service', 'Bathroom', 'Air Conditioning', '24-hour Room Service'],
          roomFeatures: ['Charging Points', 'Chair', 'Study Table'],
          mediaEntertainment: ['TV'],
          bathroom: ['Towels', 'Toiletries', 'Geyser/Water Heater', 'Hot & Cold Water'],
          otherFacilities: ['Newspaper']
        },
        lastCleaned: '2024-01-22',
        lastMaintenance: '2024-01-15',
        createdAt: '2023-06-15',
        updatedAt: '2024-01-20'
      },
      {
        id: 2,
        roomNumber: '205',
        category: 'double',
        description: 'Spacious double bedroom perfect for couples with elegant furnishings.',
        price: 499,
        originalPrice: 549,
        size: '35 m²',
        maxGuests: 2,
        bedConfiguration: '1 Double Bed',
        floor: 2,
        view: 'city',
        status: 'occupied',
        acType: 'ac',
        popular: false,
        rating: {
          average: 4.8,
          count: 124
        },
        images: [
          {
            url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
            alt: 'Room 205 - Double AC Room',
            isPrimary: true
          },
          {
            url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
            alt: 'Room 205 - Living Area',
            isPrimary: false
          }
        ],
        amenities: [
          { name: 'Free WiFi', icon: 'FaWifi', category: 'technology' },
          { name: 'Smart TV', icon: 'FaTv', category: 'entertainment' },
          { name: 'Mini Fridge', icon: 'FaCoffee', category: 'comfort' },
          { name: 'Room Service', icon: 'FaCheckCircle', category: 'basic' },
          { name: 'AC', icon: 'FaSnowflake', category: 'comfort' }
        ],
        detailedAmenities: {
          popularWithGuests: ['Heater', 'Daily Housekeeping', 'Free Wi-Fi', 'Laundry Service', 'Bathroom', 'Air Conditioning'],
          roomFeatures: ['Charging Points', 'Chair', 'Centre Table', 'Wardrobe'],
          mediaEntertainment: ['TV'],
          bathroom: ['Towels', 'Toiletries', 'Geyser/Water Heater', 'Hot & Cold Water'],
          otherFacilities: ['Newspaper']
        },
        lastCleaned: '2024-01-21',
        lastMaintenance: '2024-01-10',
        createdAt: '2023-06-15',
        updatedAt: '2024-01-18'
      },
      {
        id: 3,
        roomNumber: '302',
        category: 'triple',
        description: 'Large triple bedroom ideal for families or groups with three comfortable beds.',
        price: 699,
        originalPrice: 749,
        size: '45 m²',
        maxGuests: 3,
        bedConfiguration: '3 Single Beds',
        floor: 3,
        view: 'city',
        status: 'maintenance',
        acType: 'non-ac',
        popular: true,
        rating: {
          average: 4.6,
          count: 156
        },
        images: [
          {
            url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
            alt: 'Room 302 - Triple Non-AC Room',
            isPrimary: true
          }
        ],
        amenities: [
          { name: 'Free WiFi', icon: 'FaWifi', category: 'technology' },
          { name: 'Smart TV', icon: 'FaTv', category: 'entertainment' },
          { name: 'Mini Fridge', icon: 'FaCoffee', category: 'comfort' },
          { name: 'Room Service', icon: 'FaCheckCircle', category: 'basic' },
          { name: 'Fan', icon: 'FaSnowflake', category: 'comfort' }
        ],
        detailedAmenities: {
          popularWithGuests: ['Heater', 'Daily Housekeeping', 'Free Wi-Fi', 'Laundry Service', 'Bathroom', 'Ceiling Fan'],
          roomFeatures: ['Charging Points', 'Chairs', 'Centre Table', 'Large Wardrobe'],
          mediaEntertainment: ['TV'],
          bathroom: ['Towels', 'Toiletries', 'Geyser/Water Heater', 'Hot & Cold Water'],
          otherFacilities: ['Newspaper']
        },
        lastCleaned: '2024-01-20',
        lastMaintenance: '2024-01-22',
        createdAt: '2023-06-15',
        updatedAt: '2024-01-22'
      },
      {
        id: 4,
        roomNumber: '150',
        category: 'double',
        description: 'Comfortable double bedroom with natural ventilation and garden views.',
        price: 399,
        originalPrice: 449,
        size: '35 m²',
        maxGuests: 2,
        bedConfiguration: '1 Double Bed',
        floor: 1,
        view: 'garden',
        status: 'available',
        acType: 'non-ac',
        popular: false,
        rating: {
          average: 4.5,
          count: 203
        },
        images: [
          {
            url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
            alt: 'Room 150 - Double Non-AC Room',
            isPrimary: true
          }
        ],
        amenities: [
          { name: 'Free WiFi', icon: 'FaWifi', category: 'technology' },
          { name: 'Smart TV', icon: 'FaTv', category: 'entertainment' },
          { name: 'Mini Fridge', icon: 'FaCoffee', category: 'comfort' },
          { name: 'Room Service', icon: 'FaCheckCircle', category: 'basic' },
          { name: 'Fan', icon: 'FaSnowflake', category: 'comfort' }
        ],
        detailedAmenities: {
          popularWithGuests: ['Heater', 'Daily Housekeeping', 'Free Wi-Fi', 'Laundry Service', 'Bathroom', 'Ceiling Fan'],
          roomFeatures: ['Charging Points', 'Chair', 'Centre Table', 'Garden View'],
          mediaEntertainment: ['TV'],
          bathroom: ['Towels', 'Toiletries', 'Geyser/Water Heater', 'Hot & Cold Water'],
          otherFacilities: ['Newspaper']
        },
        lastCleaned: '2024-01-22',
        lastMaintenance: '2024-01-12',
        createdAt: '2023-06-15',
        updatedAt: '2024-01-19'
      }
    ];
    
    setRooms(mockRooms);
    setFilteredRooms(mockRooms);
  }, []);

  // Filter rooms
  useEffect(() => {
    let filtered = rooms;

    if (searchTerm) {
      filtered = filtered.filter(room =>
        room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (room.acType === 'ac' ? 'ac' : 'non-ac').includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(room => room.category === categoryFilter);
    }

    setFilteredRooms(filtered);
  }, [searchTerm, categoryFilter, rooms]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return '#10B981';
      case 'occupied': return '#F59E0B';
      case 'maintenance': return '#EF4444';
      case 'cleaning': return '#6B7280';
      case 'out-of-order': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const handleViewRoom = (room) => {
    setSelectedRoom(room);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEditRoom = (room) => {
    setSelectedRoom(room);
    setFormData(room);
    setImagePreview(room.images || []);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAddRoom = () => {
    setSelectedRoom(null);
    const defaultCategory = categories.length > 0 ? categories[0].categoryName.toLowerCase() : 'standard';
    setFormData({
      roomNumber: '',
      category: defaultCategory,
      description: '',
      price: 0,
      originalPrice: 0,
      size: '',
      maxGuests: 1,
      bedConfiguration: '',
      floor: 1,
      view: 'city',
      status: 'available',
      acType: 'ac', // ac or non-ac
      popular: false,
      amenities: [],
      images: []
    });
    setImagePreview([]);
    setModalMode('add');
    setShowModal(true);
  };

  const handleDeleteRoom = (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      setRooms(prev => prev.filter(room => room.id !== roomId));
    }
  };

  const handleSaveRoom = () => {
    if (modalMode === 'add') {
      const newRoom = {
        ...formData,
        id: Date.now(),
        rating: { average: 0, count: 0 },
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setRooms(prev => [...prev, newRoom]);
    } else if (modalMode === 'edit') {
      setRooms(prev => prev.map(room =>
        room.id === selectedRoom.id ? { ...formData, updatedAt: new Date().toISOString().split('T')[0] } : room
      ));
    }
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
    setFormData({});
    setImagePreview([]);
    setModalMode('view');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newImages = [];
      let processedCount = 0;

      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target.result;
          newImages.push({
            url: imageUrl,
            alt: `Room ${formData.roomNumber || 'Image'} - ${index + 1}`,
            isPrimary: index === 0 // First image is primary
          });
          
          processedCount++;
          if (processedCount === files.length) {
            // All images processed
            const updatedImages = [...imagePreview, ...newImages];
            setImagePreview(updatedImages);
            setFormData(prev => ({
              ...prev,
              images: updatedImages
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (indexToRemove) => {
    const updatedImages = imagePreview.filter((_, index) => index !== indexToRemove);
    // If we removed the primary image, make the first remaining image primary
    if (updatedImages.length > 0 && imagePreview[indexToRemove]?.isPrimary) {
      updatedImages[0].isPrimary = true;
    }
    setImagePreview(updatedImages);
    setFormData(prev => ({
      ...prev,
      images: updatedImages
    }));
  };

  const setPrimaryImage = (indexToSetPrimary) => {
    const updatedImages = imagePreview.map((img, index) => ({
      ...img,
      isPrimary: index === indexToSetPrimary
    }));
    setImagePreview(updatedImages);
    setFormData(prev => ({
      ...prev,
      images: updatedImages
    }));
  };

  return (
    <div style={styles.container}>
      {/* Header Controls */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
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
          <div style={styles.filterContainer}>
            <FaFilter style={styles.filterIcon} />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={styles.filterSelect}
              disabled={isLoadingCategories}
            >
              <option value="all">
                {isLoadingCategories ? 'Loading Categories...' : 'All Categories'}
              </option>
              {categories.map(category => (
                <option key={category.categoryId} value={category.categoryName.toLowerCase()}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          
          {/* API Status Indicator */}
          {apiStatus !== 'loading' && (
            <div style={styles.apiStatusContainer}>
              <div style={{
                ...styles.apiStatusIndicator,
                backgroundColor: apiStatus === 'success' ? '#10B981' : '#F59E0B'
              }}>
                <span style={styles.apiStatusText}>
                  {apiStatus === 'success' ? 'API Connected' : 'Using Fallback Data'}
                </span>
              </div>
            </div>
          )}
        </div>
        <div style={styles.headerRight}>
          <button onClick={handleAddRoom} style={styles.addBtn}>
            <FaPlus style={styles.btnIcon} />
            Add New Room
          </button>
        </div>
      </div>

      {/* Rooms Grid */}
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
              <img 
                src={room.images[0]?.url || 'https://via.placeholder.com/300x200'} 
                alt={room.name} 
                style={styles.roomImage} 
              />
              <div style={styles.statusOverlay}>
                <div style={{
                  ...styles.statusBadge,
                  backgroundColor: getStatusColor(room.status),
                  color: 'white'
                }}>
                  {room.status}
                </div>
              </div>
            </div>

            <div style={styles.roomContent}>
              <div style={styles.roomHeader}>
                <h3 style={styles.roomName}>
                  {room.category.charAt(0).toUpperCase() + room.category.slice(1)} Room
                  {room.acType === 'ac' ? ' (AC)' : ' (Non-AC)'}
                </h3>
                <div style={styles.roomNumber}>#{room.roomNumber}</div>
              </div>

              <div style={styles.roomSpecs}>
                <div style={styles.specItem}>
                  <FaBed style={styles.specIcon} />
                  <span>{room.bedConfiguration}</span>
                </div>
                <div style={styles.specItem}>
                  <FaUsers style={styles.specIcon} />
                  <span>Max {room.maxGuests}</span>
                </div>
                <div style={styles.specItem}>
                  <span style={styles.roomSize}>{room.size}</span>
                </div>
              </div>

              <div style={styles.roomStats}>
                <div style={styles.statItem}>
                  <FaStar style={styles.ratingIcon} />
                  <span>{room.rating.average} ({room.rating.count})</span>
                </div>
              </div>

              <div style={styles.priceInfo}>
                <span style={styles.currentPrice}>₹{room.price}</span>
                {room.originalPrice > room.price && (
                  <span style={styles.originalPrice}>₹{room.originalPrice}</span>
                )}
                <span style={styles.perNight}>/night</span>
              </div>

              <div style={styles.roomActions}>
                <button 
                  onClick={() => handleViewRoom(room)}
                  style={styles.viewBtn}
                >
                  <FaEye style={styles.btnIcon} />
                  View
                </button>
                <button 
                  onClick={() => handleEditRoom(room)}
                  style={styles.editBtn}
                >
                  <FaEdit style={styles.btnIcon} />
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteRoom(room.id)}
                  style={styles.deleteBtn}
                >
                  <FaTrash style={styles.btnIcon} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div style={styles.noResults}>
          <h3>No rooms found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Room Details/Edit Modal */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {modalMode === 'add' ? 'Add New Room' : 
                 modalMode === 'edit' ? 'Edit Room' : 'Room Details'}
              </h2>
              <button onClick={closeModal} style={styles.closeBtn}>
                <FaTimes />
              </button>
            </div>

            <div style={styles.modalBody}>
              {modalMode === 'view' && selectedRoom && (
                <div style={styles.viewMode}>
                  <div style={styles.roomImageSection}>
                    <div style={styles.imageGallery}>
                      {selectedRoom.images && selectedRoom.images.length > 0 ? (
                        selectedRoom.images.map((image, index) => (
                          <div key={index} style={styles.galleryImageContainer}>
                            <img 
                              src={image.url} 
                              alt={image.alt} 
                              style={styles.modalRoomImage}
                            />
                            {image.isPrimary && (
                              <div style={styles.primaryImageBadge}>Primary</div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div style={styles.noImagePlaceholder}>
                          <FaImage style={styles.noImageIcon} />
                          <p>No images available</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={styles.detailsGrid}>
                    <div style={styles.detailSection}>
                      <h3 style={styles.sectionTitle}>Basic Information</h3>
                      <div style={styles.detailsList}>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Room Number:</span>
                          <span style={styles.detailValue}>{selectedRoom.roomNumber}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Category:</span>
                          <span style={styles.detailValue}>{selectedRoom.category}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>AC Type:</span>
                          <span style={styles.detailValue}>{selectedRoom.acType === 'ac' ? 'AC' : 'Non-AC'}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Floor:</span>
                          <span style={styles.detailValue}>{selectedRoom.floor}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Size:</span>
                          <span style={styles.detailValue}>{selectedRoom.size}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Max Guests:</span>
                          <span style={styles.detailValue}>{selectedRoom.maxGuests}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Bed Configuration:</span>
                          <span style={styles.detailValue}>{selectedRoom.bedConfiguration}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>View:</span>
                          <span style={styles.detailValue}>{selectedRoom.view}</span>
                        </div>
                      </div>
                    </div>

                    <div style={styles.detailSection}>
                      <h3 style={styles.sectionTitle}>Pricing & Status</h3>
                      <div style={styles.detailsList}>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Current Price:</span>
                          <span style={styles.detailValue}>₹{selectedRoom.price}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Original Price:</span>
                          <span style={styles.detailValue}>₹{selectedRoom.originalPrice}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Status:</span>
                          <span style={{
                            ...styles.statusBadge,
                            backgroundColor: `${getStatusColor(selectedRoom.status)}20`,
                            color: getStatusColor(selectedRoom.status)
                          }}>
                            {selectedRoom.status}
                          </span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Popular:</span>
                          <span style={styles.detailValue}>{selectedRoom.popular ? 'Yes' : 'No'}</span>
                        </div>
                      </div>
                    </div>

                    <div style={styles.detailSection}>
                      <h3 style={styles.sectionTitle}>Performance</h3>
                      <div style={styles.detailsList}>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Average Rating:</span>
                          <span style={styles.detailValue}>{selectedRoom.rating.average}/5</span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Total Reviews:</span>
                          <span style={styles.detailValue}>{selectedRoom.rating.count}</span>
                        </div>
                      </div>
                    </div>

                    <div style={styles.detailSection}>
                      <h3 style={styles.sectionTitle}>Maintenance</h3>
                      <div style={styles.detailsList}>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Last Cleaned:</span>
                          <span style={styles.detailValue}>{selectedRoom.lastCleaned}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Last Maintenance:</span>
                          <span style={styles.detailValue}>{selectedRoom.lastMaintenance}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Created:</span>
                          <span style={styles.detailValue}>{selectedRoom.createdAt}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Last Updated:</span>
                          <span style={styles.detailValue}>{selectedRoom.updatedAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={styles.descriptionSection}>
                    <h3 style={styles.sectionTitle}>Description</h3>
                    <p style={styles.description}>{selectedRoom.description}</p>
                  </div>

                  <div style={styles.amenitiesSection}>
                    <h3 style={styles.sectionTitle}>Amenities</h3>
                    <div style={styles.amenitiesList}>
                      {selectedRoom.amenities.map((amenity, index) => (
                        <div key={index} style={styles.amenityItem}>
                          <FaCheckCircle style={styles.checkIcon} />
                          <span>{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {(modalMode === 'edit' || modalMode === 'add') && (
                <div style={styles.editMode}>
                  <div style={styles.formGrid}>
                    {/* Image Upload Section */}
                    <div style={styles.imageUploadSection}>
                      <h3 style={styles.sectionTitle}>Room Images</h3>
                      <div style={styles.imageUploadContainer}>
                        
                        {/* Display existing images */}
                        {imagePreview.length > 0 && (
                          <div style={styles.imageGrid}>
                            {imagePreview.map((image, index) => (
                              <div key={index} style={styles.imagePreviewContainer}>
                                <img 
                                  src={image.url} 
                                  alt={image.alt} 
                                  style={styles.imagePreview} 
                                />
                                {image.isPrimary && (
                                  <div style={styles.primaryBadge}>Primary</div>
                                )}
                                <div style={styles.imageActions}>
                                  {!image.isPrimary && (
                                    <button
                                      type="button"
                                      onClick={() => setPrimaryImage(index)}
                                      style={styles.setPrimaryBtn}
                                      title="Set as primary image"
                                    >
                                      Set Primary
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    style={styles.removeImageBtn}
                                    title="Remove image"
                                  >
                                    ×
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Upload new images */}
                        <div style={styles.uploadArea}>
                          <div style={styles.uploadPlaceholder}>
                            <FaImage style={styles.uploadIcon} />
                            <p style={styles.uploadText}>
                              {imagePreview.length === 0 ? 'Upload Room Images' : 'Add More Images'}
                            </p>
                            <label htmlFor="imageUpload" style={styles.uploadBtn}>
                              <FaUpload style={styles.btnIcon} />
                              Choose Images
                            </label>
                          </div>
                        </div>

                        <input
                          id="imageUpload"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          style={styles.hiddenInput}
                        />
                      </div>
                    </div>

                    <div style={styles.formSection}>
                      <h3 style={styles.sectionTitle}>Basic Information</h3>
                      <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Room Number</label>
                          <input
                            type="text"
                            value={formData.roomNumber || ''}
                            onChange={(e) => handleInputChange('roomNumber', e.target.value)}
                            style={styles.input}
                            placeholder="Enter room number"
                          />
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Category</label>
                          <select
                            value={formData.category || ''}
                            onChange={(e) => handleInputChange('category', e.target.value)}
                            style={styles.select}
                            disabled={isLoadingCategories}
                          >
                            <option value="">
                              {isLoadingCategories ? 'Loading Categories...' : 'Select Category'}
                            </option>
                            {categories.map(category => (
                              <option key={category.categoryId} value={category.categoryName.toLowerCase()}>
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>AC Type</label>
                          <select
                            value={formData.acType || 'ac'}
                            onChange={(e) => handleInputChange('acType', e.target.value)}
                            style={styles.select}
                          >
                            <option value="ac">AC</option>
                            <option value="non-ac">Non-AC</option>
                          </select>
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Floor</label>
                          <input
                            type="number"
                            value={formData.floor || 1}
                            onChange={(e) => handleInputChange('floor', parseInt(e.target.value))}
                            style={styles.input}
                            min="1"
                          />
                        </div>
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Description</label>
                        <textarea
                          value={formData.description || ''}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          style={styles.textarea}
                          rows="3"
                          placeholder="Enter room description"
                        />
                      </div>
                    </div>

                    <div style={styles.formSection}>
                      <h3 style={styles.sectionTitle}>Room Details</h3>
                      <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Size</label>
                          <input
                            type="text"
                            value={formData.size || ''}
                            onChange={(e) => handleInputChange('size', e.target.value)}
                            style={styles.input}
                            placeholder="e.g., 45 m²"
                          />
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Max Guests</label>
                          <input
                            type="number"
                            value={formData.maxGuests || 1}
                            onChange={(e) => handleInputChange('maxGuests', parseInt(e.target.value))}
                            style={styles.input}
                            min="1"
                            max="10"
                          />
                        </div>
                      </div>
                      <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Bed Configuration</label>
                          <input
                            type="text"
                            value={formData.bedConfiguration || ''}
                            onChange={(e) => handleInputChange('bedConfiguration', e.target.value)}
                            style={styles.input}
                            placeholder="e.g., 1 King + 1 Queen"
                          />
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>View</label>
                          <select
                            value={formData.view || 'city'}
                            onChange={(e) => handleInputChange('view', e.target.value)}
                            style={styles.select}
                          >
                            <option value="city">City</option>
                            <option value="ocean">Ocean</option>
                            <option value="garden">Garden</option>
                            <option value="pool">Pool</option>
                            <option value="courtyard">Courtyard</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div style={styles.formSection}>
                      <h3 style={styles.sectionTitle}>Pricing & Settings</h3>
                      <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Current Price (₹)</label>
                          <input
                            type="number"
                            value={formData.price || 0}
                            onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                            style={styles.input}
                            min="0"
                          />
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Original Price (₹)</label>
                          <input
                            type="number"
                            value={formData.originalPrice || 0}
                            onChange={(e) => handleInputChange('originalPrice', parseFloat(e.target.value))}
                            style={styles.input}
                            min="0"
                          />
                        </div>
                      </div>
                      <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Status</label>
                          <select
                            value={formData.status || 'available'}
                            onChange={(e) => handleInputChange('status', e.target.value)}
                            style={styles.select}
                          >
                            <option value="available">Available</option>
                            <option value="occupied">Occupied</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="cleaning">Cleaning</option>
                            <option value="out-of-order">Out of Order</option>
                          </select>
                        </div>
                        <div style={styles.formGroup}>
                          <div style={styles.checkboxRow}>
                            <label style={styles.checkboxLabel}>
                              <input
                                type="checkbox"
                                checked={formData.popular || false}
                                onChange={(e) => handleInputChange('popular', e.target.checked)}
                                style={styles.checkbox}
                              />
                              Popular Room
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={styles.modalFooter}>
              {modalMode === 'view' && (
                <button 
                  onClick={() => handleEditRoom(selectedRoom)}
                  style={styles.editModalBtn}
                >
                  <FaEdit style={styles.btnIcon} />
                  Edit Room
                </button>
              )}
              {(modalMode === 'edit' || modalMode === 'add') && (
                <div style={styles.modalActions}>
                  <button onClick={closeModal} style={styles.cancelBtn}>
                    Cancel
                  </button>
                  <button onClick={handleSaveRoom} style={styles.saveBtn}>
                    <FaSave style={styles.btnIcon} />
                    {modalMode === 'add' ? 'Add Room' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#F8F9FA',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },

  headerLeft: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  headerRight: {
    display: 'flex',
    gap: '0.5rem',
  },

  searchContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },

  searchIcon: {
    position: 'absolute',
    left: '12px',
    color: '#D4AF37',
    fontSize: '14px',
    zIndex: 2,
  },

  searchInput: {
    padding: '10px 12px 10px 36px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'white',
    outline: 'none',
    width: '250px',
  },

  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  filterIcon: {
    color: '#D4AF37',
    fontSize: '14px',
  },

  filterSelect: {
    padding: '10px 12px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'white',
    outline: 'none',
    cursor: 'pointer',
  },

  apiStatusContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  apiStatusIndicator: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },

  apiStatusText: {
    fontSize: '11px',
    fontWeight: '600',
  },

  addBtn: {
    padding: '10px 16px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.3s ease',
  },

  btnIcon: {
    fontSize: '12px',
  },

  statsRow: {
    display: 'flex',
    gap: '2rem',
    marginBottom: '2rem',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #E5E5E5',
  },

  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },

  statNumber: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1A1A1A',
  },

  statLabel: {
    fontSize: '12px',
    color: '#666',
    fontWeight: '500',
  },

  roomsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '1.5rem',
  },

  roomCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
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
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
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
    height: '200px',
    position: 'relative',
    overflow: 'hidden',
  },

  roomImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  statusOverlay: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
  },

  statusBadge: {
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '500',
    textTransform: 'capitalize',
  },

  roomContent: {
    padding: '1.5rem',
  },

  roomHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  },

  roomName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: 0,
  },

  roomNumber: {
    fontSize: '12px',
    color: '#D4AF37',
    fontWeight: '600',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    padding: '4px 8px',
    borderRadius: '4px',
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
    fontSize: '12px',
    color: '#666',
  },

  specIcon: {
    color: '#D4AF37',
    fontSize: '12px',
  },

  roomSize: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    color: '#D4AF37',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '500',
  },

  roomStats: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    fontSize: '12px',
    color: '#666',
  },

  ratingIcon: {
    color: '#D4AF37',
    fontSize: '12px',
    marginRight: '4px',
  },

  priceInfo: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    marginBottom: '1rem',
  },

  currentPrice: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#1A1A1A',
  },

  originalPrice: {
    fontSize: '0.9rem',
    color: '#999',
    textDecoration: 'line-through',
  },

  perNight: {
    fontSize: '0.8rem',
    color: '#666',
  },

  roomActions: {
    display: 'flex',
    gap: '0.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid #F0F0F0',
  },

  viewBtn: {
    flex: 1,
    padding: '8px 12px',
    backgroundColor: 'transparent',
    color: '#D4AF37',
    border: '1px solid #D4AF37',
    borderRadius: '6px',
    fontWeight: '500',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  editBtn: {
    flex: 1,
    padding: '8px 12px',
    backgroundColor: '#10B981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  deleteBtn: {
    flex: 1,
    padding: '8px 12px',
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  noResults: {
    padding: '3rem',
    textAlign: 'center',
    color: '#666',
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #E5E5E5',
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
    maxWidth: '1200px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },

  modalHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #E5E5E5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: 0,
  },

  closeBtn: {
    padding: '8px',
    background: 'transparent',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '4px',
  },

  modalBody: {
    padding: '1.5rem',
    overflow: 'auto',
    flex: 1,
  },

  roomImageSection: {
    marginBottom: '2rem',
  },

  modalRoomImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
  },

  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },

  detailSection: {
    backgroundColor: '#F8F9FA',
    padding: '1rem',
    borderRadius: '8px',
  },

  sectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '1rem',
  },

  detailsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  detailLabel: {
    fontSize: '12px',
    color: '#666',
    fontWeight: '500',
  },

  detailValue: {
    fontSize: '14px',
    color: '#1A1A1A',
    fontWeight: '500',
  },

  descriptionSection: {
    backgroundColor: '#F8F9FA',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '2rem',
  },

  description: {
    fontSize: '14px',
    color: '#1A1A1A',
    margin: 0,
    lineHeight: '1.5',
  },

  amenitiesSection: {
    backgroundColor: '#F8F9FA',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '2rem',
  },

  amenitiesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '0.5rem',
  },

  amenityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#1A1A1A',
    padding: '6px 8px',
    backgroundColor: 'white',
    borderRadius: '4px',
  },

  checkIcon: {
    color: '#10B981',
    fontSize: '12px',
  },

  // Form Styles
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },

  formSection: {
    backgroundColor: '#F8F9FA',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '1rem',
  },

  formGroup: {
    marginBottom: '1.5rem',
  },

  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: '8px',
  },

  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'white',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box',
  },

  select: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'white',
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
  },

  textarea: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'white',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },

  checkboxGroup: {
    marginBottom: '1rem',
  },

  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#1A1A1A',
    cursor: 'pointer',
  },

  checkbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },

  modalFooter: {
    padding: '1rem 1.5rem',
    borderTop: '1px solid #E5E5E5',
    backgroundColor: '#F8F9FA',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  editModalBtn: {
    padding: '10px 20px',
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.3s ease',
  },

  modalActions: {
    display: 'flex',
    gap: '1rem',
  },

  cancelBtn: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    color: '#666',
    border: '1px solid #E5E5E5',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  saveBtn: {
    padding: '10px 20px',
    backgroundColor: '#10B981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.3s ease',
  },

  // Image Upload Styles
  imageUploadSection: {
    backgroundColor: '#F8F9FA',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '1rem',
  },

  imageUploadContainer: {
    border: '2px dashed #E5E5E5',
    borderRadius: '8px',
    padding: '1rem',
    transition: 'all 0.3s ease',
  },

  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '1rem',
  },

  imagePreviewContainer: {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    aspectRatio: '4/3',
  },

  imagePreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
  },

  primaryBadge: {
    position: 'absolute',
    top: '8px',
    left: '8px',
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: '600',
  },

  imageActions: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    display: 'flex',
    gap: '4px',
  },

  setPrimaryBtn: {
    padding: '4px 8px',
    backgroundColor: 'rgba(212, 175, 55, 0.9)',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  removeImageBtn: {
    width: '24px',
    height: '24px',
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },

  uploadArea: {
    border: '2px dashed #D4AF37',
    borderRadius: '8px',
    padding: '1rem',
    textAlign: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
  },

  uploadPlaceholder: {
    padding: '1rem',
    color: '#666',
    textAlign: 'center',
  },

  uploadIcon: {
    fontSize: '2rem',
    color: '#D4AF37',
    marginBottom: '1rem',
  },

  uploadText: {
    fontSize: '14px',
    marginBottom: '1rem',
    color: '#666',
  },

  uploadBtn: {
    padding: '8px 16px',
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.3s ease',
  },

  hiddenInput: {
    display: 'none',
  },

  // Room Image Gallery Styles
  imageGallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },

  galleryImageContainer: {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    aspectRatio: '4/3',
  },

  primaryImageBadge: {
    position: 'absolute',
    top: '8px',
    left: '8px',
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: '600',
  },

  noImagePlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    color: '#666',
    backgroundColor: '#F8F9FA',
    borderRadius: '8px',
    border: '2px dashed #E5E5E5',
  },

  noImageIcon: {
    fontSize: '2rem',
    color: '#D4AF37',
    marginBottom: '0.5rem',
  },

  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },

  checkboxRow: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    marginTop: '1rem',
  },
};

export default AdminRoomsComponent;