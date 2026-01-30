const emailService = {
    sendBookingConfirmation: async (details) => {
        console.log('Mock EmailService: Sending booking confirmation', details);
        return Promise.resolve({ success: true, message: 'Email sent successfully (mock)' });
    }
};

export default emailService;
