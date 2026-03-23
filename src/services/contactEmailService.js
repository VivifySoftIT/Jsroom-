const contactEmailService = {
    sendContactMessage: async (formData) => {
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: "6828e5a3-4a2c-4f63-83e1-ae68229de047",
                    subject: "JSROOMS CONTACT INQUIRY",
                    _from_name: "JSROOMS Website",
                    _cc: "jsroomsarni@gmail.com",
                    _replyto: formData.email,
                    "━━━━━━━━━━━━━━━": "🔹",
                    "CUSTOMER_NAME": formData.name,
                    "CUSTOMER_EMAIL": formData.email,
                    "CUSTOMER_SUBJECT": formData.subject || "No Subject",
                    "MESSAGE_BODY": formData.message,
                    "━━━━━━━━━━━━━━━": "✅",
                    "SUBMITTED_AT": new Date().toLocaleString()
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
