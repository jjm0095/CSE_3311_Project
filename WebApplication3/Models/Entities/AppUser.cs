using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PomodoroApp.Models.Entities
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int PomodoroDuration { get; set; }
        public int ShortBreakDuration { get; set; }
        public int LongBreakDuration { get; set; }
        public List<Task> Tasks { get; set; }

        public AppUser()
        {
            this.PomodoroDuration = 1500;
            this.ShortBreakDuration = 300;
            this.LongBreakDuration = 900;
            this.Tasks = new List<Task>();
        }
    }
}
