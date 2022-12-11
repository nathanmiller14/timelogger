namespace timeloggerAPI.Models
{
    public class Log
    {
        public int Id { get; set; }
        public string Course { get; set; }
        public int Week { get; set; }
        public int Minutes { get; set; }
        public DateTime Date { get; set; }
        public string Task { get; set; }
        public string Description { get; set; }
    }
}

//2022-10-24