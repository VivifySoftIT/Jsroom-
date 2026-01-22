import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import config from '../config/apiConfig';

const ApiTestComponent = () => {
  const [testResults, setTestResults] = useState({
    categories: { status: 'pending', data: null, error: null },
    apiConfig: { status: 'loaded', data: config }
  });

  useEffect(() => {
    const runTests = async () => {
      // Test Categories API
      try {
        setTestResults(prev => ({
          ...prev,
          categories: { status: 'loading', data: null, error: null }
        }));

        const categories = await apiService.getCategories();
        
        // Handle new response format
        const categoriesData = categories.data || categories;
        const dataSource = categories.source || 'unknown';
        
        setTestResults(prev => ({
          ...prev,
          categories: { 
            status: 'success', 
            data: categoriesData, 
            error: null,
            isFallback: dataSource === 'fallback',
            source: dataSource
          }
        }));
      } catch (error) {
        setTestResults(prev => ({
          ...prev,
          categories: { status: 'error', data: null, error: error.message }
        }));
      }
    };

    runTests();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return '#10B981';
      case 'error': return '#EF4444';
      case 'loading': return '#F59E0B';
      case 'loaded': return '#6366F1';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'success': return 'Success';
      case 'error': return 'Error';
      case 'loading': return 'Loading...';
      case 'loaded': return 'Loaded';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>API Integration Test Results</h2>
      
      <div style={styles.testGrid}>
        {/* API Configuration Test */}
        <div style={styles.testCard}>
          <div style={styles.testHeader}>
            <h3 style={styles.testName}>API Configuration</h3>
            <div style={{
              ...styles.statusBadge,
              backgroundColor: getStatusColor(testResults.apiConfig.status)
            }}>
              {getStatusText(testResults.apiConfig.status)}
            </div>
          </div>
          <div style={styles.testContent}>
            <div style={styles.configItem}>
              <strong>Base URL:</strong> {config.API_BASE_URL}
            </div>
            <div style={styles.configItem}>
              <strong>Categories Endpoint:</strong> {config.ENDPOINTS.CATEGORIES}
            </div>
            <div style={styles.configItem}>
              <strong>Logging Enabled:</strong> {config.ENABLE_LOGGING ? 'Yes' : 'No'}
            </div>
            <div style={styles.configItem}>
              <strong>Fallback Categories:</strong> {config.FALLBACK_CATEGORIES.length} items
            </div>
          </div>
        </div>

        {/* Categories API Test */}
        <div style={styles.testCard}>
          <div style={styles.testHeader}>
            <h3 style={styles.testName}>Categories API</h3>
            <div style={{
              ...styles.statusBadge,
              backgroundColor: getStatusColor(testResults.categories.status)
            }}>
              {getStatusText(testResults.categories.status)}
            </div>
          </div>
          <div style={styles.testContent}>
            {testResults.categories.status === 'loading' && (
              <div style={styles.loadingText}>Testing API connection...</div>
            )}
            
            {testResults.categories.status === 'success' && (
              <div>
                <div style={styles.successText}>
                  ✅ API call completed successfully
                </div>
                <div style={styles.dataSourceInfo}>
                  <strong>Data Source:</strong> {testResults.categories.source || 'unknown'}
                </div>
                {testResults.categories.isFallback && (
                  <div style={styles.warningText}>
                    ⚠️ Using fallback data (API endpoint not available)
                  </div>
                )}
                <div style={styles.dataSection}>
                  <strong>Categories received:</strong>
                  <ul style={styles.categoryList}>
                    {testResults.categories.data.map(cat => (
                      <li key={cat.categoryId} style={styles.categoryItem}>
                        {cat.categoryName} (ID: {cat.categoryId})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {testResults.categories.status === 'error' && (
              <div>
                <div style={styles.errorText}>
                  ❌ API call failed
                </div>
                <div style={styles.errorDetails}>
                  Error: {testResults.categories.error}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* API Endpoints Information */}
        <div style={styles.testCard}>
          <div style={styles.testHeader}>
            <h3 style={styles.testName}>Available API Methods</h3>
            <div style={{
              ...styles.statusBadge,
              backgroundColor: '#6366F1'
            }}>
              Ready
            </div>
          </div>
          <div style={styles.testContent}>
            <div style={styles.methodList}>
              <div style={styles.methodItem}>
                <strong>getCategories()</strong> - Fetch room categories
              </div>
              <div style={styles.methodItem}>
                <strong>getRooms()</strong> - Fetch all rooms
              </div>
              <div style={styles.methodItem}>
                <strong>createRoom(data)</strong> - Create new room
              </div>
              <div style={styles.methodItem}>
                <strong>updateRoom(id, data)</strong> - Update existing room
              </div>
              <div style={styles.methodItem}>
                <strong>deleteRoom(id)</strong> - Delete room
              </div>
              <div style={styles.methodItem}>
                <strong>getBookings()</strong> - Fetch bookings
              </div>
              <div style={styles.methodItem}>
                <strong>createBooking(data)</strong> - Create new booking
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>
          This test component verifies the API integration is working correctly. 
          Check the browser console for detailed API call logs.
        </p>
      </div>
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

  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '2rem',
    textAlign: 'center',
  },

  testGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },

  testCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },

  testHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #E5E5E5',
  },

  testName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: 0,
  },

  statusBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'white',
  },

  testContent: {
    fontSize: '14px',
    color: '#666',
  },

  configItem: {
    marginBottom: '0.5rem',
    padding: '0.5rem',
    backgroundColor: '#F8F9FA',
    borderRadius: '6px',
  },

  loadingText: {
    color: '#F59E0B',
    fontWeight: '500',
  },

  successText: {
    color: '#10B981',
    fontWeight: '500',
    marginBottom: '1rem',
  },

  dataSourceInfo: {
    color: '#6366F1',
    fontWeight: '500',
    marginBottom: '1rem',
    padding: '0.5rem',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: '6px',
  },

  warningText: {
    color: '#F59E0B',
    fontWeight: '500',
    marginBottom: '1rem',
    padding: '0.5rem',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: '6px',
  },

  errorText: {
    color: '#EF4444',
    fontWeight: '500',
    marginBottom: '0.5rem',
  },

  errorDetails: {
    color: '#666',
    fontSize: '12px',
    padding: '0.5rem',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '6px',
  },

  dataSection: {
    marginTop: '1rem',
  },

  categoryList: {
    margin: '0.5rem 0',
    paddingLeft: '1rem',
  },

  categoryItem: {
    marginBottom: '0.25rem',
    color: '#1A1A1A',
  },

  methodList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  methodItem: {
    padding: '0.5rem',
    backgroundColor: '#F8F9FA',
    borderRadius: '6px',
    fontSize: '13px',
  },

  footer: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },

  footerText: {
    color: '#666',
    fontSize: '14px',
    margin: 0,
  },
};

export default ApiTestComponent;