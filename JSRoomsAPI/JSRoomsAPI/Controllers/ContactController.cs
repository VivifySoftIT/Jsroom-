using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JSroomsAPI.Data;
using JSroomsAPI.Models;
using JSroomsAPI.Models.DTOs;

namespace JSroomsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly JSroomsDbContext _context;

        public ContactController(JSroomsDbContext context)
        {
            _context = context;
        }

        // GET: api/contact
        [HttpGet]
        public async Task<ActionResult<JSroomsAPI.Models.ApiResponse<IEnumerable<ContactDto>>>> GetContacts()
        {
            try
            {
                var contacts = await _context.Contacts
                    .OrderByDescending(c => c.CreatedAt)
                    .Select(c => new ContactDto
                    {
                        ContactId = c.ContactId,
                        Name = c.Name,
                        Email = c.Email,
                        Phone = c.Phone,
                        Subject = c.Subject,
                        Message = c.Message,
                        InquiryType = c.InquiryType,
                        Status = c.Status,
                        CreatedAt = c.CreatedAt
                    })
                    .ToListAsync();

                return Ok(new JSroomsAPI.Models.ApiResponse<IEnumerable<ContactDto>>
                {
                    Success = true,
                    Message = "Contacts retrieved successfully",
                    Data = contacts
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new JSroomsAPI.Models.ApiResponse<IEnumerable<ContactDto>>
                {
                    Success = false,
                    Message = $"Error retrieving contacts: {ex.Message}"
                });
            }
        }

        // POST: api/contact
        [HttpPost]
        public async Task<ActionResult<JSroomsAPI.Models.ApiResponse<ContactDto>>> CreateContact(CreateContactDto createContactDto)
        {
            try
            {
                var contact = new Contact
                {
                    Name = createContactDto.Name,
                    Email = createContactDto.Email,
                    Phone = createContactDto.Phone,
                    Subject = createContactDto.Subject,
                    Message = createContactDto.Message,
                    InquiryType = createContactDto.InquiryType,
                    Status = "new",
                    CreatedAt = DateTime.UtcNow
                };

                _context.Contacts.Add(contact);
                await _context.SaveChangesAsync();

                var contactDto = new ContactDto
                {
                    ContactId = contact.ContactId,
                    Name = contact.Name,
                    Email = contact.Email,
                    Phone = contact.Phone,
                    Subject = contact.Subject,
                    Message = contact.Message,
                    InquiryType = contact.InquiryType,
                    Status = contact.Status,
                    CreatedAt = contact.CreatedAt
                };

                return Ok(new JSroomsAPI.Models.ApiResponse<ContactDto>
                {
                    Success = true,
                    Message = "Contact message saved successfully",
                    Data = contactDto
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new JSroomsAPI.Models.ApiResponse<ContactDto>
                {
                    Success = false,
                    Message = $"Error saving contact message: {ex.Message}"
                });
            }
        }
    }
}