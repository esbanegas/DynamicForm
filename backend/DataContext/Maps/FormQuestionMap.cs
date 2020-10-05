using backend.DataContext.Data;
using backend.Features.Forms;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.DataContext.Maps
{
    public class FormQuestionMap : EntityMap<FormQuestion>
    {
        public override void Configure(EntityTypeBuilder<FormQuestion> builder)
        {
            builder.ToTable("FormQuestions", "dbo");
            builder.HasKey(t => t.FormQuestionId);

            builder.Property(x => x.FormQuestionId).HasColumnName("FormQuestionId").HasColumnType("int").IsRequired().ValueGeneratedOnAdd();
            builder.Property(x => x.FormSectionId).HasColumnName("FormSectionId").HasColumnType("int").IsRequired();
            builder.Property(x => x.AnswerType).HasColumnName("AnswerType").HasColumnType("varchar(50)").IsRequired();
            builder.Property(x => x.QuestionDescription).HasColumnName("QuestionDescription").HasColumnType("varchar(200)").IsRequired();
            builder.Property(x => x.Order).HasColumnName("Order").HasColumnType("int");
            
            builder.HasOne(t => t.FormSection).WithMany(t => t.FormQuestions).HasForeignKey(t => t.FormSectionId);
        }
    }
}