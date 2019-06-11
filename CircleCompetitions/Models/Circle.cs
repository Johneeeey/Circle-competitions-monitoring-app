using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CircleCompetitions.Models
{
    public class Circle
    {
        [Key]
        public int ID_Circle { get; set; }
        public int Stage_ID { get; set; }
        public int Competition_ID { get; set; }
        public int Sportsman_ID { get; set; }
        public int CircleNumber { get; set; }
        public TimeSpan? TimeOfCircle { get; set; }
        public int? Place { get; set; }
    }
}
