﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.DataContext;

namespace backend.Migrations
{
    [DbContext(typeof(DynamicFormDataContext))]
    [Migration("20201005052759_AddColumnDescription")]
    partial class AddColumnDescription
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("backend.Features.Forms.Form", b =>
                {
                    b.Property<int>("FormId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("FormId")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnName("Description")
                        .HasColumnType("varchar(200)")
                        .IsUnicode(false);

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnName("Title")
                        .HasColumnType("varchar(50)")
                        .IsUnicode(false);

                    b.HasKey("FormId");

                    b.ToTable("Forms","dbo");
                });

            modelBuilder.Entity("backend.Features.Forms.FormAnswer", b =>
                {
                    b.Property<int>("FormAnswerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("FormAnswerId")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AnswerDescription")
                        .IsRequired()
                        .HasColumnName("AnswerDescription")
                        .HasColumnType("varchar(200)");

                    b.Property<int>("FormQuestionId")
                        .HasColumnName("FormQuestionId")
                        .HasColumnType("int");

                    b.Property<int?>("Order")
                        .HasColumnName("Order")
                        .HasColumnType("int");

                    b.HasKey("FormAnswerId");

                    b.HasIndex("FormQuestionId");

                    b.ToTable("FormAnswers","dbo");
                });

            modelBuilder.Entity("backend.Features.Forms.FormQuestion", b =>
                {
                    b.Property<int>("FormQuestionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("FormQuestionId")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AnswerType")
                        .IsRequired()
                        .HasColumnName("AnswerType")
                        .HasColumnType("varchar(50)");

                    b.Property<int>("FormSectionId")
                        .HasColumnName("FormSectionId")
                        .HasColumnType("int");

                    b.Property<int?>("Order")
                        .HasColumnName("Order")
                        .HasColumnType("int");

                    b.Property<string>("QuestionDescription")
                        .IsRequired()
                        .HasColumnName("QuestionDescription")
                        .HasColumnType("varchar(200)");

                    b.HasKey("FormQuestionId");

                    b.HasIndex("FormSectionId");

                    b.ToTable("FormQuestions","dbo");
                });

            modelBuilder.Entity("backend.Features.Forms.FormSection", b =>
                {
                    b.Property<int>("FormSectionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("FormSectionId")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("FormId")
                        .HasColumnName("FormId")
                        .HasColumnType("int");

                    b.Property<string>("SectionTitle")
                        .HasColumnName("SectionTitle")
                        .HasColumnType("varchar(80)")
                        .IsUnicode(false);

                    b.HasKey("FormSectionId");

                    b.HasIndex("FormId");

                    b.ToTable("FormSections","dbo");
                });

            modelBuilder.Entity("backend.Features.Forms.FormAnswer", b =>
                {
                    b.HasOne("backend.Features.Forms.FormQuestion", "FormQuestion")
                        .WithMany("FormAnswers")
                        .HasForeignKey("FormQuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Features.Forms.FormQuestion", b =>
                {
                    b.HasOne("backend.Features.Forms.FormSection", "FormSection")
                        .WithMany("FormQuestions")
                        .HasForeignKey("FormSectionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Features.Forms.FormSection", b =>
                {
                    b.HasOne("backend.Features.Forms.Form", "Form")
                        .WithMany("FormSections")
                        .HasForeignKey("FormId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
