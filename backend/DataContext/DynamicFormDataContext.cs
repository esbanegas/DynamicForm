using backend.DataContext.Maps;
using backend.Features.Forms;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new FormMap());
            modelBuilder.ApplyConfiguration(new FormSectionMap());
            modelBuilder.ApplyConfiguration(new FormQuestionMap());
            modelBuilder.ApplyConfiguration(new FormAnswerMap());
            base.OnModelCreating(modelBuilder);
        }
    }
}