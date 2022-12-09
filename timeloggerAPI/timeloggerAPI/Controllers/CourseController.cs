using Microsoft.AspNetCore.Mvc;
using timeloggerAPI.Models;
using timeloggerAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace timeloggerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : Controller
    {
        private readonly TimeloggerDbContext _context;
        
        public CourseController(TimeloggerDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetCourses")]
        public IEnumerable<Course> GetCourses()
        {
            return _context.Courses;
        }

        [HttpDelete("DeleteCourse/{id}")]
        public async Task<IActionResult> DeleteCourse(int id) 
        {
            try
            {
                Console.WriteLine("Delete method has been reached.");
                var courseToDelete = _context.Courses.Where(c => c.Id == id);
                List<Course> courses= courseToDelete.ToList();
                _context.Courses.Remove(courseToDelete.FirstOrDefault());
                await _context.SaveChangesAsync();
                return Ok("Successfully Deleted");
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);            
            }
        }

        [HttpPost("CreateCourse/{courseName}")]
        public async Task<IActionResult> CreateCourse(string courseName)
        {
            var insertString = "INSERT INTO Courses(className) VALUES(\"" + courseName + "\");";
            Console.WriteLine(insertString);
            _context.Database.ExecuteSqlRaw(insertString);
            await _context.SaveChangesAsync();
            return Ok("Successfully Inserted");
        }
    }
}
