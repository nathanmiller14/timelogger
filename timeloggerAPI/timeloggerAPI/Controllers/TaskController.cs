using Microsoft.AspNetCore.Mvc;
using timeloggerAPI.Data;
using timeloggerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace timeloggerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : Controller
    {
        private readonly TimeloggerDbContext _context;

        public TaskController(TimeloggerDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetTasks")]
        public IEnumerable<Models.Task> GetTasks()
        {
            return _context.Tasks;
        }
    }
}
