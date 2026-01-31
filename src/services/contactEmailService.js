const contactEmailService = {
    sendContactMessage: async (formData) => {
        try {
            const response = await fetch('https://formsubmit.co/ajax/atchayakannan03@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `New Contact Message from ${formData.name}`,
                    _template: "table",
                    _captcha: "false",
                    "Customer_Name": formData.name,
                    "Customer_Email": formData.email,
                    "Subject": formData.subject,
                    "Message": formData.message,
                    "Submitted_At": new Date().toLocaleString()
                })
            });

            const result = await response.json();
            return { success: result.success, message: result.message };
        } catch (error) {
            console.error('Contact Email Error:', error);
            return { success: false, error: error.message };
        }
    }
};

export default contactEmailService;
