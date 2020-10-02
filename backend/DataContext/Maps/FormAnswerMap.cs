using backend.DataContext.Data;
using backend.Features.Forms;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.DataContext.Maps
{
    public class FormAnswerMap : EntityMap<FormAnswer>
    {
        public override void Configure(EntityTypeBuilder<FormAnswer> builder)
        {
            builder.ToTable("FormAnswers", "dbo");
            builder.HasKey(t => t.FormAnswerId);

            builder.Property(x => x.FormAnswerId).HasColumnName("FormAnswerId").HasColumnType("int").IsRequired().ValueGeneratedOnAdd();
            builder.Property(x => x.FormQuestionId).HasColumnName("FormQuestionId").HasColumnType("int").IsRequired();
            builder.Property(x => x.AnswerDescription).HasColumnName("AnswerDescription").HasColumnType("varchar(200)").IsRequired();
            builder.Property(x => x.Options).HasColumnName("Options").HasColumnType("varchar(200)").IsRequired();
            builder.Property(x => x.Order).HasColumnName("Order").HasColumnType("int").IsRequired();

            builder.HasOne(t => t.FormQuestion).WithMany(t => t.FormAnswers).HasForeignKey(t => t.FormQuestionId);
        }
    }
}