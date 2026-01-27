import workingEmailService from './workingEmailService';

class EmailService {
  constructor() {
    // No API configuration needed - using only email services
  }

  // Send booking notification FROM customer's email TO JS ROOMS management
  async sendBookingConfirmation(bookingData) {
    try {
      console.log('📧 SENDING AUTO EMAIL FROM CUSTOMER TO JS ROOMS...');
      console.log('📧 FROM:', bookingData.guestEmail);
      console.log('📧 TO: atchayakannan03@gmail.com');

      // Use working email service (sends from customer's email)
      console.log('📧 Using working email service...');
      return await workingEmailService.sendBookingEmail(bookingData);

    } catch (error) {
      console.error('❌ EMAIL SERVICE FAILED:', error);
      
      // Final fallback - use working email service
      return await workingEmailService.sendBookingEmail(bookingData);
    }
  }

  // Test email method
  async testEmail() {
    try {
      console.log('📧 TESTING AUTO EMAIL SYSTEM...');

      const testBooking = {
        bookingNumber: 'TEST' + Date.now(),
        guestName: 'Test Customer',
        guestEmail: 'test@example.com',
        guestPhone: '+91 9876543210',
        guestAddress: 'Test Address, Chennai, India',
        roomName: 'Single AC Room',
        roomNumber: '101',
        checkIn: '2026-01-25',
        checkOut: '2026-01-27',
        nights: 2,
        guests: 1,
        amount: 1200,
        paymentMethod: 'Bank Transfer',
        specialRequests: 'Test booking'
      };

      return await workingEmailService.sendBookingEmail(testBooking);

    } catch (error) {
      console.error('❌ TEST EMAIL ERROR:', error);
      return { success: false, error: error.message };
    }
  }

  // No guest confirmation email needed
  async sendGuestConfirmation(bookingData) {
    console.log('📧 No customer email needed - only JS ROOMS management notification');
    return { success: true, message: 'Customer email not required' };
  }
}

// Create singleton instance
const emailService = new EmailService();
export default emailService;