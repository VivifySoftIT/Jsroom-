// Real Email Service - Actually sends emails automatically
class RealEmailService {
  
  // Send booking notification automatically to atchayakannan03@gmail.com
  async sendBookingNotification(bookingData) {
    try {
      console.log('📧 SENDING REAL EMAIL TO JS ROOMS...');
      console.log('📧 TO: atchayakannan03@gmail.com');
      console.log('📧 FROM CUSTOMER:', bookingData.guestEmail);

      // Try multiple email services in order
      const emailServices = [
        () => this.sendViaFormSubmit(bookingData),
        () => this.sendViaWebhook(bookingData),
        () => this.sendViaEmailAPI(bookingData)
      ];

      for (let i = 0; i < emailServices.length; i++) {
        try {
          console.log(`📧 Trying email service ${i + 1}...`);
          const result = await emailServices[i]();
          
          if (result.success) {
            console.log('✅ EMAIL SENT SUCCESSFULLY!');
            
            // Show success message to customer
            alert(`✅ BOOKING CONFIRMED & EMAIL SENT!

Booking Number: ${bookingData.bookingNumber}
Customer: ${bookingData.guestName}

✉️ Booking details sent to JS ROOMS automatically!
📞 You will receive a call within 30 minutes.

Thank you for choosing JS ROOMS!`);
            
            return result;
          }
        } catch (error) {
          console.log(`❌ Email service ${i + 1} failed:`, error.message);
          continue;
        }
      }

      // If all services fail, show manual backup
      this.showManualBackup(bookingData);
      return { success: false, message: 'All email services failed - manual backup provided' };

    } catch (error) {
      console.error('❌ REAL EMAIL SERVICE ERROR:', error);
      this.showManualBackup(bookingData);
      return { success: false, error: error.message };
    }
  }

  // Method 1: Send via Form Submit (most reliable)
  async sendViaFormSubmit(bookingData) {
    console.log('📧 Using Form Submit service...');
    
    const formData = new FormData();
    formData.append('_to', 'atchayakannan03@gmail.com');
    formData.append('_subject', `🏨 NEW BOOKING - ${bookingData.bookingNumber}`);
    formData.append('_from', bookingData.guestEmail);
    formData.append('_replyto', bookingData.guestEmail);
    formData.append('_template', 'table');
    
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
    formData.append('Payment_Method', bookingData.paymentMethod);
    formData.append('Special_Requests', bookingData.specialRequests || 'None');
    formData.append('Booking_Date', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
    
    const response = await fetch('https://formsubmit.co/atchayakannan03@gmail.com', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      return { 
        success: true, 
        service: 'FormSubmit',
        message: 'Email sent via FormSubmit to atchayakannan03@gmail.com'
      };
    } else {
      throw new Error(`FormSubmit failed: ${response.status}`);
    }
  }

  // Method 2: Send via Webhook
  async sendViaWebhook(bookingData) {
    console.log('📧 Using Webhook service...');
    
    const emailContent = {
      to: 'atchayakannan03@gmail.com',
      from: bookingData.guestEmail,
      subject: `🏨 NEW BOOKING REQUEST - ${bookingData.bookingNumber}`,
      html: this.createHTMLEmail(bookingData)
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_key: 'YOUR_ACCESS_KEY', // You'll need to get this from web3forms.com
        ...emailContent
      })
    });

    if (response.ok) {
      return { 
        success: true, 
        service: 'Web3Forms',
        message: 'Email sent via Web3Forms to atchayakannan03@gmail.com'
      };
    } else {
      throw new Error(`Web3Forms failed: ${response.status}`);
    }
  }

  // Method 3: Send via Email API
  async sendViaEmailAPI(bookingData) {
    console.log('📧 Using Email API service...');
    
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: 'service_jsrooms',
        template_id: 'template_booking',
        user_id: 'jsrooms_public_key',
        template_params: {
          to_email: 'atchayakannan03@gmail.com',
          from_name: bookingData.guestName,
          from_email: bookingData.guestEmail,
          booking_number: bookingData.bookingNumber,
          customer_name: bookingData.guestName,
          customer_phone: bookingData.guestPhone,
          customer_email: bookingData.guestEmail,
          room_type: bookingData.roomName,
          check_in: bookingData.checkIn,
          check_out: bookingData.checkOut,
          total_amount: bookingData.amount,
          message: this.createTextEmail(bookingData)
        }
      })
    });

    if (response.ok) {
      return { 
        success: true, 
        service: 'EmailJS',
        message: 'Email sent via EmailJS to atchayakannan03@gmail.com'
      };
    } else {
      throw new Error(`EmailJS failed: ${response.status}`);
    }
  }

  // Create HTML email content
  createHTMLEmail(bookingData) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 20px;">
      <div style="background: #1A1A1A; color: #FFFFFF; padding: 20px; border-radius: 10px;">
        <h1 style="color: #D4AF37; text-align: center; margin: 0;">🏨 JS ROOMS</h1>
        <h2 style="color: #D4AF37; text-align: center;">NEW BOOKING REQUEST</h2>
        
        <div style="background: #2A2A2A; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #D4AF37; margin-top: 0;">📋 Booking Details</h3>
          <p><strong>Booking Number:</strong> ${bookingData.bookingNumber}</p>
          <p><strong>Date Submitted:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        </div>

        <div style="background: #2A2A2A; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #D4AF37; margin-top: 0;">👤 Customer Information</h3>
          <p><strong>Name:</strong> ${bookingData.guestName}</p>
          <p><strong>Email:</strong> ${bookingData.guestEmail}</p>
          <p><strong>Phone:</strong> ${bookingData.guestPhone}</p>
          <p><strong>Address:</strong> ${bookingData.guestAddress}</p>
        </div>

        <div style="background: #2A2A2A; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #D4AF37; margin-top: 0;">🏠 Room Details</h3>
          <p><strong>Room Type:</strong> ${bookingData.roomName}</p>
          <p><strong>Room Number:</strong> ${bookingData.roomNumber}</p>
          <p><strong>Check-in:</strong> ${bookingData.checkIn}</p>
          <p><strong>Check-out:</strong> ${bookingData.checkOut}</p>
          <p><strong>Nights:</strong> ${bookingData.nights}</p>
          <p><strong>Guests:</strong> ${bookingData.guests}</p>
        </div>

        <div style="background: #2A2A2A; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #D4AF37; margin-top: 0;">💰 Payment Information</h3>
          <p><strong>Total Amount:</strong> ₹${bookingData.amount}</p>
          <p><strong>Payment Method:</strong> ${bookingData.paymentMethod}</p>
          <p><strong>Special Requests:</strong> ${bookingData.specialRequests || 'None'}</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #D4AF37; font-size: 16px;"><strong>📞 Contact customer at: ${bookingData.guestPhone}</strong></p>
          <p style="color: #CCCCCC;">Reply to this email to contact the customer directly.</p>
        </div>
      </div>
    </div>`;
  }

  // Create text email content
  createTextEmail(bookingData) {
    return `🏨 JS ROOMS - NEW BOOKING REQUEST

📋 BOOKING DETAILS:
Booking Number: ${bookingData.bookingNumber}
Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

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

💰 PAYMENT:
Total Amount: ₹${bookingData.amount}
Payment Method: ${bookingData.paymentMethod}
Special Requests: ${bookingData.specialRequests || 'None'}

📞 CONTACT: ${bookingData.guestPhone}

Please contact the customer to confirm booking and provide payment details.`;
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
1. Call JS ROOMS: +91 98765 43210
2. WhatsApp: +91 98765 43210
3. Email: atchayakannan03@gmail.com

Click OK to copy booking details to clipboard.`;

    if (window.confirm(message)) {
      // Copy booking details to clipboard
      const bookingText = this.createTextEmail(bookingData);
      navigator.clipboard.writeText(bookingText).then(() => {
        alert('✅ Booking details copied to clipboard!\nYou can paste and send via WhatsApp or email.');
      }).catch(() => {
        console.log('Clipboard copy failed');
      });
    }
  }

  // ===== CONTACT FORM METHODS =====

  // Send contact form message (using same reliable FormSubmit as bookings)
  async sendContactMessage(contactData) {
    try {
      console.log('📧 SENDING CONTACT MESSAGE TO JS ROOMS...');
      console.log('📧 TO: atchayakannan03@gmail.com');
      console.log('📧 FROM CUSTOMER:', contactData.email);

      // Use the same FormSubmit method that works for bookings
      const result = await this.sendContactViaFormSubmit(contactData);
      
      if (result.success) {
        console.log('✅ CONTACT EMAIL SENT SUCCESSFULLY!');
        
        // Show success message
        window.alert(`✅ MESSAGE SENT SUCCESSFULLY!

Your message has been sent to JS ROOMS.

From: ${contactData.name}
Email: ${contactData.email}
Subject: ${contactData.subject}

📞 We will contact you within 2 hours!

Thank you for contacting JS ROOMS!`);
        
        return result;
      }

      // If FormSubmit fails, show manual backup
      this.showContactManualBackup(contactData);
      return { success: false, message: 'Auto email failed - manual option provided' };

    } catch (error) {
      console.error('❌ Contact email failed:', error);
      this.showContactManualBackup(contactData);
      return { success: false, error: error.message };
    }
  }

  // Send contact message via FormSubmit (same method as bookings)
  async sendContactViaFormSubmit(contactData) {
    console.log('📧 Using FormSubmit for contact message...');
    
    const formData = new FormData();
    formData.append('_to', 'atchayakannan03@gmail.com');
    formData.append('_subject', `📞 CONTACT MESSAGE - ${contactData.subject}`);
    formData.append('_replyto', contactData.email);
    formData.append('_template', 'table');
    
    // Contact form details
    formData.append('Customer_Name', contactData.name);
    formData.append('Customer_Email', contactData.email);
    formData.append('Customer_Phone', contactData.phone);
    formData.append('Inquiry_Type', this.getInquiryTypeLabel(contactData.inquiryType));
    formData.append('Subject', contactData.subject);
    formData.append('Message', contactData.message);
    formData.append('Submitted_Date', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
    formData.append('Contact_Source', 'JS ROOMS Website Contact Form');
    
    const response = await fetch('https://formsubmit.co/atchayakannan03@gmail.com', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      return { 
        success: true, 
        service: 'FormSubmit',
        message: `Contact message sent from ${contactData.email} to atchayakannan03@gmail.com`
      };
    } else {
      throw new Error(`FormSubmit failed: ${response.status}`);
    }
  }

  // Get inquiry type label
  getInquiryTypeLabel(value) {
    const types = {
      'general': 'General Inquiry',
      'reservation': 'Reservations',
      'support': 'Guest Support'
    };
    return types[value] || value;
  }

  // Show manual backup for contact messages
  showContactManualBackup(contactData) {
    const message = `❌ AUTO EMAIL FAILED - MANUAL BACKUP

CONTACT MESSAGE FROM: ${contactData.name}
EMAIL: ${contactData.email}
PHONE: ${contactData.phone}
SUBJECT: ${contactData.subject}

Your message is saved! 

MANUAL OPTIONS:
1. Call JS ROOMS: +91 894 738 2799
2. WhatsApp: +91 894 738 2799
3. Email directly: atchayakannan03@gmail.com

Click OK to copy your message to clipboard.`;

    if (window.confirm(message)) {
      // Copy message details to clipboard
      const messageText = this.createContactTextEmail(contactData);
      navigator.clipboard.writeText(messageText).then(() => {
        alert('✅ Message details copied to clipboard!\nYou can paste and send via WhatsApp or email.');
      }).catch(() => {
        console.log('Clipboard copy failed');
      });
    }
  }

  // Create contact email text content
  createContactTextEmail(contactData) {
    return `📞 JS ROOMS - CONTACT MESSAGE

👤 CUSTOMER INFORMATION:
Name: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone}
Inquiry Type: ${this.getInquiryTypeLabel(contactData.inquiryType)}

📝 MESSAGE DETAILS:
Subject: ${contactData.subject}
Message: ${contactData.message}

📅 SUBMITTED: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
📱 SOURCE: JS ROOMS Website Contact Form

Please respond to the customer at: ${contactData.email} or ${contactData.phone}`;
  }
}

// Create singleton instance
const realEmailService = new RealEmailService();
export default realEmailService;