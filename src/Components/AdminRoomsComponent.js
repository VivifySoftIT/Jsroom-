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
  FaTimes,
  FaImage,
  FaSave,
  FaUpload,
  FaSpinner,
  FaExclamationTriangle
} from 'react-icons/fa';
import dataService from '../services/dataService';

const AdminRoomsComponent = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [formData, setFormData] = useState({
    roomNumber: '',
    categoryId: '',
    description: '',
    price: '',
    size: '',
    maxGuests: 1,
    bedConfiguration: '',
    floor: '',
    acType: 'AC',
    status: 'Available'
  });
  const [imagePreview, setImagePreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [error, setError] = useState('');

  // Load data from localStorage only
  useEffect(() => {
    loadRoomsAndCategories();
  }, []);

  const loadRoomsAndCategories = () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('📦 Loading data from localStorage');
      const localRooms = dataService.getRooms();
      const localCategories = dataService.getCategories();
      
      setRooms(localRooms);
      setFilteredRooms(localRooms);
      setCategories(localCategories);
      
      console.log('✅ Loaded data successfully:', {
        rooms: localRooms.length,
        categories: localCategories.length
      });
      
    } catch (err) {
      setError('Failed to load data from localStorage.');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSetPrimaryImage = (index) => {
    const newImages = [...imagePreview];
    
    // Reset all images to not primary
    newImages.forEach(img => img.isPrimary = false);
    
    // Set selected image as primary
    newImages[index].isPrimary = true;
    
    setImagePreview(newImages);
  };

  // Filter rooms based on search and filters
  useEffect(() => {
    let filtered = rooms;

    if (searchTerm) {
      filtered = filtered.filter(room =>
        room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(room => room.category === categoryFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(room => room.status.toLowerCase() === statusFilter.toLowerCase());
    }

    setFilteredRooms(filtered);
  }, [rooms, searchTerm, categoryFilter, statusFilter]);

  // Handle room operations
  const handleViewRoom = (room) => {
    // Find the category name from categoryId
    const category = categories.find(cat => cat.categoryId === room.categoryId);
    const roomWithCategory = {
      ...room,
      category: category ? category.categoryName : 'Unknown Category'
    };
    setSelectedRoom(roomWithCategory);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEditRoom = (room) => {
    // Find the category name from categoryId
    const category = categories.find(cat => cat.categoryId === room.categoryId);
    const roomWithCategory = {
      ...room,
      category: category ? category.categoryName : 'Unknown Category'
    };
    setSelectedRoom(roomWithCategory);
    setFormData({
      roomNumber: room.roomNumber,
      categoryId: room.categoryId,
      description: room.description,
      price: room.price,
      size: room.size,
      maxGuests: room.maxGuests,
      bedConfiguration: room.bedConfiguration,
      floor: room.floor,
      acType: room.acType,
      status: room.status
    });
    setImagePreview(room.images || []);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAddRoom = () => {
    setSelectedRoom(null);
    setFormData({
      roomNumber: '',
      categoryId: '',
      description: '',
      price: '',
      size: '',
      maxGuests: 1,
      bedConfiguration: '',
      floor: '',
      acType: 'ac',
      status: 'available'
    });
    setImagePreview([]);
    setModalMode('add');
    setShowModal(true);
  };

  const handleDeleteRoom = (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        dataService.deleteRoom(roomId);
        console.log('✅ Room deleted from localStorage');
        
        // Reload data
        loadRoomsAndCategories();
      } catch (error) {
        console.error('Delete room error:', error);
        setError('Failed to delete room');
      }
    }
  };

  const handleSaveRoom = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Convert image previews to base64 for localStorage storage
      const processedImages = [];
      
      for (const image of imagePreview) {
        if (image.file) {
          // Convert File object to base64
          const base64 = await convertToBase64(image.file);
          processedImages.push({
            url: base64,
            alt: image.alt,
            isPrimary: image.isPrimary
          });
        } else if (image.url.startsWith('blob:')) {
          // Handle blob URLs (convert to base64)
          const base64 = await blobToBase64(image.url);
          processedImages.push({
            url: base64,
            alt: image.alt,
            isPrimary: image.isPrimary
          });
        } else {
          // Already a base64 or URL string
          processedImages.push(image);
        }
      }
      
      const roomData = {
        ...formData,
        price: parseFloat(formData.price),
        maxGuests: parseInt(formData.maxGuests),
        floor: parseInt(formData.floor),
        images: processedImages, // Store all images
        amenities: ['Free WiFi', 'Smart TV', 'Mini Fridge', 'Room Service', formData.acType === 'ac' ? 'AC' : 'Fan', 'Coffee Machine'],
        rating: { average: 4.5, count: 0 },
        popular: false,
        view: 'City View',
        originalPrice: parseFloat(formData.price) + 50,
        lastCleaned: new Date().toISOString().split('T')[0],
        lastMaintenance: new Date().toISOString().split('T')[0],
        // Add category name for display purposes
        category: categories.find(cat => cat.categoryId === formData.categoryId)?.categoryName || 'Unknown Category'
      };

      if (modalMode === 'add') {
        dataService.addRoom(roomData);
        console.log('✅ Room created in localStorage with', processedImages.length, 'images');
      } else if (modalMode === 'edit') {
        dataService.updateRoom(selectedRoom.id, roomData);
        console.log('✅ Room updated in localStorage with', processedImages.length, 'images');
      }

      // Clean up blob URLs
      imagePreview.forEach(img => {
        if (img.url.startsWith('blob:')) {
          URL.revokeObjectURL(img.url);
        }
      });

      // Reload data and close modal
      loadRoomsAndCategories();
      setShowModal(false);
      setSelectedRoom(null);
      setImagePreview([]);
    } catch (error) {
      console.error('Save room error:', error);
      setError('Failed to save room: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert File to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Helper function to convert blob URL to base64
  const blobToBase64 = (blobUrl) => {
    return new Promise((resolve, reject) => {
      fetch(blobUrl)
        .then(res => res.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        })
        .catch(reject);
    });
  };

  const handleRemoveImage = (index) => {
    // Revoke blob URL if it exists
    if (imagePreview[index].url.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview[index].url);
    }
    
    const newImages = [...imagePreview];
    newImages.splice(index, 1);
    
    // If we removed the primary image and there are other images, make the first one primary
    if (imagePreview[index].isPrimary && newImages.length > 0) {
      newImages[0].isPrimary = true;
    }
    
    setImagePreview(newImages);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadingImages(true);
    
    try {
      const newImages = [];
      
      files.forEach((file, index) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          console.warn(`File ${file.name} is not an image`);
          return;
        }
        
        // Create object URL for preview
        const imageUrl = URL.createObjectURL(file);
        
        newImages.push({
          url: imageUrl,
          file: file, // Store the actual file object
          alt: `Room Image ${imagePreview.length + index + 1}`,
          isPrimary: imagePreview.length === 0 && index === 0 // First image is primary
        });
      });
      
      setImagePreview([...imagePreview, ...newImages]);
    } catch (error) {
      console.error('Image upload error:', error);
      setError('Failed to upload images');
    } finally {
      setUploadingImages(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
    setError('');
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available': return '#10B981';
      case 'occupied': return '#EF4444';
      case 'maintenance': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <FaSpinner style={styles.spinner} />
        <p>Loading rooms...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Controls */}
      <div style={styles.controlsSection}>
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
        
        <div style={styles.filtersGroup}>
          <div style={styles.filterContainer}>
            <FaFilter style={styles.filterIcon} />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.categoryId} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.filterContainer}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div style={styles.roomsGrid}>
        {filteredRooms.length > 0 ? (
          filteredRooms.map(room => {
            // Find the category name from categoryId
            const category = categories.find(cat => cat.categoryId === room.categoryId);
            const categoryName = category ? category.categoryName : 'Unknown Category';
            
            return (
              <div key={room.id} style={styles.roomCard}>
                <div style={styles.roomImage}>
                  <div style={styles.imageCarousel}>
                    <img 
                      src={room.images?.[0]?.url || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80'} 
                      alt={room.images?.[0]?.alt || 'Room'} 
                      style={styles.image}
                    />
                    {room.images && room.images.length > 1 && (
                      <div style={styles.imageCountBadge}>
                        <FaImage style={styles.imageCountIcon} />
                        +{room.images.length - 1}
                      </div>
                    )}
                  </div>
                  <div style={{
                    ...styles.statusBadge,
                    backgroundColor: getStatusColor(room.status)
                  }}>
                    {room.status}
                  </div>
                </div>

                <div style={styles.roomContent}>
                  <div style={styles.roomHeader}>
                    <h3 style={styles.roomTitle}>Room #{room.roomNumber}</h3>
                    <div style={styles.roomPrice}>₹{room.price}</div>
                  </div>

                  <div style={styles.roomDetails}>
                    <div style={styles.roomInfo}>
                      <FaBed style={styles.infoIcon} />
                      <span>{categoryName} {room.acType === 'ac' ? 'AC' : 'Non-AC'}</span>
                    </div>
                    <div style={styles.roomInfo}>
                      <FaUsers style={styles.infoIcon} />
                      <span>{room.maxGuests} Guest{room.maxGuests > 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  <p style={styles.roomDescription}>
                    {room.description.length > 100 
                      ? `${room.description.substring(0, 100)}...` 
                      : room.description
                    }
                  </p>

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
            );
          })
        ) : (
          <div style={styles.noResults}>
            <h3>No rooms found</h3>
            <p>No rooms match your search criteria.</p>
          </div>
        )}
      </div>

      {/* Room Modal */}
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
              {modalMode === 'view' ? (
                // View Mode
                <div style={styles.viewContent}>
                  <div style={styles.viewImageContainer}>
                    <div style={styles.imageGallery}>
                      {selectedRoom?.images?.map((image, index) => (
                        <div key={index} style={styles.galleryImageContainer}>
                          <img 
                            src={image.url} 
                            alt={image.alt} 
                            style={{
                              ...styles.viewImage,
                              border: image.isPrimary ? '3px solid #D4AF37' : 'none'
                            }} 
                          />
                          {image.isPrimary && (
                            <div style={styles.primaryIndicator}>Primary Image</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div style={styles.viewDetails}>
                    <div style={styles.detailsGrid}>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>Room Number:</span>
                        <span style={styles.detailValue}>{selectedRoom?.roomNumber}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>Category:</span>
                        <span style={styles.detailValue}>{selectedRoom?.category}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>AC Type:</span>
                        <span style={styles.detailValue}>{selectedRoom?.acType === 'ac' ? 'AC' : 'Non-AC'}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>Price:</span>
                        <span style={styles.detailValue}>₹{selectedRoom?.price}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>Max Guests:</span>
                        <span style={styles.detailValue}>{selectedRoom?.maxGuests}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>Size:</span>
                        <span style={styles.detailValue}>{selectedRoom?.size}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>Floor:</span>
                        <span style={styles.detailValue}>{selectedRoom?.floor}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>Status:</span>
                        <span style={{
                          ...styles.detailValue,
                          color: getStatusColor(selectedRoom?.status)
                        }}>
                          {selectedRoom?.status}
                        </span>
                      </div>
                    </div>
                    
                    <div style={styles.descriptionSection}>
                      <h4 style={styles.sectionTitle}>Description</h4>
                      <p style={styles.description}>{selectedRoom?.description}</p>
                    </div>
                  </div>
                </div>
              ) : (
                // Add/Edit Mode
                <div style={styles.formContent}>
                  <div style={styles.formGrid}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Room Number</label>
                      <input
                        type="text"
                        value={formData.roomNumber}
                        onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                        style={styles.input}
                        placeholder="e.g., 101"
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Category</label>
                      <select
                        value={formData.categoryId}
                        onChange={(e) => setFormData({...formData, categoryId: parseInt(e.target.value)})}
                        style={styles.select}
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category.categoryId} value={category.categoryId}>
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>AC Type</label>
                      <select
                        value={formData.acType}
                        onChange={(e) => setFormData({...formData, acType: e.target.value})}
                        style={styles.select}
                      >
                        <option value="ac">AC</option>
                        <option value="non-ac">Non-AC</option>
                      </select>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Price (₹)</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        style={styles.input}
                        placeholder="e.g., 299"
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Max Guests</label>
                      <input
                        type="number"
                        value={formData.maxGuests}
                        onChange={(e) => setFormData({...formData, maxGuests: parseInt(e.target.value)})}
                        style={styles.input}
                        min="1"
                        max="10"
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Size</label>
                      <input
                        type="text"
                        value={formData.size}
                        onChange={(e) => setFormData({...formData, size: e.target.value})}
                        style={styles.input}
                        placeholder="e.g., 25 m²"
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Floor</label>
                      <input
                        type="number"
                        value={formData.floor}
                        onChange={(e) => setFormData({...formData, floor: e.target.value})}
                        style={styles.input}
                        min="1"
                        placeholder="e.g., 1"
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        style={styles.select}
                      >
                        <option value="available">Available</option>
                        <option value="occupied">Occupied</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Bed Configuration</label>
                    <input
                      type="text"
                      value={formData.bedConfiguration}
                      onChange={(e) => setFormData({...formData, bedConfiguration: e.target.value})}
                      style={styles.input}
                      placeholder="e.g., 1 Single Bed"
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      style={styles.textarea}
                      rows="4"
                      placeholder="Room description..."
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Room Images</label>
                    <div style={styles.imageUploadContainer}>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={styles.fileInput}
                        id="imageUpload"
                      />
                      <label htmlFor="imageUpload" style={styles.uploadBtn}>
                        <FaUpload style={styles.btnIcon} />
                        {uploadingImages ? 'Uploading...' : 'Upload Images'}
                      </label>
                    </div>
                    
                    {imagePreview.length > 0 && (
                      <div style={styles.imagePreviewContainer}>
                        {imagePreview.map((image, index) => (
                          <div key={index} style={styles.imagePreviewItem}>
                            <img 
                              src={image.url} 
                              alt={image.alt} 
                              style={{
                                ...styles.previewImage,
                                border: image.isPrimary ? '2px solid #D4AF37' : '1px solid #ddd'
                              }} 
                            />
                            <div style={styles.imageOverlay}>
                              {image.isPrimary && (
                                <span style={styles.primaryBadge}>Primary</span>
                              )}
                              <button 
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                style={styles.removeImageBtn}
                              >
                                <FaTimes />
                              </button>
                            </div>
                            <button 
                              type="button"
                              onClick={() => handleSetPrimaryImage(index)}
                              style={styles.setPrimaryBtn}
                              disabled={image.isPrimary}
                            >
                              Set as Primary
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div style={styles.modalFooter}>
              <button onClick={closeModal} style={styles.cancelBtn}>
                Cancel
              </button>
              {modalMode !== 'view' && (
                <button 
                  onClick={handleSaveRoom} 
                  style={styles.saveBtn}
                  disabled={loading}
                >
                  <FaSave style={styles.btnIcon} />
                  {loading ? 'Saving...' : 'Save Room'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    color: '#666',
  },
  spinner: {
    fontSize: '24px',
    animation: 'spin 1s linear infinite',
    marginBottom: '10px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: '#D4AF37',
    border: 'none',
    color: '#1a1a1a',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
  errorMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: '#FEE2E2',
    border: '1px solid #FECACA',
    borderRadius: '6px',
    color: '#DC2626',
    marginBottom: '20px',
  },
  errorIcon: {
    fontSize: '16px',
  },
  controlsSection: {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '3rem',
    flexWrap: 'wrap',
  },

  searchContainer: {
    position: 'relative',
    flex: '1',
    maxWidth: '400px',
    minWidth: '300px',
  },

  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#D4AF37',
    fontSize: '16px',
  },

  searchInput: {
    width: '100%',
    padding: '14px 20px 14px 48px',
    border: '2px solid #E5E5E5',
    borderRadius: '10px',
    fontSize: '14px',
    backgroundColor: 'white',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },

  filtersGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: '0 0 auto',
  },

  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  filterIcon: {
    color: '#D4AF37',
    fontSize: '16px',
  },

  filterSelect: {
    padding: '14px 16px',
    border: '2px solid #E5E5E5',
    borderRadius: '10px',
    fontSize: '14px',
    backgroundColor: 'white',
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    minWidth: '160px',
  },
  roomsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px',
  },
  roomCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  },
  roomImage: {
    position: 'relative',
    height: '200px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  statusBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '5px 10px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: '500',
    color: 'white',
    textTransform: 'capitalize',
  },
  roomContent: {
    padding: '20px',
  },
  roomHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  roomTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  roomPrice: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#D4AF37',
  },
  roomDetails: {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px',
  },
  roomInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '14px',
    color: '#666',
  },
  infoIcon: {
    color: '#D4AF37',
  },
  roomDescription: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
    marginBottom: '20px',
  },
  roomActions: {
    display: 'flex',
    gap: '10px',
  },
  viewBtn: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #ddd',
    color: '#666',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
  },
  editBtn: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#D4AF37',
    border: 'none',
    color: '#1a1a1a',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
  },
  deleteBtn: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#EF4444',
    border: 'none',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
  },
  btnIcon: {
    fontSize: '12px',
  },
  noResults: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '40px',
    color: '#666',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '10px',
    maxWidth: '800px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  modalHeader: {
    padding: '20px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '600',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#666',
  },
  modalBody: {
    padding: '20px',
  },
  viewContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  viewImageContainer: {
    width: '100%',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  viewImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  viewDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '6px',
  },
  detailLabel: {
    color: '#666',
    fontSize: '14px',
  },
  detailValue: {
    fontSize: '14px',
    fontWeight: '500',
  },
  descriptionSection: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: '600',
  },
  description: {
    margin: 0,
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#666',
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
  },
  select: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    resize: 'vertical',
  },
  imageUploadContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  fileInput: {
    display: 'none',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 15px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #ddd',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  imagePreviewContainer: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
    flexWrap: 'wrap',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  modalFooter: {
    padding: '20px',
    borderTop: '1px solid #eee',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  cancelBtn: {
    padding: '10px 20px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  saveBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#D4AF37',
    border: 'none',
    color: '#1a1a1a',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },

  // Image carousel styles
  imageCarousel: {
    position: 'relative',
    width: '100%',
    height: '100%',
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
  },
  imageCountIcon: {
    fontSize: '10px',
  },
  imagePreviewItem: {
    position: 'relative',
    width: '100px',
    height: '100px',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  primaryBadge: {
    backgroundColor: '#D4AF37',
    color: '#1a1a1a',
    padding: '2px 6px',
    borderRadius: '10px',
    fontSize: '10px',
    fontWeight: '500',
  },
  removeImageBtn: {
    background: 'rgba(255,255,255,0.8)',
    border: 'none',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '10px',
  },
  setPrimaryBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(212, 175, 55, 0.9)',
    color: '#1a1a1a',
    border: 'none',
    padding: '5px',
    fontSize: '10px',
    cursor: 'pointer',
  },
  imageGallery: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  galleryImageContainer: {
    flex: '1',
    minWidth: '200px',
    maxWidth: '300px',
    position: 'relative',
  },
  primaryIndicator: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: '#D4AF37',
    color: '#1a1a1a',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
  },
};

// Add CSS animation for spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default AdminRoomsComponent;