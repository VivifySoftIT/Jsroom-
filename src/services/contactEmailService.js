const contactEmailService = {
    sendContactMessage: async (formData) => {
        console.log('Mock ContactEmailService: Sending message', formData);
        return Promise.resolve({ success: true });
    }
};

export default contactEmailService;
