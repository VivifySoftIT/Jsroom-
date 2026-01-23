import React, { useState, useEffect } from 'react';
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
  FaUpload,
  FaSpinner,
  FaExclamationTriangle,
  FaWifi,
  FaPlug
} from 'react-icons/fa';

const AdminRoomsComponent = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState([]);
  const [loading, setLoading] = useState({
    categories: false,
    rooms: false
  });
  const [error, setError] = useState(null);

  // ✅ Mock data
  const mockCategories = [
    { categoryId: 1, categoryName: 'Standard' },
    { categoryId: 2, categoryName: 'Deluxe' },
    { categoryId: 3, categoryName: 'Suite' },
    { categoryId: 4, categoryName: 'Executive' },
    { categoryId: 5, categoryName: 'Presidential' }
  ];

  const mockRooms = [
    {
      id: 1,
      roomNumber: '101',
      category: 'Standard',
      description: 'Comfortable standard room with modern amenities and city views.',
      price: 2999,
      originalPrice: 3499,
      size: '25 m²',
      maxGuests: 2,
      bedConfiguration: '1 Double Bed',
      floor: 1,
      view: 'City View',
      status: 'available',
      acType: 'ac',
      popular: true,
      rating: { average: 4.7, count: 89 },
      images: [{
        url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
        alt: 'Standard Room',
        isPrimary: true
      }],
      amenities: ['Free WiFi', 'TV', 'AC', 'Room Service', 'Mini Bar'],
      lastCleaned: '2024-01-22',
      lastMaintenance: '2024-01-15',
      createdAt: '2023-06-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 2,
      roomNumber: '205',
      category: 'Deluxe',
      description: 'Spacious deluxe room with ocean view and premium amenities.',
      price: 4999,
      originalPrice: 5499,
      size: '35 m²',
      maxGuests: 2,
      bedConfiguration: '1 King Bed',
      floor: 2,
      view: 'Ocean View',
      status: 'occupied',
      acType: 'ac',
      popular: false,
      rating: { average: 4.8, count: 124 },
      images: [{
        url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
        alt: 'Deluxe Room',
        isPrimary: true
      }],
      amenities: ['Free WiFi', 'Smart TV', 'Mini Bar', 'AC', 'Balcony', 'Room Service'],
      lastCleaned: '2024-01-21',
      lastMaintenance: '2024-01-10',
      createdAt: '2023-06-15',
      updatedAt: '2024-01-18'
    },
    {
      id: 3,
      roomNumber: '301',
      category: 'Suite',
      description: 'Luxurious suite with separate living area and premium services.',
      price: 7999,
      originalPrice: 8499,
      size: '50 m²',
      maxGuests: 3,
      bedConfiguration: '1 King Bed + 1 Single Bed',
      floor: 3,
      view: 'Garden View',
      status: 'available',
      acType: 'ac',
      popular: true,
      rating: { average: 4.9, count: 156 },
      images: [{
        url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
        alt: 'Suite Room',
        isPrimary: true
      }],
      amenities: ['Free WiFi', 'Smart TV', 'Mini Bar', 'AC', 'Jacuzzi', 'Room Service', 'Kitchenette'],
      lastCleaned: '2024-01-23',
      lastMaintenance: '2024-01-18',
      createdAt: '2023-06-15',
      updatedAt: '2024-01-22'
    },
    {
      id: 4,
      roomNumber: '402',
      category: 'Executive',
      description: 'Executive room with workspace and premium business amenities.',
      price: 5999,
      originalPrice: 6499,
      size: '40 m²',
      maxGuests: 2,
      bedConfiguration: '1 King Bed',
      floor: 4,
      view: 'City View',
      status: 'maintenance',
      acType: 'ac',
      popular: false,
      rating: { average: 4.6, count: 92 },
      images: [{
        url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
        alt: 'Executive Room',
        isPrimary: true
      }],
      amenities: ['Free WiFi', 'Smart TV', 'Work Desk', 'AC', 'Coffee Machine', 'Room Service'],
      lastCleaned: '2024-01-20',
      lastMaintenance: '2024-01-22',
      createdAt: '2023-06-15',
      updatedAt: '2024-01-22'
    },
    {
      id: 5,
      roomNumber: '505',
      category: 'Presidential',
      description: 'Ultimate luxury presidential suite with panoramic city views and butler service.',
      price: 14999,
      originalPrice: 15999,
      size: '85 m²',
      maxGuests: 4,
      bedConfiguration: '1 King Bed + 2 Single Beds',
      floor: 5,
      view: 'Panoramic City View',
      status: 'available',
      acType: 'ac',
      popular: true,
      rating: { average: 4.9, count: 45 },
      images: [{
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
        alt: 'Presidential Suite',
        isPrimary: true
      }],
      amenities: ['Free WiFi', 'Smart TV', 'Mini Bar', 'AC', 'Jacuzzi', 'Butler Service', 'Kitchen', 'Living Room', 'Dining Area'],
      lastCleaned: '2024-01-23',
      lastMaintenance: '2024-01-20',
      createdAt: '2023-06-15',
      updatedAt: '2024-01-22'
    },
    {
      id: 6,
      roomNumber: '102',
      category: 'Standard',
      description: 'Standard room with garden view, perfect for budget travelers.',
      price: 2799,
      originalPrice: 3299,
      size: '22 m²',
      maxGuests: 2,
      bedConfiguration: '2 Single Beds',
      floor: 1,
      view: 'Garden View',
      status: 'available',
      acType: 'ac',
      popular: false,
      rating: { average: 4.3, count: 67 },
      images: [{
        url: 'https://images.unsplash.com/photo-1631049309555-4c8b2a3e51f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80',
        alt: 'Standard Room Garden View',
        isPrimary: true
      }],
      amenities: ['Free WiFi', 'TV', 'AC', 'Room Service'],
      lastCleaned: '2024-01-22',
      lastMaintenance: '2024-01-10',
      createdAt: '2023-06-15',
      updatedAt: '2024-01-21'
    }
  ];

  // ✅ Initialize data on component mount
  useEffect(() => {
    // Simulate loading delay
    setLoading({ categories: true, rooms: true });
    
    setTimeout(() => {
      setCategories(mockCategories);
      setRooms(mockRooms);
      setFilteredRooms(mockRooms);
      setLoading({ categories: false, rooms: false });
    }, 500);
  }, []);

  // ✅ Filter rooms based on search and category
  useEffect(() => {
    let filtered = rooms;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(room =>
        (room.roomNumber && room.roomNumber.toLowerCase().includes(searchLower)) ||
        (room.category && room.category.toLowerCase().includes(searchLower)) ||
        (room.description && room.description.toLowerCase().includes(searchLower)) ||
        (room.view && room.view.toLowerCase().includes(searchLower))
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(room => 
        room.category && room.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    setFilteredRooms(filtered);
  }, [searchTerm, categoryFilter, rooms]);

  // ✅ Status color helper
  const getStatusColor = (status) => {
    if (!status) return '#6B7280';
    
    switch (status.toLowerCase()) {
      case 'available': return '#10B981';
      case 'occupied': return '#F59E0B';
      case 'maintenance': return '#EF4444';
      case 'cleaning': return '#6B7280';
      case 'out-of-order': return '#DC2626';
      default: return '#6B7280';
    }
  };

  // ✅ CRUD Operations
  const handleViewRoom = (room) => {
    setSelectedRoom(room);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEditRoom = (room) => {
    setSelectedRoom(room);
    setFormData({
      ...room,
      category: room.category || 'Standard',
      acType: room.acType || 'ac',
      status: room.status || 'available',
      amenities: room.amenities || []
    });
    setImagePreview(room.images || []);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAddRoom = () => {
    setSelectedRoom(null);
    const defaultCategory = categories.length > 0 ? categories[0].categoryName : 'Standard';
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
      view: 'City View',
      status: 'available',
      acType: 'ac',
      popular: false,
      amenities: [],
      images: []
    });
    setImagePreview([]);
    setModalMode('add');
    setShowModal(true);
  };

  const handleDeleteRoom = (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room?')) {
      return;
    }
    
    setRooms(prev => prev.filter(room => room.id !== roomId));
    alert('Room deleted successfully');
  };

  const handleSaveRoom = () => {
    try {
      if (modalMode === 'add') {
        const newRoom = {
          ...formData,
          id: Date.now(),
          rating: { average: 0, count: 0 },
          images: imagePreview,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          lastCleaned: new Date().toISOString().split('T')[0],
          lastMaintenance: new Date().toISOString().split('T')[0]
        };
        setRooms(prev => [...prev, newRoom]);
        alert('Room added successfully');
      } else if (modalMode === 'edit') {
        setRooms(prev => prev.map(room =>
          room.id === selectedRoom.id ? { 
            ...formData, 
            images: imagePreview,
            updatedAt: new Date().toISOString().split('T')[0] 
          } : room
        ));
        alert('Room updated successfully');
      }
      
      closeModal();
    } catch (err) {
      console.error('Error saving room:', err);
      alert('Failed to save room. Please try again.');
    }
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
      
      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target.result;
          newImages.push({
            url: imageUrl,
            alt: `Room ${formData.roomNumber || 'Image'} ${index + 1}`,
            isPrimary: imagePreview.length === 0 && index === 0
          });
          
          if (newImages.length === files.length) {
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

  // ✅ Loading skeleton
  const RoomCardSkeleton = () => (
    <div style={styles.roomCard}>
      <div style={{ ...styles.roomImageContainer, backgroundColor: '#E5E7EB' }}></div>
      <div style={styles.roomContent}>
        <div style={styles.roomHeader}>
          <div style={{ width: '60%', height: '24px', backgroundColor: '#E5E7EB', borderRadius: '4px' }}></div>
          <div style={{ width: '30%', height: '20px', backgroundColor: '#E5E7EB', borderRadius: '4px' }}></div>
        </div>
        <div style={{ width: '100%', height: '16px', backgroundColor: '#E5E7EB', borderRadius: '4px', marginBottom: '8px' }}></div>
        <div style={{ width: '80%', height: '16px', backgroundColor: '#E5E7EB', borderRadius: '4px', marginBottom: '16px' }}></div>
        <div style={{ width: '40%', height: '24px', backgroundColor: '#E5E7EB', borderRadius: '4px' }}></div>
      </div>
    </div>
  );

  // ✅ Render Edit/Add Modal Form
  const renderFormModal = () => {
    const isEdit = modalMode === 'edit';
    const isAdd = modalMode === 'add';
    const title = isEdit ? 'Edit Room' : isAdd ? 'Add New Room' : 'View Room';

    return (
      <div style={styles.modalOverlay} onClick={closeModal}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div style={styles.modalHeader}>
            <h2 style={styles.modalTitle}>{title}</h2>
            <button onClick={closeModal} style={styles.closeBtn}>
              <FaTimes />
            </button>
          </div>
          
          <div style={styles.modalBody}>
            <div style={styles.formGrid}>
              {/* Basic Information */}
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Basic Information</h3>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Room Number*</label>
                  <input
                    type="text"
                    value={formData.roomNumber || ''}
                    onChange={(e) => handleInputChange('roomNumber', e.target.value)}
                    style={styles.input}
                    placeholder="e.g., 101, 202A"
                    disabled={modalMode === 'view'}
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Category*</label>
                  <select
                    value={formData.category || 'Standard'}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    style={styles.select}
                    disabled={modalMode === 'view'}
                  >
                    {categories.map(category => (
                      <option key={category.categoryId} value={category.categoryName}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Floor*</label>
                    <input
                      type="number"
                      value={formData.floor || 1}
                      onChange={(e) => handleInputChange('floor', parseInt(e.target.value))}
                      style={styles.input}
                      min="1"
                      max="50"
                      disabled={modalMode === 'view'}
                    />
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Max Guests*</label>
                    <input
                      type="number"
                      value={formData.maxGuests || 1}
                      onChange={(e) => handleInputChange('maxGuests', parseInt(e.target.value))}
                      style={styles.input}
                      min="1"
                      max="10"
                      disabled={modalMode === 'view'}
                    />
                  </div>
                </div>
              </div>

              {/* Room Details */}
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Room Details</h3>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Bed Configuration*</label>
                  <input
                    type="text"
                    value={formData.bedConfiguration || ''}
                    onChange={(e) => handleInputChange('bedConfiguration', e.target.value)}
                    style={styles.input}
                    placeholder="e.g., 1 King Bed, 2 Single Beds"
                    disabled={modalMode === 'view'}
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Room Size</label>
                  <input
                    type="text"
                    value={formData.size || ''}
                    onChange={(e) => handleInputChange('size', e.target.value)}
                    style={styles.input}
                    placeholder="e.g., 25 m², 35 sq ft"
                    disabled={modalMode === 'view'}
                  />
                </div>
                
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>View</label>
                    <select
                      value={formData.view || 'City View'}
                      onChange={(e) => handleInputChange('view', e.target.value)}
                      style={styles.select}
                      disabled={modalMode === 'view'}
                    >
                      <option value="City View">City View</option>
                      <option value="Ocean View">Ocean View</option>
                      <option value="Garden View">Garden View</option>
                      <option value="Mountain View">Mountain View</option>
                      <option value="Pool View">Pool View</option>
                      <option value="No View">No View</option>
                    </select>
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.label}>AC Type</label>
                    <select
                      value={formData.acType || 'ac'}
                      onChange={(e) => handleInputChange('acType', e.target.value)}
                      style={styles.select}
                      disabled={modalMode === 'view'}
                    >
                      <option value="ac">AC</option>
                      <option value="non-ac">Non-AC</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Pricing</h3>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Current Price* (₹)</label>
                    <input
                      type="number"
                      value={formData.price || 0}
                      onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                      style={styles.input}
                      min="0"
                      step="100"
                      disabled={modalMode === 'view'}
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
                      step="100"
                      disabled={modalMode === 'view'}
                    />
                  </div>
                </div>
              </div>

              {/* Status & Features */}
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Status & Features</h3>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Status*</label>
                  <select
                    value={formData.status || 'available'}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    style={styles.select}
                    disabled={modalMode === 'view'}
                  >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="out-of-order">Out of Order</option>
                  </select>
                </div>
                
                <div style={styles.checkboxGroup}>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.popular || false}
                      onChange={(e) => handleInputChange('popular', e.target.checked)}
                      style={styles.checkbox}
                      disabled={modalMode === 'view'}
                    />
                    Mark as Popular Room
                  </label>
                </div>
              </div>

              {/* Description */}
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Description</h3>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Room Description*</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    style={styles.textarea}
                    rows="4"
                    placeholder="Describe the room features, amenities, and special characteristics..."
                    disabled={modalMode === 'view'}
                  />
                </div>
              </div>

              {/* Amenities */}
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Amenities</h3>
                <div style={styles.checkboxRow}>
                  {['Free WiFi', 'TV', 'Smart TV', 'AC', 'Room Service', 'Mini Bar', 'Balcony', 'Jacuzzi', 'Kitchenette', 'Work Desk', 'Coffee Machine', 'Butler Service'].map(amenity => (
                    <div key={amenity} style={styles.checkboxGroup}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={(formData.amenities || []).includes(amenity)}
                          onChange={(e) => {
                            const currentAmenities = formData.amenities || [];
                            if (e.target.checked) {
                              handleInputChange('amenities', [...currentAmenities, amenity]);
                            } else {
                              handleInputChange('amenities', currentAmenities.filter(a => a !== amenity));
                            }
                          }}
                          style={styles.checkbox}
                          disabled={modalMode === 'view'}
                        />
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Images Upload */}
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Room Images</h3>
                <div style={styles.imageUploadSection}>
                  {imagePreview.length > 0 ? (
                    <div style={styles.imageGrid}>
                      {imagePreview.map((image, index) => (
                        <div key={index} style={styles.imagePreviewContainer}>
                          <img src={image.url} alt={image.alt} style={styles.imagePreview} />
                          {image.isPrimary && (
                            <div style={styles.primaryBadge}>Primary</div>
                          )}
                          {modalMode !== 'view' && (
                            <div style={styles.imageActions}>
                              {!image.isPrimary && (
                                <button
                                  onClick={() => setPrimaryImage(index)}
                                  style={styles.setPrimaryBtn}
                                >
                                  Set Primary
                                </button>
                              )}
                              <button
                                onClick={() => removeImage(index)}
                                style={styles.removeImageBtn}
                              >
                                ×
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={styles.uploadPlaceholder}>
                      <FaImage style={styles.uploadIcon} />
                      <p style={styles.uploadText}>No images uploaded yet</p>
                    </div>
                  )}
                  
                  {modalMode !== 'view' && (
                    <div style={styles.uploadArea}>
                      <label style={styles.uploadBtn}>
                        <FaUpload style={styles.btnIcon} />
                        Upload Images
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          style={styles.hiddenInput}
                        />
                      </label>
                      <p style={styles.uploadText}>
                        Upload room images (JPG, PNG). First image will be set as primary.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div style={styles.modalFooter}>
            {modalMode === 'view' ? (
              <div style={styles.modalActions}>
                <button onClick={() => handleEditRoom(selectedRoom)} style={styles.editModalBtn}>
                  <FaEdit style={styles.btnIcon} />
                  Edit Room
                </button>
                <button onClick={closeModal} style={styles.cancelBtn}>
                  Close
                </button>
              </div>
            ) : (
              <div style={styles.modalActions}>
                <button onClick={closeModal} style={styles.cancelBtn}>
                  Cancel
                </button>
                <button onClick={handleSaveRoom} style={styles.saveBtn}>
                  <FaSave style={styles.btnIcon} />
                  {isEdit ? 'Update Room' : 'Add Room'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ✅ Check loading states
  const isLoading = loading.categories || loading.rooms;

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
              disabled={isLoading}
            />
          </div>
          <div style={styles.filterContainer}>
            <FaFilter style={styles.filterIcon} />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={styles.filterSelect}
              disabled={isLoading}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.categoryId} value={category.categoryName.toLowerCase()}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={styles.headerRight}>
          <button onClick={handleAddRoom} style={styles.addBtn} disabled={isLoading}>
            <FaPlus style={styles.btnIcon} />
            Add New Room
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div style={styles.statsRow}>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>{rooms.length}</div>
          <div style={styles.statLabel}>Total Rooms</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>
            {rooms.filter(r => r.status === 'available').length}
          </div>
          <div style={styles.statLabel}>Available</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>
            {rooms.filter(r => r.status === 'occupied').length}
          </div>
          <div style={styles.statLabel}>Occupied</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>
            {rooms.filter(r => r.popular).length}
          </div>
          <div style={styles.statLabel}>Popular</div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div style={styles.roomsGrid}>
        {isLoading ? (
          // Show loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <RoomCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : filteredRooms.length > 0 ? (
          filteredRooms.map(room => (
            <div key={room.id} style={styles.roomCard}>
              {room.popular && (
                <div style={styles.popularBadge}>
                  <FaStar style={styles.starIcon} />
                  Popular
                </div>
              )}
              
              <div style={styles.roomImageContainer}>
                <img 
                  src={room.images?.[0]?.url || 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Room+Image'} 
                  alt={room.roomNumber || 'Room'} 
                  style={styles.roomImage}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Room+Image';
                  }}
                />
                <div style={styles.statusOverlay}>
                  <div style={{
                    ...styles.statusBadge,
                    backgroundColor: getStatusColor(room.status),
                    color: 'white'
                  }}>
                    {room.status || 'N/A'}
                  </div>
                </div>
              </div>

              <div style={styles.roomContent}>
                <div style={styles.roomHeader}>
                  <h3 style={styles.roomName}>
                    {room.category || 'Room'} {room.acType === 'ac' ? '(AC)' : '(Non-AC)'}
                  </h3>
                  <div style={styles.roomNumber}>#{room.roomNumber}</div>
                </div>

                <p style={styles.roomDescription}>
                  {room.description || 'No description available'}
                </p>

                <div style={styles.roomSpecs}>
                  <div style={styles.specItem}>
                    <FaBed style={styles.specIcon} />
                    <span>{room.bedConfiguration || 'N/A'}</span>
                  </div>
                  <div style={styles.specItem}>
                    <FaUsers style={styles.specIcon} />
                    <span>Max {room.maxGuests || 1}</span>
                  </div>
                  <div style={styles.specItem}>
                    <span style={styles.roomSize}>{room.size || 'N/A'}</span>
                  </div>
                </div>

                {room.rating && (
                  <div style={styles.roomRating}>
                    <FaStar style={styles.ratingIcon} />
                    <span style={styles.ratingText}>
                      {room.rating.average.toFixed(1)} ({room.rating.count} reviews)
                    </span>
                  </div>
                )}

                <div style={styles.priceInfo}>
                  <span style={styles.currentPrice}>₹{(room.price || 0).toLocaleString()}</span>
                  {room.originalPrice > room.price && (
                    <span style={styles.originalPrice}>₹{(room.originalPrice || 0).toLocaleString()}</span>
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
          ))
        ) : (
          <div style={styles.noResults}>
            <h3>No rooms found</h3>
            <p>Try adjusting your search or filter criteria.</p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                style={styles.clearSearchBtn}
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal for View/Edit/Add */}
      {showModal && renderFormModal()}

      {/* Inject CSS animations */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
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