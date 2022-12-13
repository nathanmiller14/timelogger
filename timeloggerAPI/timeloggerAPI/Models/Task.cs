using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace timeloggerAPI.Models
{
    [Keyless]
    [NotMapped]
    public class Task
    {
        public int ID { get; set; }
        public string Course { get; set; }
        public string TaskName { get; set; }
        public int Completed { get; set; }
    }
}
