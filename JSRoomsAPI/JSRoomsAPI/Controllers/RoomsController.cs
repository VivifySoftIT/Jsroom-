using Microsoft.AspNetCore.Mvc;
using JSroomsAPI.Data;
using JSroomsAPI.Models;
using Microsoft.EntityFrameworkCore;
using JSroomsAPI.Models.DTOs;

namespace JSroomsAPI.Controllers
{
    [ApiController]
    [Route("api/rooms")]
    public class RoomsController : ControllerBase
    {
        private readonly JSroomsDbContext _context;

        public RoomsController(JSroomsDbContext context)
        {
            _context = context;
        }

        #region Category Methods

        /// <summary>
        /// Get all active room categories
        /// </summary>
        /// <returns>List of active room categories</returns>
        [HttpGet("GetActiveCategories")]
        public async Task<IActionResult> GetActiveCategories()
        {
            try
            {
                var categories = await _context.Categories
                    .Where(c => c.IsActive)
                    .Select(c => new CategoryDto
                    {
                        CategoryId = c.CategoryId,
                        CategoryName = c.CategoryName
                    })
                    .ToListAsync();

                return Ok(new ApiResponse<List<CategoryDto>>
                {
                    Success = true,
                    Data = categories
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<List<CategoryDto>>
                {
                    Success = false,
                    Message = "An error occurred while fetching categories: " + ex.Message,
                    Data = null
                });
            }
        }

        #endregion
    }
}