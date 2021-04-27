using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using PomodoroApp.Auth;
using PomodoroApp.Models;
using Newtonsoft.Json;

namespace PomodoroApp.Helpers
{
    public class Tokens
    {
        public static async Task<string> GenerateJwt(ClaimsIdentity identity, IJwtFactory jwtFactory, string userName, int pomodoroInterval, int shortBreakInterval, int longBreakInterval, JwtIssuerOptions jwtOptions, JsonSerializerSettings serializerSettings)
        {
            var response = new
            {
                id = identity.Claims.Single(c => c.Type == "id").Value,
                auth_token = await jwtFactory.GenerateEncodedToken(userName, identity),
                pomodoro = pomodoroInterval,
                shortBreak = shortBreakInterval,
                longBreak = longBreakInterval,
                expires_in = (int)jwtOptions.ValidFor.TotalSeconds
            };

            return JsonConvert.SerializeObject(response, serializerSettings);
        }
    }
}