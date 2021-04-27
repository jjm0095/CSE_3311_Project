using System.Threading.Tasks;
using PomodoroApp.Data;
using PomodoroApp.Models.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PomodoroApp.ViewModels;
using PomodoroApp.Helpers;

namespace PomodoroApp.Controllers
{
    [Route("api/[controller]")]
    public class AccountsController : Controller
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public AccountsController(UserManager<AppUser> userManager, IMapper mapper, ApplicationDbContext appDbContext)
        {
            _userManager = userManager;
            _mapper = mapper;
            _appDbContext = appDbContext;
        }

        // POST api/accounts
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = _mapper.Map<AppUser>(model);

            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            await _appDbContext.Members.AddAsync(new Member { IdentityId = userIdentity.Id});
            await _appDbContext.SaveChangesAsync();

            return Ok();
        }

        //POST api/accounts/timer
        [HttpPost("timer")]
        public async Task<IActionResult> UpdateTimer([FromBody] TimerUpdateViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userEntity = await _userManager.FindByIdAsync(model.UserId);  //await this._appDbContext.Users.FindAsync(model.UserId);

            if (model.Timer == "pomodoro")
                userEntity.PomodoroDuration = model.Interval;
            else if (model.Timer == "shortBreak")
                userEntity.ShortBreakDuration = model.Interval;
            else if (model.Timer == "longBreak")
                userEntity.LongBreakDuration = model.Interval;

            await _appDbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
