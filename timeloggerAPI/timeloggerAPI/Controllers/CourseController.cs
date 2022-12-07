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
    }
}
