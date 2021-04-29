using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PomodoroApp.ViewModels
{
    public class UserTimerModel
    {
        public int? PomodoroInterval { get; set; }
        public int? ShortBreakInterval { get; set; }
        public int? LongBreakInterval { get; set; }
    }
}
