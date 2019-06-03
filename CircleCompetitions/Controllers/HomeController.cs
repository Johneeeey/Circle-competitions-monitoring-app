using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CircleCompetitions.Models;
using CircleCompetitions.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;

namespace CircleCompetitions.Controllers
{
    public class HomeController : Controller
    {
        DataContext db;
        public HomeController(DataContext dataContext)
        {
            db = dataContext;
        }

        public IEnumerable<User> GetUserInfo()
        {
            return db.User.ToList();
        }

        public IActionResult Index()
        {
            return View();
        }
        [Route("Home")]
        public IActionResult Index(string Rights)
        {
            ViewBag.Msg = Rights;
            return View();
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Login(string EMail, string Password)
        {
            User user =  db.User.FirstOrDefault(u => u.E_Mail == EMail && u.Password == Password);
            if (user != null)
            {
                await Authenticate(EMail);
                return Redirect("~/Home?Rights=" + user.RightsOfUser);
            }
            return View("LoginError");
        }


        //Метод для хранения данных о пользователе в куки
        private async Task Authenticate(string userName)
        {
            // создаем один claim
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userName)
            };
            // создаем объект ClaimsIdentity
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            // установка аутентификационных куки
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }
    }
}