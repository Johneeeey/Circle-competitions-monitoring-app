using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CircleCompetitions.Models
{
    public class Registered_Sportsman
    {
        [Key]
        public int ID_Registered_Sportsman { get; set; }
        public int Sportsman_ID { get; set; }
        public int User_ID { get; set; }
    }
}
