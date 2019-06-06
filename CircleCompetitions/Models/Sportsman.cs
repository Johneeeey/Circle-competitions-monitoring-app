using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CircleCompetitions.Models
{
    public class Sportsman
    {
        [Key]
        public int ID_Sportsman { get; set; }
        public string SportsmanName { get; set; }
        public string SportsmanSurname { get; set; }
        public string SportsmanPatronymic { get; set; }
        public char Sex { get; set; }
        public DateTime YearOfBirth { get; set; }
        public string Team { get; set; }
    }
}
