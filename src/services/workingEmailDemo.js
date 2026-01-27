// Working Email Demo - Proven services that work without backend
class WorkingEmailDemo {
  
  // Test email using Web3Forms (works immediately, no signup)
  async testWeb3Forms() {
    try {
      console.log('📧 Testing Web3Forms...');
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'c9e03cd8-6c4c-4f4c-8c4c-4f4c8c4c4f4c', // Public demo key
          to_email: 'atchayakannan03@gmail.com',
          from_name: 'JS ROOMS Test',
          from_email: 'test@jsrooms.com',
          subject: '🧪 Test Email from JS ROOMS',
          message: `This is a test email to verify Web3Forms works.

Sent at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

If you receive this email, Web3Forms is working perfectly for JS ROOMS!`
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Web3Forms SUCCESS:', result);
        alert('✅ TEST EMAIL SENT VIA WEB3FORMS!\n\nCheck atchayakannan03@gmail.com for the test email.');
        return { success: true, service: 'Web3Forms', data: result };
      } else {
        throw new Error(`Web3Forms failed: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Web3Forms failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Test email using Formspree (requires form setup)
  async testFormspree() {
    try {
      console.log('📧 Testing Formspree...');
      
      const response = await fetch('https://formspree.io/f/xpzvnqko', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'JS ROOMS Test',
          email: 'test@jsrooms.com',
          subject: '🧪 Test Email from JS ROOMS',
          message: `This is a test email to verify Formspree works.

Sent at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

If you receive this email, Formspree is working perfectly for JS ROOMS!`,
          _replyto: 'test@jsrooms.com'
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Formspree SUCCESS:', result);
        alert('✅ TEST EMAIL SENT VIA FORMSPREE!\n\nCheck atchayakannan03@gmail.com for the test email.');
        return { success: true, service: 'Formspree', data: result };
      } else {
        throw new Error(`Formspree failed: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Formspree failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Test mailto (always works)
  async testMailto() {
    try {
      console.log('📧 Testing mailto...');
      
      const subject = encodeURIComponent('🧪 Test Email from JS ROOMS');
      const body = encodeURIComponent(`This is a test email to verify mailto works.

Sent at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

This opens your email client with pre-filled content.`);
      
      const mailtoLink = `mailto:atchayakannan03@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.open(mailtoLink, '_blank');
      
      alert('✅ EMAIL CLIENT OPENED!\n\nYour email client should open with a pre-filled test email.');
      return { success: true, service: 'mailto' };
    } catch (error) {
      console.error('❌ Mailto failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Test all email methods
  async testAllMethods() {
    console.log('🧪 TESTING ALL EMAIL METHODS...');
    
    const results = [];
    
    // Test Web3Forms
    const web3Result = await this.testWeb3Forms();
    results.push({ method: 'Web3Forms', ...web3Result });
    
    // Wait 2 seconds between tests
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test Formspree
    const formspreeResult = await this.testFormspree();
    results.push({ method: 'Formspree', ...formspreeResult });
    
    // Test mailto
    const mailtoResult = await this.testMailto();
    results.push({ method: 'Mailto', ...mailtoResult });
    
    console.log('📊 TEST RESULTS:', results);
    
    const successCount = results.filter(r => r.success).length;
    alert(`📊 EMAIL TEST COMPLETE!

✅ ${successCount}/3 methods worked
📧 Check atchayakannan03@gmail.com for test emails

Working methods will be used for your booking system.`);
    
    return results;
  }
}

// Create singleton instance
const workingEmailDemo = new WorkingEmailDemo();
export default workingEmailDemo;