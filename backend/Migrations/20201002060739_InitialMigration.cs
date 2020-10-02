using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateTable(
                name: "Forms",
                schema: "dbo",
                columns: table => new
                {
                    FormId = table.Column<string>(type: "varchar(20)", nullable: false),
                    Title = table.Column<string>(type: "varchar(50)", unicode: false, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Forms", x => x.FormId);
                });

            migrationBuilder.CreateTable(
                name: "FormSections",
                schema: "dbo",
                columns: table => new
                {
                    FormSectionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FormId = table.Column<string>(type: "varchar(20)", nullable: false),
                    SectionTitle = table.Column<string>(type: "varchar(80)", unicode: false, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormSections", x => x.FormSectionId);
                    table.ForeignKey(
                        name: "FK_FormSections_Forms_FormId",
                        column: x => x.FormId,
                        principalSchema: "dbo",
                        principalTable: "Forms",
                        principalColumn: "FormId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FormQuestions",
                schema: "dbo",
                columns: table => new
                {
                    FormQuestionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FormSectionId = table.Column<int>(type: "int", nullable: false),
                    QuestionDescription = table.Column<string>(type: "varchar(200)", nullable: false),
                    AnswerType = table.Column<string>(type: "varchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormQuestions", x => x.FormQuestionId);
                    table.ForeignKey(
                        name: "FK_FormQuestions_FormSections_FormSectionId",
                        column: x => x.FormSectionId,
                        principalSchema: "dbo",
                        principalTable: "FormSections",
                        principalColumn: "FormSectionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FormAnswers",
                schema: "dbo",
                columns: table => new
                {
                    FormAnswerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FormQuestionId = table.Column<int>(type: "int", nullable: false),
                    AnswerDescription = table.Column<string>(type: "varchar(200)", nullable: false),
                    Options = table.Column<string>(type: "varchar(200)", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormAnswers", x => x.FormAnswerId);
                    table.ForeignKey(
                        name: "FK_FormAnswers_FormQuestions_FormQuestionId",
                        column: x => x.FormQuestionId,
                        principalSchema: "dbo",
                        principalTable: "FormQuestions",
                        principalColumn: "FormQuestionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FormAnswers_FormQuestionId",
                schema: "dbo",
                table: "FormAnswers",
                column: "FormQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_FormQuestions_FormSectionId",
                schema: "dbo",
                table: "FormQuestions",
                column: "FormSectionId");

            migrationBuilder.CreateIndex(
                name: "IX_FormSections_FormId",
                schema: "dbo",
                table: "FormSections",
                column: "FormId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FormAnswers",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "FormQuestions",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "FormSections",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Forms",
                schema: "dbo");
        }
    }
}
