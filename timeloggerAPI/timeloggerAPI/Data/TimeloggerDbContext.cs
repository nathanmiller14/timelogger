using Microsoft.EntityFrameworkCore;
using timeloggerAPI.Models;

namespace timeloggerAPI.Data
{
    public class TimeloggerDbContext : DbContext
    {
        public TimeloggerDbContext(DbContextOptions<TimeloggerDbContext> options) : base(options)
        {

        }

        public DbSet<Course> Courses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>().ToTable("Courses");
        }
    }
}
