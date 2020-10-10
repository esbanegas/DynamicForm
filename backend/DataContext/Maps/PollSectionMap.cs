using backend.DataContext.Data;
using backend.Features.Polls;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.DataContext.Maps
{
    public class PollSectionMap : EntityMap<PollSection>
    {
        public override void Configure(EntityTypeBuilder<PollSection> builder)
        {
            builder.ToTable("PollSections", "dbo");
            builder.HasKey(t => t.PollSectionId);

            builder.Property(x => x.PollSectionId).HasColumnName("PollSectionId").HasColumnType("int").IsRequired().ValueGeneratedOnAdd();
            builder.Property(x => x.PollId).HasColumnName("PollId").HasColumnType("int").IsRequired();
            builder.Property(t => t.SectionTitle).HasColumnName("SectionTitle").HasColumnType("varchar(80)").IsUnicode(false);

            builder.HasOne(t => t.Poll).WithMany(t => t.PollSections).HasForeignKey(t => t.PollId);
        }
    }
}