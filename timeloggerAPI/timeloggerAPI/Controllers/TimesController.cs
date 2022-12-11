using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using timeloggerAPI.Data;
using timeloggerAPI.Models;

namespace timeloggerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimesController : Controller
    {
        private readonly TimeloggerDbContext _context;

        public TimesController(TimeloggerDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetLogs")]
        public IEnumerable<Log> GetLogs()
        {
            return _context.Logs;
        }
    }
}
