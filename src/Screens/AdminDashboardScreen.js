import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaBed, 
  FaUsers, 
  FaCalendarAlt, 
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaEye,
  FaEdit,
  FaPlus,
  FaFilter
} from 'react-icons/fa';
import AdminBookingsComponent from '../Components/AdminBookingsComponent';
import AdminRoomsComponent from '../Components/AdminRoomsComponent';

const AdminDashboardScreen = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [adminUser, setAdminUser] = useState(null);
  const [statsFilter, setStatsFilter] = useState('today'); // today, week, month
  const navigate = useNavigate();

  useEffect(() => {
    // Check admin authentication
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (!token || !user) {
      navigate('/admin/login');
      return;
    }
    
    setAdminUser(JSON.parse(user));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  // Mock data - Replace with actual API calls
  const getDashboardStats = (filter) => {
    const baseStats = {
      today: {
        totalRooms: 24,
        availableRooms: 18,
        occupiedRooms: 6,
        totalBookings: 8,
        todayCheckIns: 8,
        todayCheckOuts: 5,
        totalRevenue: 15000,
        monthlyRevenue: 15000
      },
      week: {
        totalRooms: 24,
        availableRooms: 18,
        occupiedRooms: 6,
        totalBookings: 45,
        todayCheckIns: 45,
        todayCheckOuts: 38,
        totalRevenue: 85000,
        monthlyRevenue: 85000
      },
      month: {
        totalRooms: 24,
        availableRooms: 18,
        occupiedRooms: 6,
        totalBookings: 156,
        todayCheckIns: 156,
        todayCheckOuts: 142,
        totalRevenue: 325000,
        monthlyRevenue: 325000
      }
    };
    return baseStats[filter];
  };

  const dashboardStats = getDashboardStats(statsFilter);

  const recentBookings = [
    {
      id: 1,
      bookingNumber: 'JSR001',
      guestName: 'John Smith',
      roomName: 'Presidential Suite',
      checkIn: '2024-01-22',
      checkOut: '2024-01-25',
      status: 'confirmed',
      amount: 1797
    },
    {
      id: 2,
      bookingNumber: 'JSR002',
      guestName: 'Sarah Johnson',
      roomName: 'Deluxe Suite',
      checkIn: '2024-01-21',
      checkOut: '2024-01-23',
      status: 'checked-in',
      amount: 598
    },
    {
      id: 3,
      bookingNumber: 'JSR003',
      guestName: 'Mike Wilson',
      roomName: 'Executive Room',
      checkIn: '2024-01-20',
      checkOut: '2024-01-22',
      status: 'checked-out',
      amount: 398
    }
  ];

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: FaHome },
    { id: 'bookings', label: 'Bookings', icon: FaCalendarAlt },
    { id: 'rooms', label: 'Room Management', icon: FaBed },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#D4AF37';
      case 'checked-in': return '#10B981';
      case 'checked-out': return '#6B7280';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return FaCheckCircle;
      case 'checked-in': return FaClock;
      case 'checked-out': return FaCheckCircle;
      case 'cancelled': return FaExclamationTriangle;
      default: return FaClock;
    }
  };

  if (!adminUser) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={{
        ...styles.sidebar,
        transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
      }}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>JS</div>
            <div>
              <div style={styles.logoText}>JS ROOMS</div>
              <div style={styles.logoSubtext}>ADMIN PANEL</div>
            </div>
          </div>
        </div>

        <nav style={styles.sidebarNav}>
          {sidebarItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  ...styles.sidebarItem,
                  backgroundColor: activeTab === item.id ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                  color: activeTab === item.id ? '#D4AF37' : '#666'
                }}
              >
                <Icon style={styles.sidebarIcon} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.adminInfo}>
            <div style={styles.adminAvatar}>
              {adminUser.name.charAt(0)}
            </div>
            <div>
              <div style={styles.adminName}>{adminUser.name}</div>
              <div style={styles.adminRole}>Administrator</div>
            </div>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            <FaSignOutAlt />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={styles.menuBtn}
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <h1 style={styles.pageTitle}>
              {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>
          <div style={styles.headerRight}>
            <Link to="/home" style={styles.viewSiteBtn}>
              View Site
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <div style={styles.content}>
          {activeTab === 'overview' && (
            <>
              {/* Filter Section */}
              <div style={styles.filterSection}>
                <div style={styles.filterContainer}>
                  <FaFilter style={styles.filterIcon} />
                  <span style={styles.filterLabel}>Show stats for:</span>
                  <div style={styles.filterButtons}>
                    {['today', 'week', 'month'].map(filter => (
                      <button
                        key={filter}
                        onClick={() => setStatsFilter(filter)}
                        style={{
                          ...styles.filterBtn,
                          ...(statsFilter === filter ? styles.filterBtnActive : {})
                        }}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={styles.statIcon}>
                    <FaBed />
                  </div>
                  <div style={styles.statContent}>
                    <div style={styles.statNumber}>{dashboardStats.totalRooms}</div>
                    <div style={styles.statLabel}>Total Rooms</div>
                    <div style={styles.statSubtext}>
                      {dashboardStats.availableRooms} available
                    </div>
                  </div>
                </div>

                <div style={styles.statCard}>
                  <div style={styles.statIcon}>
                    <FaCalendarAlt />
                  </div>
                  <div style={styles.statContent}>
                    <div style={styles.statNumber}>{dashboardStats.totalBookings}</div>
                    <div style={styles.statLabel}>Total Bookings</div>
                    <div style={styles.statSubtext}>
                      {statsFilter === 'today' ? 'today' : `this ${statsFilter}`}
                    </div>
                  </div>
                </div>

                <div style={styles.statCard}>
                  <div style={styles.statIcon}>
                    <FaChartLine />
                  </div>
                  <div style={styles.statContent}>
                    <div style={styles.statNumber}>₹{dashboardStats.totalRevenue.toLocaleString()}</div>
                    <div style={styles.statLabel}>Total Revenue</div>
                    <div style={styles.statSubtext}>
                      {statsFilter === 'today' ? 'today' : `this ${statsFilter}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Bookings */}
              <div style={styles.section}>
                <div style={styles.sectionHeader}>
                  <h2 style={styles.sectionTitle}>Recent Bookings</h2>
                  <button 
                    onClick={() => setActiveTab('bookings')}
                    style={styles.viewAllBtn}
                  >
                    View All
                  </button>
                </div>
                
                <div style={styles.tableContainer}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHeader}>
                        <th style={styles.th}>Booking #</th>
                        <th style={styles.th}>Guest</th>
                        <th style={styles.th}>Room</th>
                        <th style={styles.th}>Check-in</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map(booking => {
                        const StatusIcon = getStatusIcon(booking.status);
                        return (
                          <tr key={booking.id} style={styles.tableRow}>
                            <td style={styles.td}>{booking.bookingNumber}</td>
                            <td style={styles.td}>{booking.guestName}</td>
                            <td style={styles.td}>{booking.roomName}</td>
                            <td style={styles.td}>{booking.checkIn}</td>
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
                            <td style={styles.td}>₹{booking.amount}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'bookings' && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>All Bookings</h2>
                <button style={styles.addBtn}>
                  <FaPlus style={styles.btnIcon} />
                  New Booking
                </button>
              </div>
              
              {/* Booking Management Component */}
              <AdminBookingsComponent />
            </div>
          )}

          {activeTab === 'rooms' && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Room Management</h2>
              </div>
              
              {/* Room Management Component */}
              <AdminRoomsComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#F8F9FA',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },

  sidebar: {
    width: '280px',
    backgroundColor: 'white',
    borderRight: '1px solid #E5E5E5',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    zIndex: 1000,
    transition: 'transform 0.3s ease',
  },

  sidebarHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #E5E5E5',
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  logoIcon: {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: '700',
    color: '#1A1A1A',
  },

  logoText: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: '1',
  },

  logoSubtext: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#D4AF37',
    letterSpacing: '1px',
    lineHeight: '1',
  },

  sidebarNav: {
    flex: 1,
    padding: '1rem 0',
  },

  sidebarItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 1.5rem',
    border: 'none',
    background: 'transparent',
    color: '#666',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    textAlign: 'left',
  },

  sidebarIcon: {
    fontSize: '16px',
  },

  sidebarFooter: {
    padding: '1.5rem',
    borderTop: '1px solid #E5E5E5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  adminInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  adminAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A1A1A',
  },

  adminName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A1A1A',
  },

  adminRole: {
    fontSize: '12px',
    color: '#666',
  },

  logoutBtn: {
    padding: '8px',
    background: 'transparent',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    fontSize: '16px',
  },

  mainContent: {
    flex: 1,
    marginLeft: '280px',
    display: 'flex',
    flexDirection: 'column',
  },

  header: {
    backgroundColor: 'white',
    padding: '1rem 2rem',
    borderBottom: '1px solid #E5E5E5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },

  menuBtn: {
    display: 'none',
    padding: '8px',
    background: 'transparent',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    fontSize: '18px',
  },

  pageTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: 0,
  },

  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },

  viewSiteBtn: {
    padding: '8px 16px',
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },

  content: {
    flex: 1,
    padding: '2rem',
    overflow: 'auto',
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },

  statCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #E5E5E5',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },

  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    color: '#1A1A1A',
  },

  statContent: {
    flex: 1,
  },

  statNumber: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: '1',
  },

  statLabel: {
    fontSize: '14px',
    color: '#666',
    marginTop: '4px',
  },

  statSubtext: {
    fontSize: '12px',
    color: '#D4AF37',
    marginTop: '2px',
  },

  section: {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #E5E5E5',
    overflow: 'hidden',
  },

  sectionHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #E5E5E5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: 0,
  },

  viewAllBtn: {
    padding: '8px 16px',
    background: 'transparent',
    color: '#D4AF37',
    border: '1px solid #D4AF37',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },

  addBtn: {
    padding: '8px 16px',
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
    fontFamily: 'inherit',
  },

  btnIcon: {
    fontSize: '12px',
  },

  tableContainer: {
    overflow: 'auto',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },

  tableHeader: {
    backgroundColor: '#F8F9FA',
  },

  th: {
    padding: '12px 1.5rem',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  tableRow: {
    borderBottom: '1px solid #E5E5E5',
  },

  td: {
    padding: '12px 1.5rem',
    fontSize: '14px',
    color: '#1A1A1A',
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

  actionButtons: {
    display: 'flex',
    gap: '8px',
  },

  actionBtn: {
    padding: '6px',
    background: 'transparent',
    border: '1px solid #E5E5E5',
    borderRadius: '4px',
    color: '#666',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'all 0.3s ease',
  },

  comingSoon: {
    padding: '3rem',
    textAlign: 'center',
    color: '#666',
  },

  // Filter Section
  filterSection: {
    backgroundColor: 'white',
    padding: '1rem 2rem',
    borderRadius: '12px',
    border: '1px solid #E5E5E5',
    marginBottom: '2rem',
  },

  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },

  filterIcon: {
    color: '#D4AF37',
    fontSize: '16px',
  },

  filterLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1A1A1A',
  },

  filterButtons: {
    display: 'flex',
    gap: '0.5rem',
  },

  filterBtn: {
    padding: '6px 12px',
    border: '1px solid #E5E5E5',
    borderRadius: '6px',
    backgroundColor: 'white',
    color: '#666',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },

  filterBtnActive: {
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    borderColor: '#D4AF37',
  },
};

export default AdminDashboardScreen;