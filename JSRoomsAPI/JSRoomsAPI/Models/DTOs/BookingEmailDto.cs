namespace JSroomsAPI.Models.DTOs
{
    public class BookingEmailDto
    {
        public string BookingNumber { get; set; } = string.Empty;
        public string GuestName { get; set; } = string.Empty;
        public string GuestEmail { get; set; } = string.Empty;
        public string GuestPhone { get; set; } = string.Empty;
        public string GuestAddress { get; set; } = string.Empty;
        public string RoomName { get; set; } = string.Empty;
        public string RoomNumber { get; set; } = string.Empty;
        public string CheckIn { get; set; } = string.Empty;
        public string CheckOut { get; set; } = string.Empty;
        public int Nights { get; set; }
        public int Guests { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; } = "Bank Transfer";
        public string SpecialRequests { get; set; } = string.Empty;
    }
}