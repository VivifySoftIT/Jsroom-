using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JSroomsAPI.Data;
using JSroomsAPI.Models;
using JSroomsAPI.Models.DTOs;
using JSroomsAPI.Services.Interfaces;
using System.Text.Json;

namespace JSroomsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly JSroomsDbContext _context;
        private readonly IEmailService _emailService;

        public BookingsController(JSroomsDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        // GET: api/bookings
        [HttpGet]
        public async Task<ActionResult<JSroomsAPI.Models.ApiResponse<IEnumerable<BookingDto>>>> GetBookings()
        {
            try
            {
                var bookings = await _context.Bookings
                    .Include(b => b.Room)
                    .OrderByDescending(b => b.CreatedAt)
                    .Select(b => new BookingDto
                    {
                        BookingId = b.BookingId,
                        BookingNumber = b.BookingNumber,
                        GuestName = b.GuestName,
                        GuestEmail = b.GuestEmail,
                        GuestPhone = b.GuestPhone,
                        GuestAddress = b.GuestAddress,
                        RoomId = b.RoomId,
                        RoomName = b.RoomName,
                        RoomNumber = b.RoomNumber,
                        CheckIn = b.CheckIn,
                        CheckOut = b.CheckOut,
                        Nights = b.Nights,
                        Guests = b.Guests,
                        Amount = b.Amount,
                        PaymentMethod = b.PaymentMethod,
                        PaymentStatus = b.PaymentStatus,
                        SpecialRequests = b.SpecialRequests,
                        Status = b.Status,
                        BookingSource = b.BookingSource,
                        CreatedAt = b.CreatedAt
                    })
                    .ToListAsync();

                return Ok(new JSroomsAPI.Models.ApiResponse<IEnumerable<BookingDto>>
                {
                    Success = true,
                    Message = "Bookings retrieved successfully",
                    Data = bookings
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new JSroomsAPI.Models.ApiResponse<IEnumerable<BookingDto>>
                {
                    Success = false,
                    Message = $"Error retrieving bookings: {ex.Message}"
                });
            }
        }

        // GET: api/bookings/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<JSroomsAPI.Models.ApiResponse<BookingDto>>> GetBooking(int id)
        {
            try
            {
                var booking = await _context.Bookings
                    .Include(b => b.Room)
                    .Where(b => b.BookingId == id)
                    .Select(b => new BookingDto
                    {
                        BookingId = b.BookingId,
                        BookingNumber = b.BookingNumber,
                        GuestName = b.GuestName,
                        GuestEmail = b.GuestEmail,
                        GuestPhone = b.GuestPhone,
                        GuestAddress = b.GuestAddress,
                        RoomId = b.RoomId,
                        RoomName = b.RoomName,
                        RoomNumber = b.RoomNumber,
                        CheckIn = b.CheckIn,
                        CheckOut = b.CheckOut,
                        Nights = b.Nights,
                        Guests = b.Guests,
                        Amount = b.Amount,
                        PaymentMethod = b.PaymentMethod,
                        PaymentStatus = b.PaymentStatus,
                        SpecialRequests = b.SpecialRequests,
                        Status = b.Status,
                        BookingSource = b.BookingSource,
                        CreatedAt = b.CreatedAt
                    })
                    .FirstOrDefaultAsync();

                if (booking == null)
                {
                    return NotFound(new JSroomsAPI.Models.ApiResponse<BookingDto>
                    {
                        Success = false,
                        Message = "Booking not found"
                    });
                }

                return Ok(new JSroomsAPI.Models.ApiResponse<BookingDto>
                {
                    Success = true,
                    Message = "Booking retrieved successfully",
                    Data = booking
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new JSroomsAPI.Models.ApiResponse<BookingDto>
                {
                    Success = false,
                    Message = $"Error retrieving booking: {ex.Message}"
                });
            }
        }

        // POST: api/bookings
        [HttpPost]
        public async Task<ActionResult<JSroomsAPI.Models.ApiResponse<BookingDto>>> CreateBooking(CreateBookingDto createBookingDto)
        {
            try
            {
                // Generate booking number
                var bookingNumber = "JSR" + DateTime.Now.ToString("yyyyMMddHHmmss");

                var booking = new Booking
                {
                    BookingNumber = bookingNumber,
                    GuestName = createBookingDto.GuestName,
                    GuestEmail = createBookingDto.GuestEmail,
                    GuestPhone = createBookingDto.GuestPhone,
                    GuestAddress = createBookingDto.GuestAddress,
                    RoomId = createBookingDto.RoomId,
                    RoomName = createBookingDto.RoomName,
                    RoomNumber = createBookingDto.RoomNumber,
                    CheckIn = createBookingDto.CheckIn,
                    CheckOut = createBookingDto.CheckOut,
                    Nights = createBookingDto.Nights,
                    Guests = createBookingDto.Guests,
                    Amount = createBookingDto.Amount,
                    PaymentMethod = createBookingDto.PaymentMethod,
                    SpecialRequests = createBookingDto.SpecialRequests,
                    BookingSource = createBookingDto.BookingSource,
                    Status = "confirmed",
                    PaymentStatus = "pending",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Bookings.Add(booking);
                await _context.SaveChangesAsync();

                // Send email notification
                try
                {
                    var emailDto = new BookingEmailDto
                    {
                        BookingNumber = booking.BookingNumber,
                        GuestName = booking.GuestName,
                        GuestEmail = booking.GuestEmail,
                        GuestPhone = booking.GuestPhone,
                        GuestAddress = booking.GuestAddress,
                        RoomName = booking.RoomName,
                        RoomNumber = booking.RoomNumber,
                        CheckIn = booking.CheckIn.ToString("yyyy-MM-dd"),
                        CheckOut = booking.CheckOut.ToString("yyyy-MM-dd"),
                        Nights = booking.Nights,
                        Guests = booking.Guests,
                        Amount = booking.Amount,
                        PaymentMethod = booking.PaymentMethod,
                        SpecialRequests = booking.SpecialRequests
                    };

                    await _emailService.SendBookingNotificationAsync(emailDto);
                }
                catch (Exception emailEx)
                {
                    // Log email error but don't fail the booking
                    Console.WriteLine($"Email notification failed: {emailEx.Message}");
                }

                var bookingDto = new BookingDto
                {
                    BookingId = booking.BookingId,
                    BookingNumber = booking.BookingNumber,
                    GuestName = booking.GuestName,
                    GuestEmail = booking.GuestEmail,
                    GuestPhone = booking.GuestPhone,
                    GuestAddress = booking.GuestAddress,
                    RoomId = booking.RoomId,
                    RoomName = booking.RoomName,
                    RoomNumber = booking.RoomNumber,
                    CheckIn = booking.CheckIn,
                    CheckOut = booking.CheckOut,
                    Nights = booking.Nights,
                    Guests = booking.Guests,
                    Amount = booking.Amount,
                    PaymentMethod = booking.PaymentMethod,
                    PaymentStatus = booking.PaymentStatus,
                    SpecialRequests = booking.SpecialRequests,
                    Status = booking.Status,
                    BookingSource = booking.BookingSource,
                    CreatedAt = booking.CreatedAt
                };

                return CreatedAtAction(nameof(GetBooking), new { id = booking.BookingId }, 
                    new JSroomsAPI.Models.ApiResponse<BookingDto>
                    {
                        Success = true,
                        Message = "Booking created successfully",
                        Data = bookingDto
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new JSroomsAPI.Models.ApiResponse<BookingDto>
                {
                    Success = false,
                    Message = $"Error creating booking: {ex.Message}"
                });
            }
        }

        // PUT: api/bookings/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<JSroomsAPI.Models.ApiResponse<BookingDto>>> UpdateBooking(int id, UpdateBookingDto updateBookingDto)
        {
            try
            {
                var booking = await _context.Bookings.FindAsync(id);
                if (booking == null)
                {
                    return NotFound(new JSroomsAPI.Models.ApiResponse<BookingDto>
                    {
                        Success = false,
                        Message = "Booking not found"
                    });
                }

                // Update only provided fields
                if (!string.IsNullOrEmpty(updateBookingDto.Status))
                    booking.Status = updateBookingDto.Status;
                
                if (!string.IsNullOrEmpty(updateBookingDto.PaymentStatus))
                    booking.PaymentStatus = updateBookingDto.PaymentStatus;
                
                if (!string.IsNullOrEmpty(updateBookingDto.SpecialRequests))
                    booking.SpecialRequests = updateBookingDto.SpecialRequests;

                booking.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                var bookingDto = new BookingDto
                {
                    BookingId = booking.BookingId,
                    BookingNumber = booking.BookingNumber,
                    GuestName = booking.GuestName,
                    GuestEmail = booking.GuestEmail,
                    GuestPhone = booking.GuestPhone,
                    GuestAddress = booking.GuestAddress,
                    RoomId = booking.RoomId,
                    RoomName = booking.RoomName,
                    RoomNumber = booking.RoomNumber,
                    CheckIn = booking.CheckIn,
                    CheckOut = booking.CheckOut,
                    Nights = booking.Nights,
                    Guests = booking.Guests,
                    Amount = booking.Amount,
                    PaymentMethod = booking.PaymentMethod,
                    PaymentStatus = booking.PaymentStatus,
                    SpecialRequests = booking.SpecialRequests,
                    Status = booking.Status,
                    BookingSource = booking.BookingSource,
                    CreatedAt = booking.CreatedAt
                };

                return Ok(new JSroomsAPI.Models.ApiResponse<BookingDto>
                {
                    Success = true,
                    Message = "Booking updated successfully",
                    Data = bookingDto
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new JSroomsAPI.Models.ApiResponse<BookingDto>
                {
                    Success = false,
                    Message = $"Error updating booking: {ex.Message}"
                });
            }
        }

        // DELETE: api/bookings/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<JSroomsAPI.Models.ApiResponse<object>>> DeleteBooking(int id)
        {
            try
            {
                var booking = await _context.Bookings.FindAsync(id);
                if (booking == null)
                {
                    return NotFound(new JSroomsAPI.Models.ApiResponse<object>
                    {
                        Success = false,
                        Message = "Booking not found"
                    });
                }

                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();

                return Ok(new JSroomsAPI.Models.ApiResponse<object>
                {
                    Success = true,
                    Message = "Booking deleted successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new JSroomsAPI.Models.ApiResponse<object>
                {
                    Success = false,
                    Message = $"Error deleting booking: {ex.Message}"
                });
            }
        }

        // GET: api/bookings/stats
        [HttpGet("stats")]
        public async Task<ActionResult<JSroomsAPI.Models.ApiResponse<object>>> GetBookingStats()
        {
            try
            {
                var totalBookings = await _context.Bookings.CountAsync();
                var todayBookings = await _context.Bookings
                    .Where(b => b.CreatedAt.Date == DateTime.UtcNow.Date)
                    .CountAsync();
                var monthlyBookings = await _context.Bookings
                    .Where(b => b.CreatedAt.Month == DateTime.UtcNow.Month && b.CreatedAt.Year == DateTime.UtcNow.Year)
                    .CountAsync();
                var totalRevenue = await _context.Bookings.SumAsync(b => b.Amount);
                var monthlyRevenue = await _context.Bookings
                    .Where(b => b.CreatedAt.Month == DateTime.UtcNow.Month && b.CreatedAt.Year == DateTime.UtcNow.Year)
                    .SumAsync(b => b.Amount);

                var stats = new
                {
                    totalBookings,
                    todayBookings,
                    monthlyBookings,
                    totalRevenue,
                    monthlyRevenue
                };

                return Ok(new JSroomsAPI.Models.ApiResponse<object>
                {
                    Success = true,
                    Message = "Booking statistics retrieved successfully",
                    Data = stats
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new JSroomsAPI.Models.ApiResponse<object>
                {
                    Success = false,
                    Message = $"Error retrieving booking statistics: {ex.Message}"
                });
            }
        }
    }
}