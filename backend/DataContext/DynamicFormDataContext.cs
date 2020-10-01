using Microsoft.EntityFrameworkCore;

namespace backend.DataContext
{
    public class DynamicFormDataContext : DbContext
    {
        public DynamicFormDataContext(DbContextOptions<DynamicFormDataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}