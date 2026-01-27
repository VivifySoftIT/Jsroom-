using System.ComponentModel.DataAnnotations;

namespace JSroomsAPI.Models.DTOs
{
    public class RoomDto
    {
        public int RoomId { get; set; }
        public string RoomNumber { get; set; } = string.Empty;
        public string RoomName { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal? OriginalPrice { get; set; }
        public string Size { get; set; } = string.Empty;
        public int MaxGuests { get; set; }
        public string BedConfiguration { get; set; } = string.Empty;
        public int Floor { get; set; }
        public string View { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public bool IsAC { get; set; }
        public string AcType { get; set; } = string.Empty;
        public bool IsPopular { get; set; }
        public decimal Rating { get; set; }
        public int RatingCount { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string ImageAlt { get; set; } = string.Empty;
        public List<string> Amenities { get; set; } = new List<string>();
        public DateTime? LastCleaned { get; set; }
        public DateTime? LastMaintenance { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateRoomDto
    {
        [Required]
        public string RoomNumber { get; set; } = string.Empty;

        [Required]
        public string RoomName { get; set; } = string.Empty;

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public string CategoryName { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        [Required]
        public decimal Price { get; set; }

        public decimal? OriginalPrice { get; set; }

        public string Size { get; set; } = string.Empty;

        [Required]
        public int MaxGuests { get; set; }

        public string BedConfiguration { get; set; } = string.Empty;

        public int Floor { get; set; } = 1;

        public string View { get; set; } = "City View";

        [Required]
        public bool IsAC { get; set; }

        public bool IsPopular { get; set; } = false;

        public string ImageUrl { get; set; } = string.Empty;

        public string ImageAlt { get; set; } = string.Empty;

        public List<string> Amenities { get; set; } = new List<string>();
    }

    public class UpdateRoomDto
    {
        public string? RoomName { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public decimal? OriginalPrice { get; set; }
        public string? Status { get; set; }
        public bool? IsPopular { get; set; }
        public List<string>? Amenities { get; set; }
    }
}