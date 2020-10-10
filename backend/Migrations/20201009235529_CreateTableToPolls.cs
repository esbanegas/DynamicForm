using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class CreateTableToPolls : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Polls",
                schema: "dbo",
                columns: table => new
                {
                    PollId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "varchar(50)", unicode: false, nullable: false),
                    Description = table.Column<string>(type: "varchar(200)", unicode: false, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Polls", x => x.PollId);
                });

            migrationBuilder.CreateTable(
                name: "PollSections",
                schema: "dbo",
                columns: table => new
                {
                    PollSectionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PollId = table.Column<int>(type: "int", nullable: false),
                    SectionTitle = table.Column<string>(type: "varchar(80)", unicode: false, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PollSections", x => x.PollSectionId);
                    table.ForeignKey(
                        name: "FK_PollSections_Polls_PollId",
                        column: x => x.PollId,
                        principalSchema: "dbo",
                        principalTable: "Polls",
                        principalColumn: "PollId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PollQuestions",
                schema: "dbo",
                columns: table => new
                {
                    PollQuestionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PollSectionId = table.Column<int>(type: "int", nullable: false),
                    QuestionDescription = table.Column<string>(type: "varchar(200)", nullable: false),
                    AnswerType = table.Column<string>(type: "varchar(50)", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PollQuestions", x => x.PollQuestionId);
                    table.ForeignKey(
                        name: "FK_PollQuestions_PollSections_PollSectionId",
                        column: x => x.PollSectionId,
                        principalSchema: "dbo",
                        principalTable: "PollSections",
                        principalColumn: "PollSectionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PollAnswers",
                schema: "dbo",
                columns: table => new
                {
                    PollAnswerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PollQuestionId = table.Column<int>(type: "int", nullable: false),
                    AnswerDescription = table.Column<string>(type: "varchar(200)", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PollAnswers", x => x.PollAnswerId);
                    table.ForeignKey(
                        name: "FK_PollAnswers_PollQuestions_PollQuestionId",
                        column: x => x.PollQuestionId,
                        principalSchema: "dbo",
                        principalTable: "PollQuestions",
                        principalColumn: "PollQuestionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PollAnswers_PollQuestionId",
                schema: "dbo",
                table: "PollAnswers",
                column: "PollQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_PollQuestions_PollSectionId",
                schema: "dbo",
                table: "PollQuestions",
                column: "PollSectionId");

            migrationBuilder.CreateIndex(
                name: "IX_PollSections_PollId",
                schema: "dbo",
                table: "PollSections",
                column: "PollId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PollAnswers",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "PollQuestions",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "PollSections",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Polls",
                schema: "dbo");
        }
    }
}
