using Microsoft.EntityFrameworkCore;
using JSroomsAPI.Models;

namespace JSroomsAPI.Data
{
    public class JSroomsDbContext : DbContext
    {
        public JSroomsDbContext(DbContextOptions<JSroomsDbContext> options)
            : base(options)
        {
        }

        // DbSets
        public DbSet<Category> Categories { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure Category entity
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");
                entity.HasKey(e => e.CategoryId);
                entity.Property(e => e.CategoryName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.IsActive).HasDefaultValue(true);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            });

            // Configure Room entity
            modelBuilder.Entity<Room>(entity =>
            {
                entity.ToTable("Rooms");
                entity.HasKey(e => e.RoomId);
                entity.Property(e => e.RoomNumber).IsRequired().HasMaxLength(10);
                entity.Property(e => e.RoomName).IsRequired().HasMaxLength(200);
                entity.Property(e => e.CategoryName).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Price).HasColumnType("decimal(8,2)");
                entity.Property(e => e.OriginalPrice).HasColumnType("decimal(8,2)");
                entity.Property(e => e.Rating).HasColumnType("decimal(3,2)");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
                
                // Foreign key relationship
                entity.HasOne(r => r.Category)
                      .WithMany()
                      .HasForeignKey(r => r.CategoryId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure Booking entity
            modelBuilder.Entity<Booking>(entity =>
            {
                entity.ToTable("Bookings");
                entity.HasKey(e => e.BookingId);
                entity.Property(e => e.BookingNumber).IsRequired().HasMaxLength(20);
                entity.Property(e => e.GuestName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.GuestEmail).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Amount).HasColumnType("decimal(10,2)");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
                
                // Foreign key relationship
                entity.HasOne(b => b.Room)
                      .WithMany(r => r.Bookings)
                      .HasForeignKey(b => b.RoomId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure Contact entity
            modelBuilder.Entity<Contact>(entity =>
            {
                entity.ToTable("Contacts");
                entity.HasKey(e => e.ContactId);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Subject).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Message).IsRequired().HasMaxLength(2000);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            });

            // Seed data for Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, CategoryName = "Single", IsActive = true, CreatedAt = DateTime.UtcNow },
                new Category { CategoryId = 2, CategoryName = "Double", IsActive = true, CreatedAt = DateTime.UtcNow },
                new Category { CategoryId = 3, CategoryName = "Triple", IsActive = true, CreatedAt = DateTime.UtcNow }
            );

            // Seed data for Rooms
            modelBuilder.Entity<Room>().HasData(
                new Room 
                { 
                    RoomId = 1, 
                    RoomNumber = "101", 
                    RoomName = "Single AC Room",
                    CategoryId = 1, 
                    CategoryName = "Single",
                    Description = "Comfortable single room with modern amenities and city views.",
                    Price = 299, 
                    OriginalPrice = 349,
                    Size = "25 m²",
                    MaxGuests = 1,
                    BedConfiguration = "1 Single Bed",
                    Floor = 1,
                    View = "City View",
                    Status = "available",
                    IsAC = true,
                    AcType = "ac",
                    IsPopular = true,
                    Rating = 4.7m,
                    RatingCount = 89,
                    ImageUrl = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80",
                    ImageAlt = "Single AC Room",
                    Amenities = "[\"Free WiFi\",\"Smart TV\",\"Mini Fridge\",\"Room Service\",\"AC\",\"Coffee Machine\"]",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Room 
                { 
                    RoomId = 2, 
                    RoomNumber = "102", 
                    RoomName = "Single Non-AC Room",
                    CategoryId = 1, 
                    CategoryName = "Single",
                    Description = "Comfortable single room with ceiling fan and basic amenities.",
                    Price = 199, 
                    OriginalPrice = 249,
                    Size = "25 m²",
                    MaxGuests = 1,
                    BedConfiguration = "1 Single Bed",
                    Floor = 1,
                    View = "City View",
                    Status = "available",
                    IsAC = false,
                    AcType = "non-ac",
                    IsPopular = false,
                    Rating = 4.5m,
                    RatingCount = 67,
                    ImageUrl = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80",
                    ImageAlt = "Single Non-AC Room",
                    Amenities = "[\"Free WiFi\",\"Smart TV\",\"Mini Fridge\",\"Room Service\",\"Fan\",\"Coffee Machine\"]",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Room 
                { 
                    RoomId = 3, 
                    RoomNumber = "201", 
                    RoomName = "Double AC Room",
                    CategoryId = 2, 
                    CategoryName = "Double",
                    Description = "Spacious double room with modern amenities and comfortable seating area.",
                    Price = 499, 
                    OriginalPrice = 549,
                    Size = "35 m²",
                    MaxGuests = 2,
                    BedConfiguration = "1 Double Bed",
                    Floor = 2,
                    View = "City View",
                    Status = "available",
                    IsAC = true,
                    AcType = "ac",
                    IsPopular = true,
                    Rating = 4.8m,
                    RatingCount = 124,
                    ImageUrl = "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80",
                    ImageAlt = "Double AC Room",
                    Amenities = "[\"Free WiFi\",\"Smart TV\",\"Mini Fridge\",\"Room Service\",\"AC\",\"Coffee Machine\"]",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Room 
                { 
                    RoomId = 4, 
                    RoomNumber = "202", 
                    RoomName = "Double Non-AC Room",
                    CategoryId = 2, 
                    CategoryName = "Double",
                    Description = "Spacious double room with ceiling fan and seating area.",
                    Price = 399, 
                    OriginalPrice = 449,
                    Size = "35 m²",
                    MaxGuests = 2,
                    BedConfiguration = "1 Double Bed",
                    Floor = 2,
                    View = "City View",
                    Status = "available",
                    IsAC = false,
                    AcType = "non-ac",
                    IsPopular = false,
                    Rating = 4.6m,
                    RatingCount = 92,
                    ImageUrl = "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80",
                    ImageAlt = "Double Non-AC Room",
                    Amenities = "[\"Free WiFi\",\"Smart TV\",\"Mini Fridge\",\"Room Service\",\"Fan\",\"Coffee Machine\"]",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Room 
                { 
                    RoomId = 5, 
                    RoomNumber = "301", 
                    RoomName = "Triple AC Room",
                    CategoryId = 3, 
                    CategoryName = "Triple",
                    Description = "Large triple room with modern amenities and spacious layout.",
                    Price = 699, 
                    OriginalPrice = 749,
                    Size = "45 m²",
                    MaxGuests = 3,
                    BedConfiguration = "3 Single Beds",
                    Floor = 3,
                    View = "City View",
                    Status = "available",
                    IsAC = true,
                    AcType = "ac",
                    IsPopular = true,
                    Rating = 4.6m,
                    RatingCount = 78,
                    ImageUrl = "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80",
                    ImageAlt = "Triple AC Room",
                    Amenities = "[\"Free WiFi\",\"Smart TV\",\"Mini Fridge\",\"Room Service\",\"AC\",\"Coffee Machine\"]",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Room 
                { 
                    RoomId = 6, 
                    RoomNumber = "302", 
                    RoomName = "Triple Non-AC Room",
                    CategoryId = 3, 
                    CategoryName = "Triple",
                    Description = "Large triple room with ceiling fan and spacious layout.",
                    Price = 599, 
                    OriginalPrice = 649,
                    Size = "45 m²",
                    MaxGuests = 3,
                    BedConfiguration = "3 Single Beds",
                    Floor = 3,
                    View = "City View",
                    Status = "available",
                    IsAC = false,
                    AcType = "non-ac",
                    IsPopular = false,
                    Rating = 4.4m,
                    RatingCount = 56,
                    ImageUrl = "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1067&q=80",
                    ImageAlt = "Triple Non-AC Room",
                    Amenities = "[\"Free WiFi\",\"Smart TV\",\"Mini Fridge\",\"Room Service\",\"Fan\",\"Coffee Machine\"]",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                }
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}