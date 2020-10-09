using backend.DataContext.Data;
using backend.Features.Forms;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.DataContext.Maps
{
    public class FormMap : EntityMap<Form>
    {
        public override void Configure(EntityTypeBuilder<Form> builder)
        {
            builder.ToTable("Forms", "dbo");
            builder.HasKey(t => t.FormId);

            builder.Property(x => x.FormId).HasColumnName("FormId").HasColumnType("int").IsRequired().ValueGeneratedOnAdd();
            builder.Property(t => t.Title).HasColumnName("Title").HasColumnType("varchar(50)").IsRequired().IsUnicode(false);
            builder.Property(t => t.Description).HasColumnName("Description").HasColumnType("varchar(200)").IsUnicode(false);
        }
    }
}