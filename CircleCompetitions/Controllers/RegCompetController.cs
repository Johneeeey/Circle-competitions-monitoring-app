using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CircleCompetitions.Models;
using CircleCompetitions.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CircleCompetitions.Controllers
{
    public class RegCompetController : Controller
    {
        DataContext db;
        static int Competition_ID;
        static int Result_ID;
        static int Stage_ID;

        public RegCompetController(DataContext dataContext)
        {
            db = dataContext;
        }

        //public RegCompetController(Sportsman sportsman)
        //{
        //    sp = sportsman;
        //    foreach (Sportsman sp in db.Sportsman)
        //    {
        //        sp.I
        //    }
        //}


        [HttpGet]
        public IActionResult Index(int ID_Competition)
        {
            Competition_ID = ID_Competition;
            return View();
        }

        [HttpPost]
        public IActionResult Index(string Name, string Surname, string Patronymic, char Sex, DateTime YearOfBirth, string Team)
        {


            Sportsman sport = db.Sportsman.FirstOrDefault(u => u.SportsmanName == Name && u.SportsmanSurname == Surname && u.SportsmanPatronymic == Patronymic &&
                                                                 u.Sex == Sex && u.YearOfBirth == YearOfBirth && u.Team == Team);
            //Если спортсмен есть уже в бд
            if (sport != null)
                {
                    int id = sport.ID_Sportsman;
                    List<Participant> Comp = db.Participant.Where(p => p.Competition_ID == Competition_ID).ToList();
                    //if(Comp.Contains(Participant p))

                    db.Participant.Add(new Participant { Sportsman_ID = id, Competition_ID = Competition_ID });
                }
                //Если спортсмена нет в БД
                if (sport == null)
                {

                    db.Sportsman.Add(new Sportsman
                    {
                        SportsmanName = Name,
                        SportsmanSurname =  Surname,
                        SportsmanPatronymic =  Patronymic,
                        Sex =   Sex,
                        YearOfBirth =  YearOfBirth,
                        Team =  Team
                    });
                db.SaveChanges();//ЗДЕСЬ КОСЯК. ЧТО-ТО НЕ ТАК С ДАТОЙ. Я ПОМЕНЯЛ ТИП ПОЛЯ ДАТЫ В ПРЕДСТАВЛЕНИИ, ИБО НУЖЕН НЕ ПРОСТО ГОД
                Sportsman sp = db.Sportsman.FirstOrDefault(u => u.SportsmanName == Name && u.SportsmanSurname == Surname && u.SportsmanPatronymic == Patronymic &&
                                                               u.Sex == Sex && u.YearOfBirth == YearOfBirth && u.Team == Team);
                    db.Participant.Add(new Participant { Competition_ID = Competition_ID, Sportsman_ID = sp.ID_Sportsman });

                }
                //Tаблица Result
                Result result = db.Result.FirstOrDefault(r =>  r.ID_Result==Result_ID);
                db.Result.Add(new Result { Competition_ID = Competition_ID, Sportsman_ID = sport.ID_Sportsman });

                int rez = result.ID_Result;


                //Из Competition взять StageCount

                for (int i = 1; i <= db.Competition.FirstOrDefault(c => c.ID_Competition == Competition_ID).StageCount; i++)
                {
                    db.Stage.Add(new Stage { Competition_ID = Competition_ID, Result_ID = rez, Sportsman_ID = sport.ID_Sportsman, CircleCount = 3, StageNumber = i });

                }
                //Из Stage взять CircleCount
                for (int j = 1; j <= db.Stage.FirstOrDefault(s =>   Stage_ID== s.ID_Stage).CircleCount; j++)
                {
                    db.Circle.Add(new Circle { Competition_ID = Competition_ID, Sportsman_ID = sport.ID_Sportsman, Stage_ID = Stage_ID, CircleNumber = 1 });
                }

                db.SaveChangesAsync();
                return RedirectToAction("Index", "Home");
            
        }
    }
}