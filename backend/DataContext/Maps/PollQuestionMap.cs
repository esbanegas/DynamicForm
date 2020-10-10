using backend.DataContext.Data;
using backend.Features.Polls;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.DataContext.Maps
{
    public class PollQuestionMap : EntityMap<PollQuestion>
    {
        public override void Configure(EntityTypeBuilder<PollQuestion> builder)
        {
            builder.ToTable("PollQuestions", "dbo");
            builder.HasKey(t => t.PollQuestionId);

            builder.Property(x => x.PollQuestionId).HasColumnName("PollQuestionId").HasColumnType("int").IsRequired().ValueGeneratedOnAdd();
            builder.Property(x => x.PollSectionId).HasColumnName("PollSectionId").HasColumnType("int").IsRequired();
            builder.Property(x => x.AnswerType).HasColumnName("AnswerType").HasColumnType("varchar(50)").IsRequired();
            builder.Property(x => x.QuestionDescription).HasColumnName("QuestionDescription").HasColumnType("varchar(200)").IsRequired();
            builder.Property(x => x.Order).HasColumnName("Order").HasColumnType("int");
            
            builder.HasOne(t => t.PollSection).WithMany(t => t.PollQuestions).HasForeignKey(t => t.PollSectionId);
        }
    }
}