using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JSroomsAPI.Data;
using JSroomsAPI.Models;
using JSroomsAPI.Models.DTOs;
using System.Text.Json;
using ApiResponse = JSroomsAPI.Models.ApiResponse<object>;

namespace JSroomsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly JSroomsDbContext _context;

        public RoomsController(JSroomsDbContext context)
        {
            _context = context;
        }

        // GET: api/rooms
        [HttpGet]
        public async Task<ActionResult<JSroomsAPI.Models.ApiResponse<IEnumerable<RoomDto>>>> GetRooms()
        {
            try
            {
                var rooms = await _context.Rooms
                    .Include(r => r.Category)
                    .Where(r => r.IsActive)
                    .OrderBy(r => r.CategoryId)
                    .ThenBy(r => r.RoomNumber)
                    .Select(r => new RoomDto
                    {
                        RoomId = r.RoomId,
                        RoomNumber = r.RoomNumber,
                        RoomName = r.RoomName,
                        CategoryId = r.CategoryId,
                        CategoryName = r.CategoryName,
                        Description = r.Description,
                        Price = r.Price,
                        OriginalPrice = r.OriginalPrice,
                        Size = r.Size,
                        MaxGuests = r.MaxGuests,
                        BedConfiguration = r.BedConfiguration,
                        Floor = r.Floor,
                        View = r.View,
                        Status = r.Status,
                        IsAC = r.IsAC,
                        AcType = r.AcType,
                        IsPopular = r.IsPopular,
                        Rating = r.Rating,
                        RatingCount = r.RatingCount,
                        ImageUrl = r.ImageUrl,
                        ImageAlt = r.ImageAlt,
                        Amenities = string.IsNullOrEmpty(r.Amenities) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(r.Amenities) ?? new List<string>(),
                        LastCleaned = r.LastCleaned,
                        LastMaintenance = r.LastMaintenance,
                        CreatedAt = r.CreatedAt
                    })
                    .ToListAsync();

                return Ok(new JSroomsAPI.Models.ApiResponse<IEnumerable<RoomDto>>
                {
                    Success = true,
                    Message = "Rooms retrieved successfully",
                    Data = rooms
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new JSroomsAPI.Models.ApiResponse<IEnumerable<RoomDto>>
                {
                    Success = false,
                    Message = $"Error retrieving rooms: {ex.Message}"
                });
            }
        }

        // GET: api/rooms/GetActiveCategories
        [HttpGet("GetActiveCategories")]
        public async Task<ActionResult<JSroomsAPI.Models.ApiResponse<IEnumerable<CategoryDto>>>> GetActiveCategories()
        {
            try
            {
                var categories = await _context.Categories
                    .Where(c => c.IsActive)
                    .Select(c => new CategoryDto
                    {
                        CategoryId = c.CategoryId,
                        CategoryName = c.CategoryName,
                        IsActive = c.IsActive,
                        CreatedAt = c.CreatedAt
                    })
                    .ToListAsync();

                return Ok(new JSroomsAPI.Models.ApiResponse<IEnumerable<CategoryDto>>
                {
                    Success = true,
                    Message = "Categories retrieved successfully",
                    Data = categories
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new JSroomsAPI.Models.ApiResponse<IEnumerable<CategoryDto>>
                {
                    Success = false,
                    Message = $"Error retrieving categories: {ex.Message}"
                });
            }
        }

        // GET: api/rooms/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<JSroomsAPI.Models.ApiResponse<RoomDto>>> GetRoom(int id)
        {
            try
            {
                var room = await _context.Rooms
                    .Include(r => r.Category)
                    .Where(r => r.RoomId == id && r.IsActive)
                    .Select(r => new RoomDto
                    {
                        RoomId = r.RoomId,
                        RoomNumber = r.RoomNumber,
                        RoomName = r.RoomName,
                        CategoryId = r.CategoryId,
                        CategoryName = r.CategoryName,
                        Description = r.Description,
                        Price = r.Price,
                        OriginalPrice = r.OriginalPrice,
                        Size = r.Size,
                        MaxGuests = r.MaxGuests,
                        BedConfiguration = r.BedConfiguration,
                        Floor = r.Floor,
                        View = r.View,
                        Status = r.Status,
                        IsAC = r.IsAC,
                        AcType = r.AcType,
                        IsPopular = r.IsPopular,
                        Rating = r.Rating,
                        RatingCount = r.RatingCount,
                        ImageUrl = r.ImageUrl,
                        ImageAlt = r.ImageAlt,
                        Amenities = string.IsNullOrEmpty(r.Amenities) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(r.Amenities) ?? new List<string>(),
                        LastCleaned = r.LastCleaned,
                        LastMaintenance = r.LastMaintenance,
                        CreatedAt = r.CreatedAt
                    })
                    .FirstOrDefaultAsync();

                if (room == null)
                {
                    return NotFound(new JSroomsAPI.Models.ApiResponse<RoomDto>
                    {
                        Success = false,
                        Message = "Room not found"
                    });
                }

                return Ok(new JSroomsAPI.Models.ApiResponse<RoomDto>
                {
                    Success = true,
                    Message = "Room retrieved successfully",
                    Data = room
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new JSroomsAPI.Models.ApiResponse<RoomDto>
                {
                    Success = false,
                    Message = $"Error retrieving room: {ex.Message}"
                });
            }
        }
    }
}