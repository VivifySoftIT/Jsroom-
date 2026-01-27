import React, { useState } from 'react';
import emailService from '../services/emailService';
import contactEmailService from '../services/contactEmailService';

const EmailTestComponent = () => {
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const testBookingEmail = async () => {
    setIsLoading(true);
    try {
      console.log('🧪 TESTING BOOKING EMAIL...');
      
      const testBooking = {
        bookingNumber: 'TEST-' + Date.now(),
        guestName: 'Test Customer',
        guestEmail: 'test.customer@example.com',
        guestPhone: '+91 9876543210',
        guestAddress: 'Test Address, Chennai, Tamil Nadu, India',
        roomName: 'Single AC Room',
        roomNumber: '101',
        checkIn: '2026-01-25',
        checkOut: '2026-01-27',
        nights: 2,
        guests: 1,
        amount: 1200,
        paymentMethod: 'Bank Transfer',
        specialRequests: 'Test booking request'
      };

      const result = await emailService.sendBookingConfirmation(testBooking);
      setTestResults(prev => ({ ...prev, booking: result }));
      console.log('📧 Booking email test result:', result);
      
    } catch (error) {
      console.error('❌ Booking email test failed:', error);
      setTestResults(prev => ({ ...prev, booking: { success: false, error: error.message } }));
    } finally {
      setIsLoading(false);
    }
  };

  const testContactEmail = async () => {
    setIsLoading(true);
    try {
      console.log('🧪 TESTING CONTACT EMAIL...');
      
      const testContact = {
        name: 'Test Customer',
        email: 'test.customer@example.com',
        phone: '+91 9876543210',
        subject: 'Test Contact Message',
        message: 'This is a test contact message from JS ROOMS website.',
        inquiryType: 'general'
      };

      const result = await contactEmailService.sendContactMessage(testContact);
      setTestResults(prev => ({ ...prev, contact: result }));
      console.log('📧 Contact email test result:', result);
      
    } catch (error) {
      console.error('❌ Contact email test failed:', error);
      setTestResults(prev => ({ ...prev, contact: { success: false, error: error.message } }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>📧 Email System Test</h2>
        <p style={styles.subtitle}>Test email functionality for JS ROOMS</p>
      </div>

      <div style={styles.testSection}>
        <div style={styles.testCard}>
          <h3 style={styles.testTitle}>🏨 Booking Email Test</h3>
          <p style={styles.testDescription}>
            Tests booking confirmation email sent to atchayakannan03@gmail.com
          </p>
          <button 
            onClick={testBookingEmail} 
            disabled={isLoading}
            style={styles.testButton}
          >
            {isLoading ? 'Testing...' : 'Test Booking Email'}
          </button>
          
          {testResults.booking && (
            <div style={testResults.booking.success ? styles.successResult : styles.errorResult}>
              <strong>Result:</strong> {testResults.booking.success ? '✅ Success' : '❌ Failed'}
              <br />
              <strong>Message:</strong> {testResults.booking.message || testResults.booking.error}
              {testResults.booking.service && (
                <>
                  <br />
                  <strong>Service:</strong> {testResults.booking.service}
                </>
              )}
            </div>
          )}
        </div>

        <div style={styles.testCard}>
          <h3 style={styles.testTitle}>💬 Contact Email Test</h3>
          <p style={styles.testDescription}>
            Tests contact form email sent to atchayakannan03@gmail.com
          </p>
          <button 
            onClick={testContactEmail} 
            disabled={isLoading}
            style={styles.testButton}
          >
            {isLoading ? 'Testing...' : 'Test Contact Email'}
          </button>
          
          {testResults.contact && (
            <div style={testResults.contact.success ? styles.successResult : styles.errorResult}>
              <strong>Result:</strong> {testResults.contact.success ? '✅ Success' : '❌ Failed'}
              <br />
              <strong>Message:</strong> {testResults.contact.message || testResults.contact.error}
              {testResults.contact.service && (
                <>
                  <br />
                  <strong>Service:</strong> {testResults.contact.service}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div style={styles.infoSection}>
        <h4 style={styles.infoTitle}>📋 Test Information</h4>
        <ul style={styles.infoList}>
          <li>All test emails are sent to: <strong>atchayakannan03@gmail.com</strong></li>
          <li>Test emails use FormSubmit service for reliable delivery</li>
          <li>Check your email inbox and spam folder</li>
          <li>If FormSubmit fails, mailto will open your email client</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    fontFamily: '"Inter", sans-serif',
  },

  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },

  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '0.5rem',
  },

  subtitle: {
    fontSize: '14px',
    color: '#666',
  },

  testSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginBottom: '2rem',
  },

  testCard: {
    padding: '1.5rem',
    backgroundColor: '#FAF9F7',
    borderRadius: '12px',
    border: '1px solid #E5E5E5',
  },

  testTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '0.5rem',
  },

  testDescription: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '1rem',
    lineHeight: '1.4',
  },

  testButton: {
    width: '100%',
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '1rem',
  },

  successResult: {
    padding: '12px',
    backgroundColor: '#E8F5E8',
    border: '1px solid #4CAF50',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#2E7D32',
    lineHeight: '1.4',
  },

  errorResult: {
    padding: '12px',
    backgroundColor: '#FFEBEE',
    border: '1px solid #F44336',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#C62828',
    lineHeight: '1.4',
  },

  infoSection: {
    padding: '1.5rem',
    backgroundColor: '#F8F9FA',
    borderRadius: '12px',
    border: '1px solid #E5E5E5',
  },

  infoTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '1rem',
  },

  infoList: {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.6',
    paddingLeft: '1rem',
  },
};

export default EmailTestComponent;