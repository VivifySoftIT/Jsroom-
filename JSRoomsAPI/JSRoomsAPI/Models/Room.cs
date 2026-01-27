using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JSroomsAPI.Models
{
    [Table("Rooms")]
    public class Room
    {
        [Key]
        public int RoomId { get; set; }

        [Required]
        [StringLength(10)]
        public string RoomNumber { get; set; } = string.Empty;

        [Required]
        [StringLength(200)]
        public string RoomName { get; set; } = string.Empty;

        [Required]
        public int CategoryId { get; set; }

        [Required]
        [StringLength(50)]
        public string CategoryName { get; set; } = string.Empty;

        [StringLength(500)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "decimal(8,2)")]
        public decimal Price { get; set; }

        [Column(TypeName = "decimal(8,2)")]
        public decimal? OriginalPrice { get; set; }

        [StringLength(20)]
        public string Size { get; set; } = string.Empty;

        [Required]
        public int MaxGuests { get; set; } = 1;

        [StringLength(50)]
        public string BedConfiguration { get; set; } = string.Empty;

        public int Floor { get; set; } = 1;

        [StringLength(50)]
        public string View { get; set; } = "City View";

        [StringLength(20)]
        public string Status { get; set; } = "available";

        public bool IsAC { get; set; } = true;

        [StringLength(10)]
        public string AcType { get; set; } = "ac"; // "ac" or "non-ac"

        public bool IsPopular { get; set; } = false;

        [Column(TypeName = "decimal(3,2)")]
        public decimal Rating { get; set; } = 0;

        public int RatingCount { get; set; } = 0;

        [StringLength(1000)]
        public string ImageUrl { get; set; } = string.Empty;

        [StringLength(100)]
        public string ImageAlt { get; set; } = string.Empty;

        [StringLength(500)]
        public string Amenities { get; set; } = string.Empty; // JSON string of amenities

        [Column(TypeName = "date")]
        public DateTime? LastCleaned { get; set; }

        [Column(TypeName = "date")]
        public DateTime? LastMaintenance { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        [ForeignKey("CategoryId")]
        public virtual Category? Category { get; set; }

        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}