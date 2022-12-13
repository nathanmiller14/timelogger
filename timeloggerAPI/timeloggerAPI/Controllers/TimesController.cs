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

        [HttpGet("GetLogByID/{idOfLogToEdit}")]
        public List<Log> GetLogByID(int idOfLogToEdit)
        {
            var logToEdit = _context.Logs.Where(c => c.Id == idOfLogToEdit);
            List<Log> logs = logToEdit.ToList();
            return logs;
        }

        [HttpDelete("DeleteLog/{id}")]
        public async Task<IActionResult> DeleteLog(int idOfLog)
        {
            try
            {
                Console.WriteLine("Delete method has been reached with id: " + idOfLog);
                //var logToDelete = _context.Times.Where(c => c.ID == idOfLog);
                //List<Models.Task> tasks = logToDelete.ToList();
                //_context.Tasks.Remove(logToDelete.FirstOrDefault());
                //await _context.SaveChangesAsync();
                return Ok("Successfully Deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
