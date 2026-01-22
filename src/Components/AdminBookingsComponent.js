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
  FaPhone,
  FaEnvelope,
  FaTimes,
  FaCheck,
  FaTrash,
  FaDownload,
  FaPrint
} from 'react-icons/fa';

const AdminBookingsComponent = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock comprehensive booking data
  useEffect(() => {
    const mockBookings = [
      {
        id: 1,
        bookingNumber: 'JSR001',
        guestName: 'John Smith',
        guestEmail: 'john.smith@email.com',
        guestPhone: '+91 98765 43210',
        guestAddress: '123 MG Road, Bangalore, Karnataka 560001',
        roomName: 'Single AC Room',
        roomNumber: '101',
        checkIn: '2024-01-22',
        checkOut: '2024-01-25',
        guests: 2,
        nights: 3,
        status: 'confirmed',
        amount: 1797,
        paymentStatus: 'paid',
        paymentType: 'full', // 'full' or 'advance'
        advanceAmount: 0,
        remainingAmount: 0,
        paymentMethod: 'Credit Card',
        specialRequests: 'Late check-in requested, extra pillows',
        createdAt: '2024-01-20',
        bookingSource: 'Website',
        totalServices: 2,
        services: [
          { name: 'Airport Transfer', amount: 500 },
          { name: 'Spa Package', amount: 1200 }
        ],
        guestHistory: {
          totalBookings: 3,
          totalSpent: 4500,
          loyaltyTier: 'Gold',
          lastVisit: '2023-12-15'
        }
      },
      {
        id: 2,
        bookingNumber: 'JSR002',
        guestName: 'Sarah Johnson',
        guestEmail: 'sarah.j@email.com',
        guestPhone: '+91 98765 43211',
        guestAddress: '456 Brigade Road, Bangalore, Karnataka 560025',
        roomName: 'Double AC Room',
        roomNumber: '205',
        checkIn: '2024-01-21',
        checkOut: '2024-01-23',
        guests: 1,
        nights: 2,
        status: 'checked-in',
        amount: 598,
        paymentStatus: 'advance-paid',
        paymentType: 'advance',
        advanceAmount: 179, // 30% of 598
        remainingAmount: 419,
        paymentMethod: 'UPI',
        specialRequests: 'Extra towels, room service breakfast',
        createdAt: '2024-01-19',
        bookingSource: 'Phone',
        totalServices: 1,
        services: [
          { name: 'Room Service', amount: 800 }
        ],
        guestHistory: {
          totalBookings: 1,
          totalSpent: 598,
          loyaltyTier: 'Silver',
          lastVisit: 'Current'
        }
      },
      {
        id: 3,
        bookingNumber: 'JSR003',
        guestName: 'Mike Wilson',
        guestEmail: 'mike.w@email.com',
        guestPhone: '+91 98765 43212',
        guestAddress: '789 Commercial Street, Bangalore, Karnataka 560001',
        roomName: 'Triple Non-AC Room',
        roomNumber: '302',
        checkIn: '2024-01-20',
        checkOut: '2024-01-22',
        guests: 2,
        nights: 2,
        status: 'checked-out',
        amount: 398,
        paymentStatus: 'paid',
        paymentType: 'full',
        advanceAmount: 0,
        remainingAmount: 0,
        paymentMethod: 'Cash',
        specialRequests: 'None',
        createdAt: '2024-01-18',
        bookingSource: 'Walk-in',
        totalServices: 0,
        services: [],
        guestHistory: {
          totalBookings: 2,
          totalSpent: 1200,
          loyaltyTier: 'Bronze',
          lastVisit: '2024-01-22'
        }
      },
      {
        id: 4,
        bookingNumber: 'JSR004',
        guestName: 'Emily Davis',
        guestEmail: 'emily.d@email.com',
        guestPhone: '+91 98765 43213',
        guestAddress: '321 Koramangala, Bangalore, Karnataka 560034',
        roomName: 'Double Non-AC Room',
        roomNumber: '150',
        checkIn: '2024-01-25',
        checkOut: '2024-01-28',
        guests: 4,
        nights: 3,
        status: 'pending',
        amount: 747,
        paymentStatus: 'advance-paid',
        paymentType: 'advance',
        advanceAmount: 224, // 30% of 747
        remainingAmount: 523,
        paymentMethod: 'Bank Transfer',
        specialRequests: 'Baby crib needed, connecting rooms if available',
        createdAt: '2024-01-21',
        bookingSource: 'Website',
        totalServices: 1,
        services: [
          { name: 'Baby Care Package', amount: 300 }
        ],
        guestHistory: {
          totalBookings: 1,
          totalSpent: 0,
          loyaltyTier: 'Bronze',
          lastVisit: 'Upcoming'
        }
      }
    ];
    
    setBookings(mockBookings);
    setFilteredBookings(mockBookings);
  }, []);

  // Filter bookings
  useEffect(() => {
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guestPhone.includes(searchTerm)
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
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const handleDeleteBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
    }
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
              placeholder="Search bookings, guests, rooms..."
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
        <div style={styles.headerRight}>
          <button style={styles.exportBtn}>
            <FaDownload style={styles.btnIcon} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div style={styles.statsRow}>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>{bookings.length}</span>
          <span style={styles.statLabel}>Total</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>{bookings.filter(b => b.status === 'confirmed').length}</span>
          <span style={styles.statLabel}>Confirmed</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>{bookings.filter(b => b.status === 'checked-in').length}</span>
          <span style={styles.statLabel}>Checked In</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>{bookings.filter(b => b.status === 'pending').length}</span>
          <span style={styles.statLabel}>Pending</span>
        </div>
      </div>

      {/* Bookings Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Booking Details</th>
              <th style={styles.th}>Guest Information</th>
              <th style={styles.th}>Room & Dates</th>
              <th style={styles.th}>Status & Payment</th>
              <th style={styles.th}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(booking => {
              const StatusIcon = getStatusIcon(booking.status);
              return (
                <tr key={booking.id} style={styles.tableRow}>
                  <td style={styles.td}>
                    <div style={styles.bookingDetails}>
                      <div style={styles.bookingNumber}>{booking.bookingNumber}</div>
                      <div style={styles.bookingDate}>Created: {booking.createdAt}</div>
                      <div style={styles.bookingSource}>Source: {booking.bookingSource}</div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.guestInfo}>
                      <div style={styles.guestName}>{booking.guestName}</div>
                      <div style={styles.guestContact}>
                        <FaEnvelope style={styles.contactIcon} />
                        {booking.guestEmail}
                      </div>
                      <div style={styles.guestContact}>
                        <FaPhone style={styles.contactIcon} />
                        {booking.guestPhone}
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.roomInfo}>
                      <div style={styles.roomName}>{booking.roomName}</div>
                      <div style={styles.roomNumber}>Room {booking.roomNumber}</div>
                      <div style={styles.dateInfo}>
                        <div>{booking.checkIn} → {booking.checkOut}</div>
                        <div style={styles.nights}>({booking.nights} nights, {booking.guests} guests)</div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.statusInfo}>
                      <div style={{
                        ...styles.statusBadge,
                        backgroundColor: `${getStatusColor(booking.status)}20`,
                        color: getStatusColor(booking.status)
                      }}>
                        <StatusIcon style={styles.statusIcon} />
                        {booking.status}
                      </div>
                      <div style={styles.paymentInfo}>
                        <div style={styles.paymentStatus}>
                          {booking.paymentStatus === 'advance-paid' 
                            ? 'Payment: Advance Paid' 
                            : booking.paymentStatus === 'paid' 
                            ? 'Payment: Fully Paid'
                            : 'Payment: Pending'
                          }
                        </div>
                        {booking.paymentStatus === 'advance-paid' && (
                          <div style={styles.remainingPayment}>
                            Remaining: ₹{booking.remainingAmount}
                          </div>
                        )}
                        <div style={styles.paymentMethod}>{booking.paymentMethod}</div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.amountInfo}>
                      <div style={styles.amount}>₹{booking.amount}</div>
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

      {/* Detailed Booking Modal */}
      {showModal && selectedBooking && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Complete Booking Details</h2>
              <div style={styles.modalHeaderActions}>
                <button style={styles.printBtn}>
                  <FaPrint />
                </button>
                <button onClick={closeModal} style={styles.closeBtn}>
                  <FaTimes />
                </button>
              </div>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.detailsGrid}>
                {/* Booking Information */}
                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>
                    <FaCalendarAlt style={styles.sectionIcon} />
                    Booking Information
                  </h3>
                  <div style={styles.detailsList}>
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
                      <span style={styles.detailLabel}>Created:</span>
                      <span style={styles.detailValue}>{selectedBooking.createdAt}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>Source:</span>
                      <span style={styles.detailValue}>{selectedBooking.bookingSource}</span>
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
                      <span style={styles.detailLabel}>Duration:</span>
                      <span style={styles.detailValue}>{selectedBooking.nights} nights</span>
                    </div>
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>Guests:</span>
                      <span style={styles.detailValue}>{selectedBooking.guests}</span>
                    </div>
                  </div>
                </div>

                {/* Guest Information */}
                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>
                    <FaUser style={styles.sectionIcon} />
                    Guest Information
                  </h3>
                  <div style={styles.detailsList}>
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
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>Address:</span>
                      <span style={styles.detailValue}>{selectedBooking.guestAddress}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>Loyalty Tier:</span>
                      <span style={styles.detailValue}>{selectedBooking.guestHistory.loyaltyTier}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>Total Bookings:</span>
                      <span style={styles.detailValue}>{selectedBooking.guestHistory.totalBookings}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>Total Spent:</span>
                      <span style={styles.detailValue}>₹{selectedBooking.guestHistory.totalSpent}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>Last Visit:</span>
                      <span style={styles.detailValue}>{selectedBooking.guestHistory.lastVisit}</span>
                    </div>
                  </div>
                </div>

                {/* Room Information */}
                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>
                    <FaBed style={styles.sectionIcon} />
                    Room Information
                  </h3>
                  <div style={styles.detailsList}>
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>Room Type:</span>
                      <span style={styles.detailValue}>{selectedBooking.roomName}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>Room Number:</span>
                      <span style={styles.detailValue}>{selectedBooking.roomNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>
                    <FaCheckCircle style={styles.sectionIcon} />
                    Payment Information
                  </h3>
                  <div style={styles.detailsList}>
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>Room Amount:</span>
                      <span style={styles.detailValue}>₹{selectedBooking.amount}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>Payment Status:</span>
                      <span style={styles.detailValue}>
                        {selectedBooking.paymentStatus === 'advance-paid' 
                          ? 'Advance Paid' 
                          : selectedBooking.paymentStatus === 'paid' 
                          ? 'Fully Paid'
                          : 'Pending'
                        }
                      </span>
                    </div>
                    {selectedBooking.paymentStatus === 'advance-paid' && (
                      <>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Advance Paid:</span>
                          <span style={styles.detailValue}>₹{selectedBooking.advanceAmount}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Remaining Amount:</span>
                          <span style={{...styles.detailValue, color: '#F59E0B'}}>₹{selectedBooking.remainingAmount}</span>
                        </div>
                      </>
                    )}
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>Payment Method:</span>
                      <span style={styles.detailValue}>{selectedBooking.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              {selectedBooking.services.length > 0 && (
                <div style={styles.servicesSection}>
                  <h3 style={styles.sectionTitle}>Additional Services</h3>
                  <div style={styles.servicesList}>
                    {selectedBooking.services.map((service, index) => (
                      <div key={index} style={styles.serviceItem}>
                        <span style={styles.serviceName}>{service.name}</span>
                        <span style={styles.serviceAmount}>₹{service.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
    width: '300px',
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

  exportBtn: {
    padding: '10px 16px',
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

  bookingDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },

  bookingNumber: {
    fontWeight: '600',
    color: '#D4AF37',
    fontSize: '16px',
  },

  bookingDate: {
    fontSize: '12px',
    color: '#666',
  },

  bookingSource: {
    fontSize: '12px',
    color: '#666',
    fontStyle: 'italic',
  },

  guestInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },

  guestName: {
    fontWeight: '600',
    fontSize: '15px',
  },

  guestContact: {
    fontSize: '12px',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },

  contactIcon: {
    fontSize: '10px',
    color: '#D4AF37',
  },

  loyaltyTier: {
    fontSize: '11px',
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: '500',
    alignSelf: 'flex-start',
  },

  roomInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },

  roomName: {
    fontWeight: '500',
    fontSize: '14px',
  },

  roomNumber: {
    fontSize: '12px',
    color: '#666',
  },

  dateInfo: {
    fontSize: '12px',
    color: '#666',
  },

  nights: {
    fontStyle: 'italic',
    marginTop: '2px',
  },

  statusInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
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
    alignSelf: 'flex-start',
  },

  statusIcon: {
    fontSize: '10px',
  },

  paymentInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },

  paymentStatus: {
    fontSize: '12px',
    color: '#666',
  },

  paymentMethod: {
    fontSize: '11px',
    color: '#999',
  },

  remainingPayment: {
    fontSize: '11px',
    color: '#F59E0B',
    fontWeight: '500',
  },

  amountInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },

  amount: {
    fontWeight: '600',
    color: '#1A1A1A',
    fontSize: '16px',
  },

  servicesCount: {
    fontSize: '11px',
    color: '#10B981',
    fontWeight: '500',
  },

  actionButtons: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
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

  deleteBtn: {
    borderColor: '#EF4444',
    color: '#EF4444',
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
    maxWidth: '1000px',
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

  modalHeaderActions: {
    display: 'flex',
    gap: '8px',
  },

  printBtn: {
    padding: '8px',
    background: 'transparent',
    border: '1px solid #E5E5E5',
    borderRadius: '4px',
    color: '#666',
    cursor: 'pointer',
    fontSize: '14px',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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

  servicesSection: {
    backgroundColor: '#F8F9FA',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '2rem',
  },

  servicesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  serviceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    backgroundColor: 'white',
    borderRadius: '4px',
  },

  serviceName: {
    fontSize: '14px',
    color: '#1A1A1A',
  },

  serviceAmount: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#10B981',
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
};

export default AdminBookingsComponent;