using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CircleCompetitions.Models
{
    public class Participant
    {
        [Key]
        public int ID_Participant { get; set; }
        public int Sportsman_ID { get; set; }
        public int Competition_ID { get; set; }
    }
}
