// Simple Email Service - Clean version without ESLint errors
class SimpleEmailService {
  
  // Send booking notification (not used in current system)
  async sendBookingNotification(bookingData) {
    try {
      console.log('📧 Simple email service called...');
      
      // This service is not used in the current auto email system
      // It's kept for backward compatibility
      o
      return {
        success: true,
        message: 'Simple email service - not used in current system',
        methods: ['console-log']
      };

    } catch (error) {
      console.error('❌ Simple email service error:', error);
      
      return {
        success: false,
        error: error.message,
        message: 'Simple email service failed'
      };
    }
  }

  // Create formatted email content (legacy method)
  createEmailContent(bookingData) {
    return {
      to: 'atchayakannan03@gmail.com',
      subject: `🏨 NEW BOOKING - ${bookingData.bookingNumber}`,
      body: `NEW BOOKING RECEIVED

BOOKING: ${bookingData.bookingNumber}
CUSTOMER: ${bookingData.guestName}
PHONE: ${bookingData.guestPhone}
EMAIL: ${bookingData.guestEmail}
ROOM: ${bookingData.roomName}
AMOUNT: ₹${bookingData.amount}

This is a legacy email format.`
    };
  }
}

// Create singleton instance
const simpleEmailService = new SimpleEmailService();
export default simpleEmailService;