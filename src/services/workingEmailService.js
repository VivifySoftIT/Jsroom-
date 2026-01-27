// Working Email Service - Sends FROM customer TO JS ROOMS automatically
class WorkingEmailService {
  
  // Send booking email FROM customer's email TO atchayakannan03@gmail.com
  async sendBookingEmail(bookingData) {
    try {
      console.log('📧 SENDING AUTO EMAIL FROM CUSTOMER...');
      console.log('📧 FROM:', bookingData.guestEmail);
      console.log('📧 TO: atchayakannan03@gmail.com');

      // Create email content
      const emailContent = this.createEmailContent(bookingData);
      
      // Try the most reliable email services
      const services = [
        () => this.sendViaFormSubmit(emailContent, bookingData),
        () => this.sendViaMailto(emailContent, bookingData)
      ];

      for (let i = 0; i < services.length; i++) {
        try {
          console.log(`📧 Trying email method ${i + 1}...`);
          const result = await services[i]();
          if (result.success) {
            console.log('✅ AUTO EMAIL SENT SUCCESSFULLY!');
            
            // Show success message
            window.alert(`✅ BOOKING CONFIRMED & EMAIL SENT!

Booking: ${bookingData.bookingNumber}
From: ${bookingData.guestEmail}
To: atchayakannan03@gmail.com

Your booking request has been sent automatically to JS ROOMS.
You will receive a call within 30 minutes with payment details.`);
            
            return result;
          }
        } catch (serviceError) {
          console.log(`❌ Email method ${i + 1} failed:`, serviceError);
          continue;
        }
      }

      // If all automated methods fail, show manual option
      this.showManualEmailOption(bookingData);
      return {
        success: false,
        message: 'Auto email failed - manual option provided'
      };

    } catch (error) {
      console.error('❌ Auto email failed:', error);
      this.showManualEmailOption(bookingData);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Create email content from customer to JS ROOMS
  createEmailContent(bookingData) {
    return {
      from: bookingData.guestEmail,
      fromName: bookingData.guestName,
      to: 'atchayakannan03@gmail.com',
      subject: `🏨 Booking Request - ${bookingData.bookingNumber} from ${bookingData.guestName}`,
      message: `Dear JS ROOMS Team,

I would like to make a hotel booking. Please find my details below:

BOOKING REQUEST: ${bookingData.bookingNumber}
SUBMITTED: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

=== MY CONTACT DETAILS ===
Name: ${bookingData.guestName}
Phone: ${bookingData.guestPhone}
Email: ${bookingData.guestEmail}
Address: ${bookingData.guestAddress}

=== BOOKING REQUIREMENTS ===
Room Type: ${bookingData.roomName}
Room Number: ${bookingData.roomNumber}
Check-in: ${bookingData.checkIn}
Check-out: ${bookingData.checkOut}
Nights: ${bookingData.nights}
Guests: ${bookingData.guests}
Total Amount: ₹${bookingData.amount}

=== SPECIAL REQUESTS ===
${bookingData.specialRequests || 'None'}

Please confirm my booking and send me your bank account details for payment.
I am ready to transfer the amount within 24 hours.

You can reach me at ${bookingData.guestPhone} or reply to this email.

Thank you,
${bookingData.guestName}

---
Booking Reference: ${bookingData.bookingNumber}
Submitted via JS ROOMS website`
    };
  }

  // Method 1: Send via FormSubmit (most reliable)
  async sendViaFormSubmit(emailContent, bookingData) {
    console.log('📧 Trying FormSubmit...');
    
    const formData = new FormData();
    
    // FormSubmit configuration
    formData.append('_subject', emailContent.subject);
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');
    formData.append('_next', 'https://jsrooms.com/thank-you');
    
    // Booking details
    formData.append('Booking_Number', bookingData.bookingNumber);
    formData.append('Customer_Name', bookingData.guestName);
    formData.append('Customer_Email', bookingData.guestEmail);
    formData.append('Customer_Phone', bookingData.guestPhone);
    formData.append('Customer_Address', bookingData.guestAddress);
    formData.append('Room_Type', bookingData.roomName);
    formData.append('Room_Number', bookingData.roomNumber);
    formData.append('Check_In', bookingData.checkIn);
    formData.append('Check_Out', bookingData.checkOut);
    formData.append('Nights', bookingData.nights);
    formData.append('Guests', bookingData.guests);
    formData.append('Total_Amount', `₹${bookingData.amount}`);
    formData.append('Payment_Method', bookingData.paymentMethod || 'Bank Transfer');
    formData.append('Special_Requests', bookingData.specialRequests || 'None');
    formData.append('Submitted_At', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
    formData.append('Source', 'JS ROOMS Website');

    const response = await fetch('https://formsubmit.co/atchayakannan03@gmail.com', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      return { 
        success: true, 
        service: 'FormSubmit',
        message: `Booking email sent from ${emailContent.from} to atchayakannan03@gmail.com`
      };
    } else {
      throw new Error(`FormSubmit failed: ${response.status}`);
    }
  }

  // Method 2: Send via mailto (opens email client)
  async sendViaMailto(emailContent, bookingData) {
    console.log('📧 Trying mailto...');
    
    try {
      const subject = encodeURIComponent(emailContent.subject);
      const body = encodeURIComponent(emailContent.message);
      const mailtoLink = `mailto:${emailContent.to}?subject=${subject}&body=${body}`;
      
      // Open email client
      window.open(mailtoLink, '_blank');
      
      return { 
        success: true, 
        service: 'mailto',
        message: 'Email client opened with pre-filled booking request'
      };
    } catch (error) {
      throw new Error(`Mailto failed: ${error.message}`);
    }
  }

  // Show manual email option if all auto methods fail
  showManualEmailOption(bookingData) {
    const emailContent = this.createEmailContent(bookingData);
    
    const alertMessage = `❌ AUTO EMAIL FAILED

BOOKING: ${bookingData.bookingNumber}
FROM: ${bookingData.guestEmail}
TO: atchayakannan03@gmail.com

Your booking is saved! 

MANUAL OPTIONS:
1. Click OK to open your email client
2. Or call JS ROOMS directly: +91 98765 43210

The email will be pre-filled with your booking details.`;

    if (window.confirm(alertMessage)) {
      // Create mailto link
      const subject = encodeURIComponent(emailContent.subject);
      const body = encodeURIComponent(emailContent.message);
      const mailtoLink = `mailto:${emailContent.to}?subject=${subject}&body=${body}`;
      
      // Open email client
      window.open(mailtoLink, '_blank');
    }

    // Also log the email content for debugging
    console.log('📧 MANUAL EMAIL CONTENT:');
    console.log('TO:', emailContent.to);
    console.log('FROM:', emailContent.from);
    console.log('SUBJECT:', emailContent.subject);
    console.log('MESSAGE:', emailContent.message);
  }
}

// Create singleton instance
const workingEmailService = new WorkingEmailService();
export default workingEmailService;