using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PomodoroApp.ViewModels.Validations;
using FluentValidation.Attributes;

namespace PomodoroApp.ViewModels
{
    [Validator(typeof(CredentialsViewModelValidator))]
    public class CredentialsViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
