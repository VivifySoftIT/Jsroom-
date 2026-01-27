using System.ComponentModel.DataAnnotations;

namespace JSroomsAPI.Models.DTOs
{
    public class BookingDto
    {
        public int BookingId { get; set; }
        public string BookingNumber { get; set; } = string.Empty;
        public string GuestName { get; set; } = string.Empty;
        public string GuestEmail { get; set; } = string.Empty;
        public string GuestPhone { get; set; } = string.Empty;
        public string GuestAddress { get; set; } = string.Empty;
        public int RoomId { get; set; }
        public string RoomName { get; set; } = string.Empty;
        public string RoomNumber { get; set; } = string.Empty;
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public int Nights { get; set; }
        public int Guests { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public string PaymentStatus { get; set; } = string.Empty;
        public string SpecialRequests { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string BookingSource { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    public class CreateBookingDto
    {
        [Required]
        public string GuestName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string GuestEmail { get; set; } = string.Empty;

        [Required]
        public string GuestPhone { get; set; } = string.Empty;

        public string GuestAddress { get; set; } = string.Empty;

        [Required]
        public int RoomId { get; set; }

        [Required]
        public string RoomName { get; set; } = string.Empty;

        [Required]
        public string RoomNumber { get; set; } = string.Empty;

        [Required]
        public DateTime CheckIn { get; set; }

        [Required]
        public DateTime CheckOut { get; set; }

        [Required]
        public int Nights { get; set; }

        [Required]
        public int Guests { get; set; }

        [Required]
        public decimal Amount { get; set; }

        public string PaymentMethod { get; set; } = "Bank Transfer";
        public string SpecialRequests { get; set; } = string.Empty;
        public string BookingSource { get; set; } = "Website";
    }

    public class UpdateBookingDto
    {
        public string? Status { get; set; }
        public string? PaymentStatus { get; set; }
        public string? SpecialRequests { get; set; }
    }
}