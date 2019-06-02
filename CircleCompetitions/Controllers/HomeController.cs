using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CircleCompetitions.Models;

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
    }
}