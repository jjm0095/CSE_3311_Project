using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PomodoroApp.Models.Entities
{
    public class Member
    {
        public int Id { get; set; }
        public string IdentityId { get; set; }
        public AppUser Identity { get; set; }  // navigation property
        public string Location { get; set; }
        public string Locale { get; set; }
        public string Gender { get; set; }
        public int PomodoroDuration { get; set; }
        public int ShortBreakDuration { get; set; }
        public int LongBreakDuration { get; set; }
    }
}
