using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CircleCompetitions.Models
{
    public class DataContext : DbContext
    {
        public DbSet<Circle> Circle { get; set; }
        public DbSet<Competition> Competition { get; set; }
        public DbSet<Participant> Participant { get; set; }
        public DbSet<Registered_Sportsman> Registered_Sportsman { get; set; }
        public DbSet<Result> Result { get; set; }
        public DbSet<Sportsman> Sportsman { get; set; }
        public DbSet<Stage> Stage { get; set; }
        public DbSet<User> User { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    }
}
