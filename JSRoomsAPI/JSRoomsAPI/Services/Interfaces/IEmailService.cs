using JSroomsAPI.Models.DTOs;

namespace JSroomsAPI.Services.Interfaces
{
    public interface IEmailService
    {
        Task<bool> SendBookingNotificationAsync(BookingEmailDto bookingData);
    }
}