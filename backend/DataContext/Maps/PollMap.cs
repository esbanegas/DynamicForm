using backend.DataContext.Data;
using backend.Features.Polls;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.DataContext.Maps
{
    public class PollMap : EntityMap<Poll>
    {
        public override void Configure(EntityTypeBuilder<Poll> builder)
        {
            builder.ToTable("Polls", "dbo");
            builder.HasKey(t => t.PollId);

            builder.Property(x => x.PollId).HasColumnName("PollId").HasColumnType("int").IsRequired().ValueGeneratedOnAdd();
            builder.Property(t => t.Title).HasColumnName("Title").HasColumnType("varchar(50)").IsRequired().IsUnicode(false);
            builder.Property(t => t.UserId).HasColumnName("UserId").HasColumnType("varchar(50)").IsRequired().IsUnicode(false);
            builder.Property(t => t.Description).HasColumnName("Description").HasColumnType("varchar(200)").IsUnicode(false);
        }
    }
}