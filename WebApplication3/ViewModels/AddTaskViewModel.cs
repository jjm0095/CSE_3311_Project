using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PomodoroApp.ViewModels
{
    public class AddTaskViewModel
    {
        public int? Id { get; set; }
        public string Content { get; set; }
        public bool Completed { get; set; }
        public bool IsActive { get; set; } // Determines whether or not a task has been removed
        public string UserId { get; set; }
    }
}
