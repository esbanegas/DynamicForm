using backend.DataContext.Maps;
using backend.Features.Forms;
using backend.Features.Polls;
using Microsoft.EntityFrameworkCore;

namespace backend.DataContext
{
    public class DynamicFormDataContext : DbContext
    {
        public DynamicFormDataContext(DbContextOptions<DynamicFormDataContext> options) : base(options)
        {
           
        }

        public DbSet<Form> Forms { get; set; }
        public DbSet<FormSection> FormSections { get; set; }
        public DbSet<FormQuestion> FormQuestions { get; set; }
        public DbSet<FormAnswer> FormAnswers { get; set; }

        public DbSet<Poll> Polls { get; set; }
        public DbSet<PollSection> PollSections { get; set; }
        public DbSet<PollQuestion> PollQuestions { get; set; }
        public DbSet<PollAnswer> PollAnswers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new FormMap());
            modelBuilder.ApplyConfiguration(new FormSectionMap());
            modelBuilder.ApplyConfiguration(new FormQuestionMap());
            modelBuilder.ApplyConfiguration(new FormAnswerMap());

            modelBuilder.ApplyConfiguration(new PollMap());
            modelBuilder.ApplyConfiguration(new PollSectionMap());
            modelBuilder.ApplyConfiguration(new PollQuestionMap());
            modelBuilder.ApplyConfiguration(new PollAnswerMap());
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}