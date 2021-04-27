using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PomodoroApp.ViewModels
{
    public class TimerUpdateViewModel
    {
        public string Timer { get; set; }
        public int Interval { get; set; }
        public string UserId { get; set; }
    }
}
