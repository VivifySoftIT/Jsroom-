using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using JSRoomsAPI.Services.Interfaces;
using JSRoomsAPI.Models.DTOs;
using System.ComponentModel.DataAnnotations;

namespace JSRoomsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly ILogger<EmailController> _logger;
        private readonly IConfiguration _configuration;

        public EmailController(
            IEmailService emailService,
            ILogger<EmailController> logger,
            IConfiguration configuration)
        {
            _emailService = emailService;
            _logger = logger;
            _configuration = configuration;
        }

        /// <summary>
        /// Send booking notification email to JS ROOMS management
        /// </summary>
        [HttpPost("send-booking-notification")]
        public async Task<IActionResult> SendBookingNotification([FromBody] BookingEmailDto bookingData)
        {
            try
            {
                _logger.LogInformation("📧 Received booking email request for booking: {BookingNumber}", bookingData.BookingNumber);

                // Validate required fields
                if (string.IsNullOrWhiteSpace(bookingData.GuestName) ||
                    string.IsNullOrWhiteSpace(bookingData.GuestEmail) ||
                    string.IsNullOrWhiteSpace(bookingData.BookingNumber))
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Guest name, email, and booking number are required.",
                        Data = null
                    });
                }

                // Send booking notification email
                var result = await _emailService.SendBookingNotificationAsync(bookingData);

                if (result.Success)
                {
                    _logger.LogInformation("✅ Booking email sent successfully for booking: {BookingNumber}", bookingData.BookingNumber);
                    
                    return Ok(new ApiResponse<object>
                    {
                        Success = true,
                        Message = "Booking notification email sent successfully",
                        Data = new
                        {
                            BookingNumber = bookingData.BookingNumber,
                            SentTo = "atchayakannan03@gmail.com",
                            SentFrom = bookingData.GuestEmail,
                            Timestamp = DateTime.UtcNow
                        }
                    });
                }
                else
                {
                    _logger.LogError("❌ Failed to send booking email: {Error}", result.Message);
                    
                    return StatusCode(500, new ApiResponse<object>
                    {
                        Success = false,
                        Message = result.Message ?? "Failed to send booking notification email",
                        Data = null
                    });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Error sending booking notification email");
                
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = "Internal server error while sending email",
                    Data = null
                });
            }
        }

        /// <summary>
        /// Send contact form message to JS ROOMS management
        /// </summary>
        [HttpPost("send-contact-message")]
        public async Task<IActionResult> SendContactMessage([FromBody] ContactEmailDto contactData)
        {
            try
            {
                _logger.LogInformation("📧 Received contact email request from: {CustomerEmail}", contactData.CustomerEmail);

                // Validate required fields
                if (string.IsNullOrWhiteSpace(contactData.CustomerName) ||
                    string.IsNullOrWhiteSpace(contactData.CustomerEmail) ||
                    string.IsNullOrWhiteSpace(contactData.Subject) ||
                    string.IsNullOrWhiteSpace(contactData.Message))
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Customer name, email, subject, and message are required.",
                        Data = null
                    });
                }

                // Send contact message email
                var result = await _emailService.SendContactMessageAsync(contactData);

                if (result.Success)
                {
                    _logger.LogInformation("✅ Contact email sent successfully from: {CustomerEmail}", contactData.CustomerEmail);
                    
                    return Ok(new ApiResponse<object>
                    {
                        Success = true,
                        Message = "Contact message sent successfully",
                        Data = new
                        {
                            CustomerName = contactData.CustomerName,
                            SentTo = "atchayakannan03@gmail.com",
                            SentFrom = contactData.CustomerEmail,
                            Subject = contactData.Subject,
                            Timestamp = DateTime.UtcNow
                        }
                    });
                }
                else
                {
                    _logger.LogError("❌ Failed to send contact email: {Error}", result.Message);
                    
                    return StatusCode(500, new ApiResponse<object>
                    {
                        Success = false,
                        Message = result.Message ?? "Failed to send contact message",
                        Data = null
                    });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Error sending contact message email");
                
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = "Internal server error while sending email",
                    Data = null
                });
            }
        }

        /// <summary>
        /// Test email functionality
        /// </summary>
        [HttpPost("test")]
        public async Task<IActionResult> TestEmail()
        {
            try
            {
                _logger.LogInformation("🧪 Testing email functionality");

                var testBooking = new BookingEmailDto
                {
                    BookingNumber = "TEST" + DateTime.Now.ToString("yyyyMMddHHmmss"),
                    GuestName = "Test Customer",
                    GuestEmail = "test@jsrooms.com",
                    GuestPhone = "+91 9876543210",
                    GuestAddress = "Test Address, Chennai, Tamil Nadu, India",
                    RoomName = "Single AC Room",
                    RoomNumber = "101",
                    CheckIn = DateTime.Now.AddDays(1).ToString("yyyy-MM-dd"),
                    CheckOut = DateTime.Now.AddDays(3).ToString("yyyy-MM-dd"),
                    Nights = 2,
                    Guests = 1,
                    Amount = 1200,
                    PaymentMethod = "Bank Transfer",
                    SpecialRequests = "Test booking for email system verification"
                };

                var result = await _emailService.SendBookingNotificationAsync(testBooking);

                if (result.Success)
                {
                    return Ok(new ApiResponse<object>
                    {
                        Success = true,
                        Message = "Test email sent successfully",
                        Data = new
                        {
                            TestBookingNumber = testBooking.BookingNumber,
                            SentTo = "atchayakannan03@gmail.com",
                            Timestamp = DateTime.UtcNow
                        }
                    });
                }
                else
                {
                    return StatusCode(500, new ApiResponse<object>
                    {
                        Success = false,
                        Message = result.Message ?? "Test email failed",
                        Data = null
                    });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Error testing email functionality");
                
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = "Test email failed: " + ex.Message,
                    Data = null
                });
            }
        }
    }
}