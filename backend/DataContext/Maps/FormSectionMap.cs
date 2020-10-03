using backend.DataContext.Data;
using backend.Features.Forms;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.DataContext.Maps
{
    public class FormSectionMap : EntityMap<FormSection>
    {
        public override void Configure(EntityTypeBuilder<FormSection> builder)
        {
            builder.ToTable("FormSections", "dbo");
            builder.HasKey(t => t.FormSectionId);

            builder.Property(x => x.FormSectionId).HasColumnName("FormSectionId").HasColumnType("int").IsRequired().ValueGeneratedOnAdd();
            builder.Property(x => x.FormId).HasColumnName("FormId").HasColumnType("int").IsRequired();
            builder.Property(t => t.SectionTitle).HasColumnName("SectionTitle").HasColumnType("varchar(80)").IsUnicode(false);

            builder.HasOne(t => t.Form).WithMany(t => t.FormSections).HasForeignKey(t => t.FormId);
        }
    }
}