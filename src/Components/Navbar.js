import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  FaHome, FaBed, FaImages, FaInfoCircle,
  FaPhone, FaCalendarAlt, FaUser, FaBars, FaTimes
} from 'react-icons/fa';
import localforage from "localforage";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    const checkAuth = async () => {
      try {
        const token = await localforage.getItem('token');
        if (token) {
          setUserData({ name: 'User' });
        } else if (localStorage.getItem('isAdmin') === 'true') {
          setUserData({ name: 'Admin' });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    checkAuth();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = async () => {
    await localforage.removeItem('token');
    localStorage.removeItem('isAdmin');
    setUserData(null);
    navigate('/home');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: '#1A1A1A',
      backdropFilter: 'blur(20px)',
      padding: '1rem 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={styles.navContainer}>
        {/* Logo */}
        <Link to="/home" style={styles.logo} onClick={closeMobileMenu}>
          <div style={styles.logoIcon}>JS</div>
          <div>
            <div style={styles.logoText}>JS ROOMS</div>
            <div style={styles.logoSubtext}>LUXURY HOTEL</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div style={{
          ...styles.navLinks,
          display: isMobile ? 'none' : 'flex'
        }}>
          <Link
            to="/home"
            style={{
              ...styles.navLink,
              color: isActive('/home') ? '#D4AF37' : 'white'
            }}
          >
            <FaHome style={styles.navIcon} />
            <span>Home</span>
          </Link>
          <Link
            to="/rooms"
            style={{
              ...styles.navLink,
              color: isActive('/rooms') ? '#D4AF37' : 'white'
            }}
          >
            <FaBed style={styles.navIcon} />
            <span>Rooms</span>
          </Link>
          <Link
            to="/gallery"
            style={{
              ...styles.navLink,
              color: isActive('/gallery') ? '#D4AF37' : 'white'
            }}
          >
            <FaImages style={styles.navIcon} />
            <span>Gallery</span>
          </Link>
          <Link
            to="/about"
            style={{
              ...styles.navLink,
              color: isActive('/about') ? '#D4AF37' : 'white'
            }}
          >
            <FaInfoCircle style={styles.navIcon} />
            <span>About</span>
          </Link>
          <Link
            to="/contact"
            style={{
              ...styles.navLink,
              color: isActive('/contact') ? '#D4AF37' : 'white'
            }}
          >
            <FaPhone style={styles.navIcon} />
            <span>Contact</span>
          </Link>

          {userData ? (
            <div style={styles.userSection}>
              <div style={styles.userInfo}>
                <FaUser style={styles.userIcon} />
                <span>{userData.name}</span>
              </div>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </div>
          ) : (
            <div style={styles.rightSection}>
              <button
                onClick={() => {
                  const pwd = prompt("Enter Admin Password:");
                  if (pwd === "admin123") {
                    localStorage.setItem('isAdmin', 'true');
                    setUserData({ name: 'Admin' });
                    window.location.reload(); // Refresh to update UI components
                  } else if (pwd) {
                    alert("Incorrect Password");
                  }
                }}
                style={{ ...styles.navLink, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <FaUser style={styles.navIcon} />
              </button>
              <Link to="/rooms" style={styles.bookingBtn}>
                <FaCalendarAlt style={{ marginRight: '8px' }} />
                <span>Book Now</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button - Only shown on mobile */}
        {isMobile && (
          <button
            onClick={toggleMobileMenu}
            style={styles.mobileMenuBtn}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}
      </div>

      {/* Mobile Menu - Only shown when open */}
      {isMobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <div style={styles.mobileMenuContent}>
            <Link
              to="/home"
              style={{
                ...styles.mobileNavLink,
                color: isActive('/home') ? '#D4AF37' : 'white'
              }}
              onClick={closeMobileMenu}
            >
              <FaHome style={styles.mobileNavIcon} />
              <span>Home</span>
            </Link>
            <Link
              to="/rooms"
              style={{
                ...styles.mobileNavLink,
                color: isActive('/rooms') ? '#D4AF37' : 'white'
              }}
              onClick={closeMobileMenu}
            >
              <FaBed style={styles.mobileNavIcon} />
              <span>Rooms</span>
            </Link>
            <Link
              to="/gallery"
              style={{
                ...styles.mobileNavLink,
                color: isActive('/gallery') ? '#D4AF37' : 'white'
              }}
              onClick={closeMobileMenu}
            >
              <FaImages style={styles.mobileNavIcon} />
              <span>Gallery</span>
            </Link>
            <Link
              to="/about"
              style={{
                ...styles.mobileNavLink,
                color: isActive('/about') ? '#D4AF37' : 'white'
              }}
              onClick={closeMobileMenu}
            >
              <FaInfoCircle style={styles.mobileNavIcon} />
              <span>About</span>
            </Link>
            <Link
              to="/contact"
              style={{
                ...styles.mobileNavLink,
                color: isActive('/contact') ? '#D4AF37' : 'white'
              }}
              onClick={closeMobileMenu}
            >
              <FaPhone style={styles.mobileNavIcon} />
              <span>Contact</span>
            </Link>

            {userData ? (
              <>
                <div style={styles.mobileUserInfo}>
                  <FaUser style={styles.mobileNavIcon} />
                  <span>{userData.name}</span>
                </div>
                <button
                  onClick={() => { handleLogout(); closeMobileMenu(); }}
                  style={styles.mobileLogoutBtn}
                >
                  Logout
                </button>
              </>
            ) : (
              <div style={styles.mobileRightSection}>
                <Link to="/rooms" style={styles.mobileBookingBtn} onClick={closeMobileMenu}>
                  <FaCalendarAlt style={styles.mobileNavIcon} />
                  <span>Book Now</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
    backdropFilter: 'blur(20px)',
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
    transition: 'transform 0.3s ease',
  },
  logoIcon: {
    width: '45px',
    height: '45px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: '700',
    color: '#0A0A0A',
  },
  logoText: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: 'white',
    lineHeight: '1',
  },
  logoSubtext: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#D4AF37',
    letterSpacing: '1.5px',
    lineHeight: '1',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(212, 175, 55, 0.1)',
      color: '#D4AF37',
    },
  },
  navIcon: {
    fontSize: '14px',
    opacity: 0.8,
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  userInfo: {
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    borderRadius: '8px',
  },
  userIcon: {
    fontSize: '14px',
    opacity: 0.8,
  },
  logoutBtn: {
    padding: '8px 16px',
    background: 'transparent',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '20px',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    '&:hover': {
      borderColor: '#D4AF37',
      color: '#D4AF37',
    },
  },
  bookingBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#0A0A0A',
    textDecoration: 'none',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(212, 175, 55, 0.3)',
    },
  },
  mobileMenuBtn: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(10, 10, 10, 0.98)',
    backdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    maxHeight: 'calc(100vh - 80px)',
    overflowY: 'auto',
  },
  mobileMenuContent: {
    padding: '1rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  mobileNavLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  mobileUserInfo: {
    color: 'white',
    fontSize: '16px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    borderRadius: '8px',
  },
  mobileNavIcon: {
    fontSize: '16px',
    opacity: 0.8,
    width: '20px',
    textAlign: 'center',
  },
  mobileBookingBtn: {
    padding: '14px 16px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#0A0A0A',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '1rem',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
  mobileLogoutBtn: {
    padding: '14px 16px',
    background: 'transparent',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: 'inherit',
    marginTop: '1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: '#D4AF37',
      color: '#D4AF37',
    },
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  mobileRightSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginTop: '1rem',
  },
};

export default Navbar;