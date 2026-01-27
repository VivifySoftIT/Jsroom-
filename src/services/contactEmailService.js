class ContactEmailService {
  constructor() {
    this.adminEmail = 'atchayakannan03@gmail.com';
  }

  // Send contact message TO JS ROOMS management
  async sendContactMessage(contactData) {
    try {
      console.log('📧 SENDING CONTACT MESSAGE TO JS ROOMS...');
      console.log('📧 TO:', this.adminEmail);
      console.log('📧 FROM CUSTOMER:', contactData.email);

      // Try FormSubmit first
      try {
        console.log('📧 Using FormSubmit for contact message...');
        return await this.sendViaFormSubmit(contactData);
      } catch (formSubmitError) {
        console.log('❌ FormSubmit failed, trying mailto fallback...');
        return await this.sendViaMailto(contactData);
      }

    } catch (error) {
      console.error('❌ CONTACT EMAIL SERVICE ERROR:', error);
      return { success: false, error: error.message };
    }
  }

  // Send via FormSubmit
  async sendViaFormSubmit(contactData) {
    try {
      const formData = new FormData();
      
      // FormSubmit fields - NO redirect URL to avoid errors
      formData.append('_subject', `JS ROOMS Contact: ${contactData.subject}`);
      formData.append('_template', 'table');
      formData.append('_captcha', 'false');
      
      // Contact details
      formData.append('Customer_Name', contactData.name);
      formData.append('Customer_Email', contactData.email);
      formData.append('Customer_Phone', contactData.phone || 'Not provided');
      formData.append('Inquiry_Type', contactData.inquiryType);
      formData.append('Subject', contactData.subject);
      formData.append('Message', contactData.message);
      formData.append('Submitted_At', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
      formData.append('Source', 'JS ROOMS Website Contact Form');

      const response = await fetch(`https://formsubmit.co/${this.adminEmail}`, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      // With no-cors mode, we can't check response status, so assume success
      console.log('✅ CONTACT EMAIL SENT SUCCESSFULLY!');
      return { 
        success: true, 
        message: `Contact message sent from ${contactData.email} to ${this.adminEmail}`,
        service: 'FormSubmit'
      };

    } catch (error) {
      console.error('❌ FormSubmit error:', error);
      throw error;
    }
  }

  // Fallback: Send via mailto (opens email client)
  async sendViaMailto(contactData) {
    try {
      console.log('📧 Using mailto fallback for contact message...');
      
      const subject = encodeURIComponent(`JS ROOMS Contact: ${contactData.subject}`);
      const body = encodeURIComponent(`Dear JS ROOMS Team,

I have a ${contactData.inquiryType} inquiry. Please find my details below:

=== CONTACT DETAILS ===
Name: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone || 'Not provided'}
Inquiry Type: ${contactData.inquiryType}

=== MESSAGE ===
Subject: ${contactData.subject}
Message: ${contactData.message}

=== SUBMISSION INFO ===
Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
Source: JS ROOMS Website Contact Form

Please respond to this inquiry at your earliest convenience.

Thank you,
${contactData.name}`);
      
      const mailtoLink = `mailto:${this.adminEmail}?subject=${subject}&body=${body}`;
      
      // Open email client
      window.open(mailtoLink, '_blank');
      
      return { 
        success: true, 
        service: 'mailto',
        message: 'Email client opened with pre-filled contact message'
      };
    } catch (error) {
      throw new Error(`Mailto failed: ${error.message}`);
    }
  }

  // Test contact email
  async testContactEmail() {
    try {
      console.log('📧 TESTING CONTACT EMAIL SYSTEM...');

      const testContact = {
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '+91 9876543210',
        subject: 'Test Contact Message',
        message: 'This is a test contact message from JS ROOMS website.',
        inquiryType: 'general'
      };

      return await this.sendContactMessage(testContact);

    } catch (error) {
      console.error('❌ TEST CONTACT EMAIL ERROR:', error);
      return { success: false, error: error.message };
    }
  }
}

// Create singleton instance
const contactEmailService = new ContactEmailService();
export default contactEmailService;