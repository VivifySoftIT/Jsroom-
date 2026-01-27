// Auto Email Service - Sends FROM customer TO JS ROOMS management
class AutoEmailService {
  
  // Send booking email FROM customer's email TO atchayakannan03@gmail.com
  async sendBookingEmail(bookingData) {
    try {
      console.log('📧 SENDING AUTO EMAIL FROM CUSTOMER...');
      console.log('📧 FROM:', bookingData.guestEmail);
      console.log('📧 TO: atchayakannan03@gmail.com');

      // Create email content
      const emailContent = this.createEmailContent(bookingData);
      
      // Try multiple email services
      const services = [
        () => this.sendViaFormspree(emailContent, bookingData),
        () => this.sendViaEmailJS(emailContent, bookingData),
        () => this.sendViaNetlify(emailContent, bookingData),
        () => this.sendViaGetForm(emailContent, bookingData)
      ];

      for (const service of services) {
        try {
          const result = await service();
          if (result.success) {
            console.log('✅ AUTO EMAIL SENT SUCCESSFULLY!');
            alert(`✅ BOOKING CONFIRMED & EMAIL SENT!

Booking: ${bookingData.bookingNumber}
From: ${bookingData.guestEmail}
To: atchayakannan03@gmail.com

Your booking request has been sent automatically to JS ROOMS management.
You will receive a call within 30 minutes.`);
            return result;
          }
        } catch (serviceError) {
          console.log('❌ Service failed, trying next...', serviceError);
          continue;
        }
      }

      throw new Error('All email services failed');

    } catch (error) {
      console.error('❌ Auto email failed:', error);
      
      // Show manual email option
      this.showManualEmailOption(bookingData);
      
      return {
        success: false,
        error: error.message,
        message: 'Auto email failed - manual option provided'
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

  // Send via Formspree
  async sendViaFormspree(emailContent, bookingData) {
    console.log('📧 Trying Formspree...');
    
    const response = await fetch('https://formspree.io/f/mwpkgqpv', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: emailContent.fromName,
        email: emailContent.from,
        _replyto: emailContent.from,
        subject: emailContent.subject,
        message: emailContent.message
      })
    });

    if (response.ok) {
      return { 
        success: true, 
        service: 'Formspree',
        message: `Email sent from ${emailContent.from} to atchayakannan03@gmail.com`
      };
    } else {
      throw new Error(`Formspree failed: ${response.status}`);
    }
  }

  // Send via EmailJS
  async sendViaEmailJS(emailContent, bookingData) {
    console.log('📧 Trying EmailJS...');
    
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: 'default_service',
        template_id: 'template_booking',
        user_id: 'public_key',
        template_params: {
          from_name: emailContent.fromName,
          from_email: emailContent.from,
          to_email: emailContent.to,
          subject: emailContent.subject,
          message: emailContent.message,
          reply_to: emailContent.from
        }
      })
    });

    if (response.ok) {
      return { 
        success: true, 
        service: 'EmailJS',
        message: `Email sent from ${emailContent.from} to atchayakannan03@gmail.com`
      };
    } else {
      throw new Error(`EmailJS failed: ${response.status}`);
    }
  }

  // Send via Netlify Forms
  async sendViaNetlify(emailContent, bookingData) {
    console.log('📧 Trying Netlify Forms...');
    
    const formData = new FormData();
    formData.append('form-name', 'booking-request');
    formData.append('name', emailContent.fromName);
    formData.append('email', emailContent.from);
    formData.append('subject', emailContent.subject);
    formData.append('message', emailContent.message);
    formData.append('booking-number', bookingData.bookingNumber);

    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    });

    if (response.ok) {
      return { 
        success: true, 
        service: 'Netlify',
        message: `Email sent from ${emailContent.from} to atchayakannan03@gmail.com`
      };
    } else {
      throw new Error(`Netlify failed: ${response.status}`);
    }
  }

  // Send via GetForm
  async sendViaGetForm(emailContent, bookingData) {
    console.log('📧 Trying GetForm...');
    
    const response = await fetch('https://getform.io/f/your-form-id', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: emailContent.fromName,
        email: emailContent.from,
        subject: emailContent.subject,
        message: emailContent.message,
        booking: bookingData.bookingNumber
      })
    });

    if (response.ok) {
      return { 
        success: true, 
        service: 'GetForm',
        message: `Email sent from ${emailContent.from} to atchayakannan03@gmail.com`
      };
    } else {
      throw new Error(`GetForm failed: ${response.status}`);
    }
  }

  // Show manual email option if auto fails
  showManualEmailOption(bookingData) {
    const emailContent = this.createEmailContent(bookingData);
    
    // Create mailto link
    const subject = encodeURIComponent(emailContent.subject);
    const body = encodeURIComponent(emailContent.message);
    const mailtoLink = `mailto:atchayakannan03@gmail.com?subject=${subject}&body=${body}`;
    
    // Show alert with options
    const alertMessage = `❌ AUTO EMAIL FAILED

BOOKING: ${bookingData.bookingNumber}
FROM: ${bookingData.guestEmail}
TO: atchayakannan03@gmail.com

OPTIONS:
1. Click OK to open your email client
2. Or manually email the booking details

The email will be pre-filled for you.`;

    if (window.confirm(alertMessage)) {
      // Open email client
      window.open(mailtoLink, '_blank');
    }

    // Also log the email content
    console.log('📧 MANUAL EMAIL CONTENT:');
    console.log('TO:', emailContent.to);
    console.log('FROM:', emailContent.from);
    console.log('SUBJECT:', emailContent.subject);
    console.log('MESSAGE:', emailContent.message);
  }
}

// Create singleton instance
const autoEmailService = new AutoEmailService();
export default autoEmailService;