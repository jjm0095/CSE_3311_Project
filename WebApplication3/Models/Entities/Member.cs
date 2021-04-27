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
    }
}
