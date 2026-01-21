using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace JSRoomsAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        public DateTime? DateOfBirth { get; set; }

        public string? Avatar { get; set; }

        public int LoyaltyPoints { get; set; } = 0;

        public bool IsActive { get; set; } = true;

        public DateTime? LastLogin { get; set; }

        // Address Information
        public string? Street { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
        public string? ZipCode { get; set; }

        // Preferences
        public RoomType? PreferredRoomType { get; set; }
        public BedType? PreferredBedType { get; set; }
        public SmokingPreference SmokingPreference { get; set; } = SmokingPreference.NonSmoking;
        public FloorPreference FloorPreference { get; set; } = FloorPreference.NoPreference;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public virtual ICollection<RoomReview> RoomReviews { get; set; } = new List<RoomReview>();
        public virtual ICollection<ServiceReview> ServiceReviews { get; set; } = new List<ServiceReview>();

        // Computed Properties
        public string FullName => $"{FirstName} {LastName}";
        
        public string LoyaltyTier
        {
            get
            {
                return LoyaltyPoints switch
                {
                    >= 1000 => "Gold",
                    >= 500 => "Silver",
                    _ => "Bronze"
                };
            }
        }
    }

    public enum RoomType
    {
        Standard,
        Executive,
        Suite,
        Family,
        Presidential
    }

    public enum BedType
    {
        Single,
        Double,
        Queen,
        King
    }

    public enum SmokingPreference
    {
        NonSmoking,
        Smoking
    }

    public enum FloorPreference
    {
        Low,
        High,
        NoPreference
    }
}