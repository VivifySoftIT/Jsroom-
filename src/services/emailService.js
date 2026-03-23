const emailService = {
    sendBookingConfirmation: async (details) => {
        try {
            // Reverting to FormSubmit.co for the blue-header table layout
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: "6828e5a3-4a2c-4f63-83e1-ae68229de047",
                    subject: `BOOKING REFERENCE: ${details.bookingNumber}`,
                    _from_name: "JSROOMS Website",
                    _cc: "jsroomsarni@gmail.com",
                    "━━━━━━━━━━━━━━━": "🔹",
                    "CUSTOMER_NAME": details.guestName,
                    "CUSTOMER_EMAIL": details.guestEmail,
                    "CUSTOMER_PHONE": details.guestPhone,
                    "ROOM_TYPE": details.roomName,
                    "STAY_PERIOD": `${details.checkIn} to ${details.checkOut}`,
                    "NUMBER_OF_NIGHTS": details.nights,
                    "TOTAL_AMOUNT": `₹${details.amount}`,
                    "SPECIAL_REQUESTS": details.specialRequests || "None",
                    "━━━━━━━━━━━━━━━": "✅",
                    "SUBMITTED_AT": new Date().toLocaleString()
                })
            });

            const result = await response.json();
            return { success: result.success, message: result.message };
        } catch (error) {
            console.error('Email Error:', error);
            return { success: false, error: error.message };
        }
    }
};

export default emailService;
