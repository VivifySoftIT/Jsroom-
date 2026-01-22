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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure Category entity
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category"); // Table name matches your SQL
                entity.HasKey(e => e.CategoryId);
                entity.Property(e => e.CategoryName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.IsActive).HasDefaultValue(true);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            });

            // Seed data for Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, CategoryName = "Single", IsActive = true, CreatedAt = DateTime.UtcNow },
                new Category { CategoryId = 2, CategoryName = "Double", IsActive = true, CreatedAt = DateTime.UtcNow },
                new Category { CategoryId = 3, CategoryName = "Triple", IsActive = true, CreatedAt = DateTime.UtcNow }
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}