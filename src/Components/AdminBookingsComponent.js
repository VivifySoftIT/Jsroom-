import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaEye, 
  FaEdit, 
  FaCheckCircle, 
  FaClock, 
  FaExclamationTriangle,
  FaCalendarAlt,
  FaUser,
  FaBed,
  FaPhone,
  FaEnvelope,
  FaTimes,
  FaCheck,
  FaTrash,
  FaSpinner
} from 'react-icons/fa';
import dataService from '../services/dataService';

const AdminBookingsComponent = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load bookings from localStorage only
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('📦 Loading bookings from localStorage');
      const localBookings = dataService.getBookings();
      
      setBookings(localBookings);
      setFilteredBookings(localBookings);
      
      console.log('✅ Loaded bookings successfully:', {
        bookings: localBookings.length
      });
      
    } catch (err) {
      setError('Failed to load bookings from localStorage.');
      console.error('Error loading bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle operations - localStorage only
  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleDeleteBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        setLoading(true);
        
        dataService.deleteBooking(bookingId);
        console.log('✅ Booking deleted from localStorage');
        
        // Reload bookings
        loadBookings();
      } catch (error) {
        console.error('Delete booking error:', error);
        setError('Failed to delete booking');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateStatus = (bookingId, newStatus) => {
    try {
      setLoading(true);
      
      dataService.updateBooking(bookingId, { status: newStatus });
      console.log('✅ Booking status updated in localStorage');
      
      // Reload bookings
      loadBookings();
    } catch (error) {
      console.error('Update booking status error:', error);
      setError('Failed to update booking status');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
    setError('');
  };

  // Filter bookings based on search and status
  useEffect(() => {
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status.toLowerCase() === statusFilter.toLowerCase());
    }

    setFilteredBookings(filtered);
  }, [searchTerm, statusFilter, bookings]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'cancelled': return '#EF4444';
      case 'completed': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <FaCheckCircle />;
      case 'pending': return <FaClock />;
      case 'cancelled': return <FaTimes />;
      case 'completed': return <FaCheck />;
      default: return <FaClock />;
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <FaSpinner style={styles.spinner} />
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Booking Management</h1>
      </div>

      {/* Error Message */}
      {error && (
        <div style={styles.errorMessage}>
          <FaExclamationTriangle style={styles.errorIcon} />
          {error}
        </div>
      )}

      {/* Controls */}
      <div style={styles.controls}>
        <div style={styles.searchContainer}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        
        <div style={styles.filterContainer}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Bookings List */}
      <div style={styles.bookingsGrid}>
        {filteredBookings.length > 0 ? (
          filteredBookings.map(booking => (
            <div key={booking.id} style={styles.bookingCard}>
              <div style={styles.bookingHeader}>
                <div style={styles.bookingNumber}>#{booking.bookingNumber}</div>
                <div style={{
                  ...styles.statusBadge,
                  backgroundColor: getStatusColor(booking.status)
                }}>
                  {getStatusIcon(booking.status)}
                  <span style={styles.statusText}>{booking.status}</span>
                </div>
              </div>

              <div style={styles.bookingContent}>
                <div style={styles.guestInfo}>
                  <div style={styles.guestName}>
                    <FaUser style={styles.infoIcon} />
                    {booking.guestName}
                  </div>
                  <div style={styles.contactInfo}>
                    <FaEnvelope style={styles.infoIcon} />
                    {booking.guestEmail}
                  </div>
                  <div style={styles.contactInfo}>
                    <FaPhone style={styles.infoIcon} />
                    {booking.guestPhone}
                  </div>
                </div>

                <div style={styles.bookingDetails}>
                  <div style={styles.roomInfo}>
                    <FaBed style={styles.infoIcon} />
                    {booking.roomName} (#{booking.roomNumber})
                  </div>
                  <div style={styles.dateInfo}>
                    <FaCalendarAlt style={styles.infoIcon} />
                    {booking.checkIn} to {booking.checkOut} ({booking.nights} nights)
                  </div>
                  <div style={styles.amountInfo}>
                    ₹{booking.amount.toLocaleString()}
                  </div>
                </div>
              </div>

              <div style={styles.bookingActions}>
                <button 
                  onClick={() => handleViewBooking(booking)}
                  style={styles.viewBtn}
                >
                  <FaEye style={styles.btnIcon} />
                  View
                </button>
                <button 
                  onClick={() => handleUpdateStatus(booking.id, booking.status === 'confirmed' ? 'completed' : 'confirmed')}
                  style={styles.statusBtn}
                >
                  <FaEdit style={styles.btnIcon} />
                  {booking.status === 'confirmed' ? 'Complete' : 'Confirm'}
                </button>
                <button 
                  onClick={() => handleDeleteBooking(booking.id)}
                  style={styles.deleteBtn}
                >
                  <FaTrash style={styles.btnIcon} />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.noResults}>
            <h3>No bookings found</h3>
            <p>No bookings match your search criteria.</p>
          </div>
        )}
      </div>

      {/* View Booking Modal */}
      {showModal && selectedBooking && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                Booking #{selectedBooking.bookingNumber}
              </h2>
              <button onClick={closeModal} style={styles.closeBtn}>
                <FaTimes />
              </button>
            </div>
            
            <div style={styles.modalBody}>
              <div style={styles.detailsGrid}>
                <div style={styles.detailSection}>
                  <h4 style={styles.sectionTitle}>Guest Information</h4>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Name:</span>
                    <span style={styles.detailValue}>{selectedBooking.guestName}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Email:</span>
                    <span style={styles.detailValue}>{selectedBooking.guestEmail}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Phone:</span>
                    <span style={styles.detailValue}>{selectedBooking.guestPhone}</span>
                  </div>
                </div>

                <div style={styles.detailSection}>
                  <h4 style={styles.sectionTitle}>Booking Details</h4>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Room:</span>
                    <span style={styles.detailValue}>{selectedBooking.roomName}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Check-in:</span>
                    <span style={styles.detailValue}>{selectedBooking.checkIn}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Check-out:</span>
                    <span style={styles.detailValue}>{selectedBooking.checkOut}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Amount:</span>
                    <span style={styles.detailValue}>₹{selectedBooking.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button onClick={closeModal} style={styles.cancelBtn}>
                Close
              </button>
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
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '20px',
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
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  searchContainer: {
    position: 'relative',
    flex: '1',
    maxWidth: '400px',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#666',
  },
  searchInput: {
    width: '100%',
    padding: '10px 12px 10px 40px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  filterSelect: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    minWidth: '150px',
  },
  bookingsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '20px',
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  bookingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  bookingNumber: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '5px 10px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: '500',
    color: 'white',
  },
  statusText: {
    textTransform: 'capitalize',
  },
  bookingContent: {
    marginBottom: '15px',
  },
  guestInfo: {
    marginBottom: '15px',
  },
  guestName: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '5px',
  },
  contactInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#666',
    marginBottom: '3px',
  },
  infoIcon: {
    fontSize: '12px',
    color: '#D4AF37',
  },
  bookingDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  roomInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
  },
  dateInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#666',
  },
  amountInfo: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#D4AF37',
    marginTop: '5px',
  },
  bookingActions: {
    display: 'flex',
    gap: '8px',
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
    fontSize: '12px',
  },
  statusBtn: {
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
    fontSize: '12px',
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
    fontSize: '12px',
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
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
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
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  detailSection: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: '15px',
    fontSize: '16px',
    fontWeight: '600',
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  detailLabel: {
    color: '#666',
    fontSize: '14px',
  },
  detailValue: {
    fontSize: '14px',
    fontWeight: '500',
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
};

export default AdminBookingsComponent;