const emailService = {
    sendBookingConfirmation: async (details) => {
        try {
            // Reverting to FormSubmit.co for the blue-header table layout
            const response = await fetch('https://formsubmit.co/ajax/atchayakannan03@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `New Booking Request: ${details.bookingNumber}`,
                    _template: "table",
                    _captcha: "false",
                    "Booking_Number": details.bookingNumber,
                    "Customer_Name": details.guestName,
                    "Customer_Email": details.guestEmail,
                    "Customer_Phone": details.guestPhone,
                    "Customer_Address": details.guestAddress,
                    "Room_Type": details.roomName,
                    "Room_Number": details.roomNumber,
                    "Check_In": details.checkIn,
                    "Check_Out": details.checkOut,
                    "Nights": details.nights,
                    "Guests": details.guests,
                    "Total_Amount": `₹${details.amount}`,
                    "Payment_Method": details.paymentMethod,
                    "Special_Requests": details.specialRequests,
                    "Submitted_At": new Date().toLocaleString()
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
