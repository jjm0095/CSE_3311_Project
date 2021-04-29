using System.Threading.Tasks;
using PomodoroApp.Data;
using PomodoroApp.Models.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PomodoroApp.ViewModels;
using PomodoroApp.Helpers;
using System.Linq;
//using System.Data.Entity;
using Microsoft.EntityFrameworkCore;

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
        [HttpGet("tasks/{userId}")]
        public async Task<IActionResult> GetTasks(string userId)
        {
            var userEntity = await _userManager.FindByIdAsync(userId);

            if (userEntity == null) return Ok();
            //var tasks = userEntity.Tasks;
            var tasks = await _appDbContext.Tasks.Where(o => o.UserId == userId && !o.Completed).ToListAsync();

            if (tasks.Count > 0)
                return new OkObjectResult(Newtonsoft.Json.JsonConvert.SerializeObject(tasks));

            return Ok();
        }

        [HttpGet("timer/{userId}")]
        public async Task<IActionResult> GetTimers(string userId)
        {
            var userEntity = await _userManager.FindByIdAsync(userId);

            if (userEntity != null)
            {
                var timerModel = new UserTimerModel()
                {
                    PomodoroInterval = userEntity.PomodoroDuration,
                    ShortBreakInterval = userEntity.ShortBreakDuration,
                    LongBreakInterval = userEntity.LongBreakDuration,
                };

                return new OkObjectResult(Newtonsoft.Json.JsonConvert.SerializeObject(timerModel));
            }


            return Ok();

        }
        
        [HttpPost("addTask")]
        public async Task<IActionResult> AddTask([FromBody] AddTaskViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userEntity = await _userManager.FindByIdAsync(model.UserId);
            var newTask = new Models.Entities.Task()
            {
                Content = model.Content,
                Completed = false,
                IsActive = true,
                UserId = model.UserId,
            };

            await _appDbContext.Tasks.AddAsync(newTask);

            await _appDbContext.SaveChangesAsync();

            return new OkObjectResult(Newtonsoft.Json.JsonConvert.SerializeObject(newTask));
        }

        [HttpPut("modifyTask")]
        public async Task<IActionResult> ModifyTask([FromBody] AddTaskViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var modifiedTask = await _appDbContext.Tasks.Where(o => o.UserId == model.UserId && !o.Completed).FirstOrDefaultAsync();
            modifiedTask.Completed = model.Completed;

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
