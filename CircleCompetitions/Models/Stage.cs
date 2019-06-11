using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CircleCompetitions.Models
{
    public class Stage
    {
        [Key]
        public int ID_Stage { get; set; }
        public int Competition_ID { get; set; }
        public int Result_ID { get; set; }
        public int Sportsman_ID { get; set; }
        public int CircleCount { get; set; }
        public int StageNumber { get; set; }
        public int? Place { get; set; }
    }
}
