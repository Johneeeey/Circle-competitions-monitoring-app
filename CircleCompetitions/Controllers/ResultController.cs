using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CircleCompetitions.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;

namespace CircleCompetitions.Controllers
{
    public class ResultController : Controller
    {
        DataContext db;
        static int CompetitionID;
        static int CircleID;
        public ResultController(DataContext context)
        {
            db = context;
        }

        /*Методы на возврат данных*/
        [HttpGet]
        [Authorize(Roles = "Admin, User")]
        public IEnumerable<Result> GetResults()
        {
            List<Result> Results = new List<Result>();
            foreach (Result result in db.Result.OrderBy(r => r.Place).ToList())
            {
                if (result.Competition_ID == CompetitionID)
                {
                    Results.Add(result);
                }
            }
            return Results;
        }

        [HttpGet]
        [Authorize(Roles = "Admin, User")]
        public IEnumerable<Sportsman> GetSportsmen()
        {
            List<Sportsman> Sportsmen = new List<Sportsman>();
            foreach (Result result in db.Result.ToList())
            {
                if (result.Competition_ID == CompetitionID)
                {
                    Sportsmen.Add(this.db.Sportsman.FirstOrDefault(s => s.ID_Sportsman == result.Sportsman_ID));
                }
            }
            return Sportsmen;
        }

        [HttpGet]
        [Authorize(Roles = "Admin, User")]
        public IEnumerable<Competition> GetCompetition()
        {
            List<Competition> Competition = new List<Competition>();
            Competition.Add(db.Competition.FirstOrDefault(c => c.ID_Competition == CompetitionID));
            return Competition;
        }

        [HttpGet]
        [Authorize(Roles ="Admin, User")]
        public IEnumerable<Stage> GetStages()
        {
            List<Stage> Stages = new List<Stage>();
            //int temp = 0;
            foreach (Stage stage in db.Stage.ToList())
            {
                if(stage.Competition_ID == CompetitionID /*&& stage.StageNumber != temp*/)
                {
                    Stages.Add(stage);
                    //temp = stage.StageNumber;
                }
            }
            return Stages;
        }

        [HttpGet]
        [Authorize(Roles = "Admin, User")]
        public IEnumerable<Circle> GetCircles()
        {
            List<Circle> Circles = new List<Circle>();
            foreach(Circle circle in db.Circle.OrderBy(c => c.Stage_ID).ToList())
            {
                if (circle.Competition_ID == CompetitionID)
                {
                    Circles.Add(circle);
                }
            }
            return Circles;
        }

        /*Возврат одного круга*/
        public IEnumerable<Circle> GetCircle()
        {
            List<Circle> circle = new List<Circle>();
            circle.Add(db.Circle.FirstOrDefault(c => c.ID_Circle == CircleID));
            return circle;
        }

        /*Методы на возврат представлений*/
        [HttpGet]
        [Authorize(Roles ="Admin, User")]
        public IActionResult Index(int IDCompetition)
        {
            CompetitionID = IDCompetition;
            return View("Index");
        }
        [HttpGet]
        [Authorize(Roles = "Admin, User")]
        public IActionResult Detail(int IDCompetition)
        {
            CompetitionID = IDCompetition;
            return View();
        }

        [HttpGet]
        [Authorize(Roles ="Admin")]
        public IActionResult MakeChanges(int IDCompetition)
        {
            CompetitionID = IDCompetition;
            return View();
        }

        [HttpGet]
        [Authorize(Roles ="Admin")]
        public IActionResult ChangeCircle(int IDCircle)
        {
            CircleID = IDCircle;
            return View();
        }

        
        /*post-методы*/
        [HttpPost]
        [Authorize(Roles ="Admin")]
        public IActionResult ChangeCircle(int CircleID, TimeSpan CircleTime)
        {
            foreach (Circle circle in db.Circle.OrderBy(c => c.Stage_ID).ToList())
            {
                if (circle.ID_Circle == CircleID)
                {
                    circle.TimeOfCircle = CircleTime;
                }
            }
            db.SaveChanges();
            CirclePlacecFilter();
            StagePlaceFilter();
            ResultPlaceFilter();
            return RedirectToAction("MakeChanges", "Result", new { IDCompetition = CompetitionID });
        }

        /*Дополнительные методы*/
        /*Для расставление мест в круге*/
        private void CirclePlacecFilter()
        {
            int place = 1;
            List<Circle> circles = new List<Circle>();
            int circleNum = db.Circle.FirstOrDefault(c => c.ID_Circle == CircleID).CircleNumber;
            int stageNum = db.Stage.FirstOrDefault(st => st.ID_Stage == db.Circle.FirstOrDefault(c => c.ID_Circle == CircleID).Stage_ID).StageNumber;
            foreach(Stage stage in db.Stage.Where(st => st.StageNumber == stageNum && st.Competition_ID == CompetitionID))
            {
                foreach(Circle circle in db.Circle.Where(c => c.Competition_ID == CompetitionID))
                {
                    if (circle.Stage_ID == stage.ID_Stage && circle.CircleNumber == circleNum)
                        circles.Add(circle);
                }
            }
            foreach(Circle circle in circles.OrderBy(c => c.TimeOfCircle))
            {
                circle.Place = place;
                place++;
            }
            db.SaveChanges();
        }

        /*Для расставления мест в стадиях*/
        private void StagePlaceFilter()
        {
            int temp = 0;
            foreach(Stage stage in db.Stage.Where(st => st.Competition_ID == CompetitionID))
            {
                if (stage.StageNumber == temp)
                    continue;
                temp = stage.StageNumber;
                int place = 1;
                /*Формируем список спортсменов, участвующих в каждой стадии*/
                Dictionary<int, int> FirstPlaceCountForEachSportsman = new Dictionary<int, int>();
                foreach(Stage st1 in db.Stage.Where(st => st.StageNumber == stage.StageNumber))
                {
                    FirstPlaceCountForEachSportsman.Add(st1.Sportsman_ID, 0);
                }
                /*Подсчитываем, сколько раз каждый спорстмен занимал 1 место в ходе стадии*/
                foreach(Circle circle in db.Circle.Where(c => c.Stage_ID == stage.ID_Stage))
                {
                    if (circle.Place == 1)
                    {
                        FirstPlaceCountForEachSportsman[circle.Sportsman_ID] += 1;
                    }
                }
                /*Расставляем места в стадии в зависимости от количества занятых 1 мест во время стадии*/
                foreach(var obj in FirstPlaceCountForEachSportsman.OrderBy(f => f.Value).Reverse())
                {
                    foreach(Stage st2 in db.Stage.Where(st => st.StageNumber == stage.StageNumber))
                    {
                        if (st2.Sportsman_ID == obj.Key)
                        {
                            st2.Place = place;
                            place++;
                        }
                    }
                }
            }
            db.SaveChanges();
        }

        /*Для расставления мест в финальном результате*/
        private void ResultPlaceFilter()
        {
            int place = 1;
            Dictionary<int, int> FirstPlaceCountForEachSportsman = new Dictionary<int, int>();
            /*Считаем, сколько первых мест занимали спортсмены в разных стадиях*/
            foreach (Stage stage in db.Stage.Where(st => st.Competition_ID == CompetitionID))
            {
                if (stage.Place != 1)
                {
                    if (FirstPlaceCountForEachSportsman.ContainsKey(stage.Sportsman_ID))
                    {
                        FirstPlaceCountForEachSportsman[stage.Sportsman_ID] += 0;
                    }
                    else
                    {
                        FirstPlaceCountForEachSportsman.Add(stage.Sportsman_ID, 0);
                    }
                }
                else
                {
                    if (FirstPlaceCountForEachSportsman.ContainsKey(stage.Sportsman_ID))
                    {
                        FirstPlaceCountForEachSportsman[stage.Sportsman_ID] += 1;
                    }
                    else
                    {
                        FirstPlaceCountForEachSportsman.Add(stage.Sportsman_ID, 1);
                    }
                }
            }
            foreach(var obj in FirstPlaceCountForEachSportsman.OrderBy(f => f.Value).Reverse())
            {
                foreach(Result result in db.Result.Where(r => r.Competition_ID == CompetitionID))
                {
                    if (result.Sportsman_ID == obj.Key)
                    {
                        result.Place = place;
                        place++;
                    }
                }
            }
            db.SaveChanges();
            /*Добавить сохранение*/
        }
    }
}