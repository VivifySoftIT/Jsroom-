import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaShieldAlt,
  FaArrowLeft
} from 'react-icons/fa';

const AdminLoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call - Replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials
      if (formData.email === 'admin@jsrooms.com' && formData.password === 'admin123') {
        // Store admin token
        localStorage.setItem('adminToken', 'demo-admin-token');
        localStorage.setItem('adminUser', JSON.stringify({
          id: 1,
          name: 'Admin User',
          email: 'admin@jsrooms.com',
          role: 'admin'
        }));
        
        navigate('/admin/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Background */}
      <div style={styles.background}>
        <div style={styles.overlay}></div>
      </div>

      {/* Back to Home Button */}
      <Link to="/home" style={styles.backBtn}>
        <FaArrowLeft style={styles.backIcon} />
        Back to Home
      </Link>

      {/* Login Form */}
      <div style={styles.loginCard}>
        <div style={styles.header}>
          <div style={styles.logoSection}>
            <div style={styles.logoIcon}>
              <FaShieldAlt />
            </div>
            <div>
              <h1 style={styles.title}>Admin Portal</h1>
              <p style={styles.subtitle}>JS ROOMS Hotel Management</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && (
            <div style={styles.errorMessage}>
              {error}
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputContainer}>
              <FaUser style={styles.inputIcon} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your admin email"
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputContainer}>
              <FaLock style={styles.inputIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                style={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.loginBtn,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Signing In...' : 'Sign In to Admin Panel'}
          </button>
        </form>

        <div style={styles.demoCredentials}>
          <h4 style={styles.demoTitle}>Demo Credentials:</h4>
          <p style={styles.demoText}>Email: admin@jsrooms.com</p>
          <p style={styles.demoText}>Password: admin123</p>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Secure admin access for JS ROOMS Hotel Management System
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },

  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url(https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -2,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(0, 0, 0, 0.8) 100%)',
    zIndex: -1,
  },

  backBtn: {
    position: 'absolute',
    top: '2rem',
    left: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'white',
    textDecoration: 'none',
    padding: '12px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '25px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    zIndex: 10,
  },

  backIcon: {
    fontSize: '14px',
  },

  loginCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '3rem',
    width: '100%',
    maxWidth: '450px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },

  header: {
    textAlign: 'center',
    marginBottom: '2.5rem',
  },

  logoSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },

  logoIcon: {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: '#1A1A1A',
  },

  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1A1A1A',
    margin: 0,
    lineHeight: '1.2',
  },

  subtitle: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
    fontWeight: '500',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  errorMessage: {
    backgroundColor: '#FEF2F2',
    color: '#DC2626',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    border: '1px solid #FECACA',
    textAlign: 'center',
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A1A1A',
  },

  inputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },

  inputIcon: {
    position: 'absolute',
    left: '16px',
    color: '#D4AF37',
    fontSize: '16px',
    zIndex: 2,
  },

  input: {
    width: '100%',
    padding: '14px 16px 14px 48px',
    border: '2px solid #E5E5E5',
    borderRadius: '12px',
    fontSize: '16px',
    backgroundColor: 'white',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },

  eyeBtn: {
    position: 'absolute',
    right: '16px',
    background: 'none',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '4px',
    zIndex: 2,
  },

  loginBtn: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    marginTop: '1rem',
  },

  demoCredentials: {
    backgroundColor: '#F8F9FA',
    padding: '1.5rem',
    borderRadius: '12px',
    marginTop: '2rem',
    border: '1px solid #E5E5E5',
  },

  demoTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: '0 0 0.5rem 0',
  },

  demoText: {
    fontSize: '13px',
    color: '#666',
    margin: '0.25rem 0',
    fontFamily: 'monospace',
  },

  footer: {
    textAlign: 'center',
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #E5E5E5',
  },

  footerText: {
    fontSize: '12px',
    color: '#666',
    margin: 0,
  },
};

export default AdminLoginScreen;