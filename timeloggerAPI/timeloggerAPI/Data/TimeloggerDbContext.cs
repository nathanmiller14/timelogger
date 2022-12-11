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
        public DbSet<Log> Logs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>().ToTable("Courses");
            modelBuilder.Entity<Log>().ToTable("Times");
        }
    }
}
