using JSroomsAPI.Models.DTOs;
using JSroomsAPI.Services.Interfaces;
using System.Net.Http;
using System.Text;
using System.Text.Json;

namespace JSroomsAPI.Services
{
    public class EmailService : IEmailService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<EmailService> _logger;
        private const string JS_ROOMS_EMAIL = "atchayakannan03@gmail.com";
        private const string FORMSPREE_ENDPOINT = "https://formspree.io/f/xdkogqpv";

        public EmailService(HttpClient httpClient, ILogger<EmailService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task<bool> SendBookingNotificationAsync(BookingEmailDto bookingData)
        {
            try
            {
                _logger.LogInformation($"Sending booking email FROM customer ({bookingData.GuestEmail}) TO JS ROOMS management");

                var emailPayload = new
                {
                    from = bookingData.GuestEmail, // Send FROM customer's email
                    email = "atchayakannan03@gmail.com", // Send TO JS ROOMS
                    subject = $"🏨 Booking Request - {bookingData.BookingNumber} from {bookingData.GuestName}",
                    message = $@"Dear JS ROOMS Team,

I would like to make a hotel booking. Please find my details below:

BOOKING REQUEST: {bookingData.BookingNumber}
SUBMITTED: {DateTime.Now:yyyy-MM-dd HH:mm:ss} IST

=== MY CONTACT DETAILS ===
Name: {bookingData.GuestName}
Phone: {bookingData.GuestPhone}
Email: {bookingData.GuestEmail}
Address: {bookingData.GuestAddress}

=== BOOKING REQUIREMENTS ===
Room Type: {bookingData.RoomName}
Room Number: {bookingData.RoomNumber}
Check-in: {bookingData.CheckIn}
Check-out: {bookingData.CheckOut}
Nights: {bookingData.Nights}
Guests: {bookingData.Guests}
Total Amount: ₹{bookingData.Amount:F2}

=== SPECIAL REQUESTS ===
{(string.IsNullOrEmpty(bookingData.SpecialRequests) ? "None" : bookingData.SpecialRequests)}

Please confirm my booking and send me your bank account details for payment.
I am ready to transfer the amount within 24 hours.

You can reach me at {bookingData.GuestPhone} or reply to this email.

Thank you,
{bookingData.GuestName}

---
Booking Reference: {bookingData.BookingNumber}
Submitted via JS ROOMS website"
                };

                var jsonContent = JsonSerializer.Serialize(emailPayload);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                _httpClient.DefaultRequestHeaders.Clear();
                _httpClient.DefaultRequestHeaders.Add("Accept", "application/json");

                var response = await _httpClient.PostAsync(FORMSPREE_ENDPOINT, content);

                if (response.IsSuccessStatusCode)
                {
                    _logger.LogInformation($"✅ Booking email sent successfully FROM {bookingData.GuestEmail} TO atchayakannan03@gmail.com");
                    return true;
                }
                else
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    _logger.LogError($"❌ Email sending failed. Status: {response.StatusCode}, Content: {errorContent}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Exception occurred while sending booking notification email");
                return false;
            }
        }
    }
}