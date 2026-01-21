import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaEdit, 
  FaCheckCircle, 
  FaClock, 
  FaExclamationTriangle,
  FaCalendarAlt,
  FaUser,
  FaBed,
  FaDollarSign,
  FaPhone,
  FaEnvelope,
  FaTimes,
  FaCheck
} from 'react-icons/fa';

const AdminBookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data - Replace with actual API calls
  useEffect(() => {
    const mockBookings = [
      {
        id: 1,
        bookingNumber: 'JSR001',
        guestName: 'John Smith',
        guestEmail: 'john.smith@email.com',
        guestPhone: '+1 234 567 8900',
        roomName: 'Presidential Suite',
        roomNumber: '101',
        checkIn: '2024-01-22',
        checkOut: '2024-01-25',
        guests: 2,
        nights: 3,
        status: 'confirmed',
        amount: 1797,
        paymentStatus: 'paid',
        specialRequests: 'Late check-in requested',
        createdAt: '2024-01-20'
      },
      {
        id: 2,
        bookingNumber: 'JSR002',
        guestName: 'Sarah Johnson',
        guestEmail: 'sarah.j@email.com',
        guestPhone: '+1 234 567 8901',
        roomName: 'Deluxe Suite',
        roomNumber: '205',
        checkIn: '2024-01-21',
        checkOut: '2024-01-23',
        guests: 1,
        nights: 2,
        status: 'checked-in',
        amount: 598,
        paymentStatus: 'paid',
        specialRequests: 'Extra towels',
        createdAt: '2024-01-19'
      },
      {
        id: 3,
        bookingNumber: 'JSR003',
        guestName: 'Mike Wilson',
        guestEmail: 'mike.w@email.com',
        guestPhone: '+1 234 567 8902',
        roomName: 'Executive Room',
        roomNumber: '302',
        checkIn: '2024-01-20',
        checkOut: '2024-01-22',
        guests: 2,
        nights: 2,
        status: 'checked-out',
        amount: 398,
        paymentStatus: 'paid',
        specialRequests: 'None',
        createdAt: '2024-01-18'
      },
      {
        id: 4,
        bookingNumber: 'JSR004',
        guestName: 'Emily Davis',
        guestEmail: 'emily.d@email.com',
        guestPhone: '+1 234 567 8903',
        roomName: 'Family Room',
        roomNumber: '150',
        checkIn: '2024-01-25',
        checkOut: '2024-01-28',
        guests: 4,
        nights: 3,
        status: 'pending',
        amount: 747,
        paymentStatus: 'pending',
        specialRequests: 'Baby crib needed',
        createdAt: '2024-01-21'
      },
      {
        id: 5,
        bookingNumber: 'JSR005',
        guestName: 'Robert Brown',
        guestEmail: 'robert.b@email.com',
        guestPhone: '+1 234 567 8904',
        roomName: 'Standard Room',
        roomNumber: '220',
        checkIn: '2024-01-18',
        checkOut: '2024-01-20',
        guests: 1,
        nights: 2,
        status: 'cancelled',
        amount: 298,
        paymentStatus: 'refunded',
        specialRequests: 'None',
        createdAt: '2024-01-16'
      }
    ];
    
    setBookings(mockBookings);
    setFilteredBookings(mockBookings);
  }, []);

  // Filter bookings based on search and status
  useEffect(() => {
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.roomName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  }, [searchTerm, statusFilter, bookings]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#D4AF37';
      case 'checked-in': return '#10B981';
      case 'checked-out': return '#6B7280';
      case 'cancelled': return '#EF4444';
      case 'pending': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return FaCheckCircle;
      case 'checked-in': return FaClock;
      case 'checked-out': return FaCheckCircle;
      case 'cancelled': return FaExclamationTriangle;
      case 'pending': return FaClock;
      default: return FaClock;
    }
  };

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(prev => prev.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
    setSelectedBooking(prev => prev ? { ...prev, status: newStatus } : null);
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Booking Management</h1>
        <div style={styles.headerActions}>
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
            <FaFilter style={styles.filterIcon} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="checked-in">Checked In</option>
              <option value="checked-out">Checked Out</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{bookings.length}</div>
          <div style={styles.statLabel}>Total Bookings</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{bookings.filter(b => b.status === 'confirmed').length}</div>
          <div style={styles.statLabel}>Confirmed</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{bookings.filter(b => b.status === 'checked-in').length}</div>
          <div style={styles.statLabel}>Checked In</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{bookings.filter(b => b.status === 'pending').length}</div>
          <div style={styles.statLabel}>Pending</div>
        </div>
      </div>

      {/* Bookings Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Booking #</th>
              <th style={styles.th}>Guest</th>
              <th style={styles.th}>Room</th>
              <th style={styles.th}>Dates</th>
              <th style={styles.th}>Guests</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(booking => {
              const StatusIcon = getStatusIcon(booking.status);
              return (
                <tr key={booking.id} style={styles.tableRow}>
                  <td style={styles.td}>
                    <div style={styles.bookingNumber}>{booking.bookingNumber}</div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.guestInfo}>
                      <div style={styles.guestName}>{booking.guestName}</div>
                      <div style={styles.guestEmail}>{booking.guestEmail}</div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.roomInfo}>
                      <div style={styles.roomName}>{booking.roomName}</div>
                      <div style={styles.roomNumber}>Room {booking.roomNumber}</div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.dateInfo}>
                      <div>{booking.checkIn}</div>
                      <div style={styles.dateArrow}>→</div>
                      <div>{booking.checkOut}</div>
                      <div style={styles.nights}>({booking.nights} nights)</div>
                    </div>
                  </td>
                  <td style={styles.td}>{booking.guests}</td>
                  <td style={styles.td}>
                    <div style={{
                      ...styles.statusBadge,
                      backgroundColor: `${getStatusColor(booking.status)}20`,
                      color: getStatusColor(booking.status)
                    }}>
                      <StatusIcon style={styles.statusIcon} />
                      {booking.status}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.amount}>₹{booking.amount}</div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionButtons}>
                      <button 
                        onClick={() => handleViewBooking(booking)}
                        style={styles.actionBtn}
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button style={styles.actionBtn} title="Edit Booking">
                        <FaEdit />
                      </button>
                      {booking.status === 'confirmed' && (
                        <button 
                          onClick={() => handleStatusChange(booking.id, 'checked-in')}
                          style={{...styles.actionBtn, ...styles.checkInBtn}}
                          title="Check In"
                        >
                          <FaCheck />
                        </button>
                      )}
                      {booking.status === 'checked-in' && (
                        <button 
                          onClick={() => handleStatusChange(booking.id, 'checked-out')}
                          style={{...styles.actionBtn, ...styles.checkOutBtn}}
                          title="Check Out"
                        >
                          <FaCheckCircle />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredBookings.length === 0 && (
          <div style={styles.noResults}>
            <h3>No bookings found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Booking Details</h2>
              <button onClick={closeModal} style={styles.closeBtn}>
                <FaTimes />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.detailsGrid}>
                {/* Booking Info */}
                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>
                    <FaCalendarAlt style={styles.sectionIcon} />
                    Booking Information
                  </h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Booking Number:</span>
                    <span style={styles.detailValue}>{selectedBooking.bookingNumber}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Status:</span>
                    <div style={{
                      ...styles.statusBadge,
                      backgroundColor: `${getStatusColor(selectedBooking.status)}20`,
                      color: getStatusColor(selectedBooking.status)
                    }}>
                      {selectedBooking.status}
                    </div>
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
                    <span style={styles.detailLabel}>Nights:</span>
                    <span style={styles.detailValue}>{selectedBooking.nights}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Guests:</span>
                    <span style={styles.detailValue}>{selectedBooking.guests}</span>
                  </div>
                </div>

                {/* Guest Info */}
                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>
                    <FaUser style={styles.sectionIcon} />
                    Guest Information
                  </h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Name:</span>
                    <span style={styles.detailValue}>{selectedBooking.guestName}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Email:</span>
                    <span style={styles.detailValue}>
                      <FaEnvelope style={styles.contactIcon} />
                      {selectedBooking.guestEmail}
                    </span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Phone:</span>
                    <span style={styles.detailValue}>
                      <FaPhone style={styles.contactIcon} />
                      {selectedBooking.guestPhone}
                    </span>
                  </div>
                </div>

                {/* Room Info */}
                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>
                    <FaBed style={styles.sectionIcon} />
                    Room Information
                  </h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Room:</span>
                    <span style={styles.detailValue}>{selectedBooking.roomName}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Room Number:</span>
                    <span style={styles.detailValue}>{selectedBooking.roomNumber}</span>
                  </div>
                </div>

                {/* Payment Info */}
                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>
                    <FaDollarSign style={styles.sectionIcon} />
                    Payment Information
                  </h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Total Amount:</span>
                    <span style={styles.detailValue}>₹{selectedBooking.amount}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Payment Status:</span>
                    <span style={styles.detailValue}>{selectedBooking.paymentStatus}</span>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {selectedBooking.specialRequests && selectedBooking.specialRequests !== 'None' && (
                <div style={styles.specialRequests}>
                  <h3 style={styles.sectionTitle}>Special Requests</h3>
                  <p style={styles.requestText}>{selectedBooking.specialRequests}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div style={styles.modalActions}>
                {selectedBooking.status === 'confirmed' && (
                  <button 
                    onClick={() => handleStatusChange(selectedBooking.id, 'checked-in')}
                    style={styles.checkInModalBtn}
                  >
                    <FaCheck style={styles.btnIcon} />
                    Check In Guest
                  </button>
                )}
                {selectedBooking.status === 'checked-in' && (
                  <button 
                    onClick={() => handleStatusChange(selectedBooking.id, 'checked-out')}
                    style={styles.checkOutModalBtn}
                  >
                    <FaCheckCircle style={styles.btnIcon} />
                    Check Out Guest
                  </button>
                )}
                <button style={styles.editModalBtn}>
                  <FaEdit style={styles.btnIcon} />
                  Edit Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#F8F9FA',
    minHeight: '100vh',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },

  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1A1A1A',
    margin: 0,
  },

  headerActions: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
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

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },

  statCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #E5E5E5',
    textAlign: 'center',
  },

  statNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: '0.5rem',
  },

  statLabel: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '500',
  },

  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #E5E5E5',
    overflow: 'hidden',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },

  tableHeader: {
    backgroundColor: '#F8F9FA',
  },

  th: {
    padding: '1rem',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '1px solid #E5E5E5',
  },

  tableRow: {
    borderBottom: '1px solid #E5E5E5',
    transition: 'background-color 0.2s ease',
  },

  td: {
    padding: '1rem',
    fontSize: '14px',
    color: '#1A1A1A',
    verticalAlign: 'top',
  },

  bookingNumber: {
    fontWeight: '600',
    color: '#D4AF37',
  },

  guestInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },

  guestName: {
    fontWeight: '500',
  },

  guestEmail: {
    fontSize: '12px',
    color: '#666',
  },

  roomInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },

  roomName: {
    fontWeight: '500',
  },

  roomNumber: {
    fontSize: '12px',
    color: '#666',
  },

  dateInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    fontSize: '12px',
  },

  dateArrow: {
    color: '#666',
    textAlign: 'center',
  },

  nights: {
    color: '#666',
    fontStyle: 'italic',
  },

  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    textTransform: 'capitalize',
  },

  statusIcon: {
    fontSize: '10px',
  },

  amount: {
    fontWeight: '600',
    color: '#1A1A1A',
  },

  actionButtons: {
    display: 'flex',
    gap: '6px',
  },

  actionBtn: {
    padding: '6px 8px',
    background: 'transparent',
    border: '1px solid #E5E5E5',
    borderRadius: '4px',
    color: '#666',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'all 0.3s ease',
  },

  checkInBtn: {
    borderColor: '#10B981',
    color: '#10B981',
  },

  checkOutBtn: {
    borderColor: '#6B7280',
    color: '#6B7280',
  },

  noResults: {
    padding: '3rem',
    textAlign: 'center',
    color: '#666',
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
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  sectionIcon: {
    color: '#D4AF37',
    fontSize: '14px',
  },

  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
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
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },

  contactIcon: {
    fontSize: '12px',
    color: '#D4AF37',
  },

  specialRequests: {
    backgroundColor: '#F8F9FA',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '2rem',
  },

  requestText: {
    fontSize: '14px',
    color: '#1A1A1A',
    margin: 0,
    lineHeight: '1.5',
  },

  modalActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
    paddingTop: '1rem',
    borderTop: '1px solid #E5E5E5',
  },

  checkInModalBtn: {
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

  checkOutModalBtn: {
    padding: '10px 20px',
    backgroundColor: '#6B7280',
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

  btnIcon: {
    fontSize: '12px',
  },
};

export default AdminBookingsScreen;