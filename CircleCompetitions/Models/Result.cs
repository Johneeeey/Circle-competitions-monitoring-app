using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CircleCompetitions.Models
{
    public class Result
    {
        [Key]
        public int ID_Result { get; set; }
        public int Competition_ID { get; set; }
        public int Sportsman_ID { get; set; }
        public int Place { get; set; }
    }
}
