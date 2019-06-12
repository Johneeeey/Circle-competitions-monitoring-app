using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CircleCompetitions.ViewModels
{
    public class RegCompetModel
    {
        [Required(ErrorMessage = "Не указано Имя")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Не указана Фамилия")]
        public string Surname { get; set; }

        [Required(ErrorMessage = "Не указано Отчество")]
        public string Patronymic { get; set; }

        [Required(ErrorMessage = "Не указан Пол")]
        public string Sex { get; set; }

        [Required(ErrorMessage = "Не указан Год рождения")]
        public string YearOfBirth { get; set; }

        [Required(ErrorMessage = "Не указана Команда")]
        public string Team { get; set; }
    }
}
