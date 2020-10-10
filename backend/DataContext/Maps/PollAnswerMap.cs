using backend.DataContext.Data;
using backend.Features.Polls;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.DataContext.Maps
{
    public class PollAnswerMap : EntityMap<PollAnswer>
    {
        public override void Configure(EntityTypeBuilder<PollAnswer> builder)
        {
            builder.ToTable("PollAnswers", "dbo");
            builder.HasKey(t => t.PollAnswerId);

            builder.Property(x => x.PollAnswerId).HasColumnName("PollAnswerId").HasColumnType("int").IsRequired().ValueGeneratedOnAdd();
            builder.Property(x => x.PollQuestionId).HasColumnName("PollQuestionId").HasColumnType("int").IsRequired();
            builder.Property(x => x.AnswerDescription).HasColumnName("AnswerDescription").HasColumnType("varchar(200)").IsRequired();
            builder.Property(x => x.Order).HasColumnName("Order").HasColumnType("int");
            builder.HasOne(t => t.PollQuestion).WithMany(t => t.PollAnswers).HasForeignKey(t => t.PollQuestionId);
        }
    }
}