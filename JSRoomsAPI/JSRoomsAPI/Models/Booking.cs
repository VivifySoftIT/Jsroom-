using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JSroomsAPI.Models
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }

        [Required]
        [StringLength(20)]
        public string BookingNumber { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string GuestName { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        [EmailAddress]
        public string GuestEmail { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string GuestPhone { get; set; } = string.Empty;

        [StringLength(500)]
        public string GuestAddress { get; set; } = string.Empty;

        [Required]
        public int RoomId { get; set; }

        [Required]
        [StringLength(50)]
        public string RoomName { get; set; } = string.Empty;

        [Required]
        [StringLength(10)]
        public string RoomNumber { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "date")]
        public DateTime CheckIn { get; set; }

        [Required]
        [Column(TypeName = "date")]
        public DateTime CheckOut { get; set; }

        [Required]
        public int Nights { get; set; }

        [Required]
        public int Guests { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Amount { get; set; }

        [StringLength(50)]
        public string PaymentMethod { get; set; } = "Bank Transfer";

        [StringLength(20)]
        public string PaymentStatus { get; set; } = "pending";

        [StringLength(1000)]
        public string SpecialRequests { get; set; } = string.Empty;

        [StringLength(20)]
        public string Status { get; set; } = "confirmed";

        [StringLength(20)]
        public string BookingSource { get; set; } = "Website";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property
        [ForeignKey("RoomId")]
        public virtual Room? Room { get; set; }
    }
}