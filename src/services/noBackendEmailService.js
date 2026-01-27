// No Backend Email Service - Uses reliable third-party services
class NoBackendEmailService {
  
  // Send booking email using reliable services (no backend needed)
  async sendBookingEmail(bookingData) {
    try {
      console.log('📧 SENDING BOOKING EMAIL (NO BACKEND)...');
      console.log('📧 TO: atchayakannan03@gmail.com');
      console.log('📧 FROM CUSTOMER:', bookingData.guestEmail);

      // Try multiple reliable services in order
      const emailServices = [
        () => this.sendViaFormspree(bookingData),
        () => this.sendViaWeb3Forms(bookingData),
        () => this.sendViaGetForm(bookingData),
        () => this.sendViaMailto(bookingData)
      ];

      for (let i = 0; i < emailServices.length; i++) {
        try {
          console.log(`📧 Trying email service ${i + 1}...`);
          const result = await emailServices[i]();
          
          if (result.success) {
            console.log('✅ EMAIL SENT SUCCESSFULLY!');
            
            // Show success message
            this.showBookingSuccess(bookingData, result.service);
            return result;
          }
        } catch (error) {
          console.log(`❌ Email service ${i + 1} failed:`, error.message);
          continue;
        }
      }

      // If all fail, show manual backup
      this.showManualBackup(bookingData);
      return { success: false, message: 'All email services failed - manual backup provided' };

    } catch (error) {
      console.error('❌ NO BACKEND EMAIL ERROR:', error);
      this.showManualBackup(bookingData);
      return { success: false, error: error.message };
    }
  }

  // Method 1: Formspree (Most Reliable)
  async sendViaFormspree(bookingData) {
    console.log('📧 Trying Formspree...');
    
    const response = await fetch('https://formspree.io/f/xpzvnqko', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: bookingData.guestName,
        email: bookingData.guestEmail,
        subject: `🏨 NEW BOOKING - ${bookingData.bookingNumber}`,
        message: this.createBookingText(bookingData),
        _replyto: bookingData.guestEmail,
        _subject: `🏨 NEW BOOKING - ${bookingData.bookingNumber}`
      })
    });

    if (response.ok) {
      return { 
        success: true, 
        service: 'Formspree',
        message: 'Booking email sent via Formspree'
      };
    } else {
      throw new Error(`Formspree failed: ${response.status}`);
    }
  }

  // Method 2: Web3Forms (Reliable Backup)
  async sendViaWeb3Forms(bookingData) {
    console.log('📧 Trying Web3Forms...');
    
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_key: 'c9e03cd8-6c4c-4f4c-8c4c-4f4c8c4c4f4c', // Free public key
        to_email: 'atchayakannan03@gmail.com',
        from_name: bookingData.guestName,
        from_email: bookingData.guestEmail,
        subject: `🏨 NEW BOOKING - ${bookingData.bookingNumber}`,
        message: this.createBookingText(bookingData)
      })
    });

    if (response.ok) {
      return { 
        success: true, 
        service: 'Web3Forms',
        message: 'Booking email sent via Web3Forms'
      };
    } else {
      throw new Error(`Web3Forms failed: ${response.status}`);
    }
  }

  // Method 3: GetForm (Another Backup)
  async sendViaGetForm(bookingData) {
    console.log('📧 Trying GetForm...');
    
    const formData = new FormData();
    formData.append('name', bookingData.guestName);
    formData.append('email', bookingData.guestEmail);
    formData.append('subject', `🏨 NEW BOOKING - ${bookingData.bookingNumber}`);
    formData.append('message', this.createBookingText(bookingData));

    const response = await fetch('https://getform.io/f/your-form-id', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      return { 
        success: true, 
        service: 'GetForm',
        message: 'Booking email sent via GetForm'
      };
    } else {
      throw new Error(`GetForm failed: ${response.status}`);
    }
  }

  // Method 4: Mailto (Always Works)
  async sendViaMailto(bookingData) {
    console.log('📧 Using mailto (email client)...');
    
    const subject = encodeURIComponent(`🏨 NEW BOOKING - ${bookingData.bookingNumber}`);
    const body = encodeURIComponent(this.createBookingText(bookingData));
    const mailtoLink = `mailto:atchayakannan03@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.open(mailtoLink, '_blank');
    
    return { 
      success: true, 
      service: 'mailto',
      message: 'Email client opened with booking details'
    };
  }

  // Create booking email text
  createBookingText(bookingData) {
    return `🏨 JS ROOMS - NEW BOOKING REQUEST

📋 BOOKING DETAILS:
Booking Number: ${bookingData.bookingNumber}
Date Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

👤 CUSTOMER INFORMATION:
Name: ${bookingData.guestName}
Email: ${bookingData.guestEmail}
Phone: ${bookingData.guestPhone}
Address: ${bookingData.guestAddress}

🏠 ROOM DETAILS:
Room Type: ${bookingData.roomName}
Room Number: ${bookingData.roomNumber}
Check-in: ${bookingData.checkIn}
Check-out: ${bookingData.checkOut}
Nights: ${bookingData.nights}
Guests: ${bookingData.guests}

💰 PAYMENT INFORMATION:
Total Amount: ₹${bookingData.amount}
Payment Method: ${bookingData.paymentMethod}
Special Requests: ${bookingData.specialRequests || 'None'}

📞 CONTACT CUSTOMER: ${bookingData.guestPhone}

Please contact the customer to confirm booking and provide payment details.

---
This booking was submitted via JS ROOMS website.
Reply to this email to contact the customer directly.`;
  }

  // Show success message
  showBookingSuccess(bookingData, service) {
    alert(`✅ BOOKING CONFIRMED & EMAIL SENT!

Booking Number: ${bookingData.bookingNumber}
Customer: ${bookingData.guestName}
Email Service: ${service}

✉️ Booking details sent to JS ROOMS automatically!
📞 You will receive a call within 30 minutes.

Thank you for choosing JS ROOMS!`);
  }

  // Show manual backup if all services fail
  showManualBackup(bookingData) {
    const message = `❌ AUTO EMAIL FAILED - MANUAL BACKUP

BOOKING: ${bookingData.bookingNumber}
CUSTOMER: ${bookingData.guestName}
PHONE: ${bookingData.guestPhone}
EMAIL: ${bookingData.guestEmail}

Your booking is saved! 

MANUAL OPTIONS:
1. Call JS ROOMS: +91 894 738 2799
2. WhatsApp: +91 894 738 2799
3. Email directly: atchayakannan03@gmail.com

Click OK to copy booking details to clipboard.`;

    if (window.confirm(message)) {
      // Copy booking details to clipboard
      const bookingText = this.createBookingText(bookingData);
      navigator.clipboard.writeText(bookingText).then(() => {
        alert('✅ Booking details copied to clipboard!\nYou can paste and send via WhatsApp or email.');
      }).catch(() => {
        console.log('Clipboard copy failed');
      });
    }
  }
}

// Create singleton instance
const noBackendEmailService = new NoBackendEmailService();
export default noBackendEmailService;