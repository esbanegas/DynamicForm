using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class AddColumnUserAndValueForPolls : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                schema: "dbo",
                table: "Polls",
                type: "varchar(50)",
                unicode: false,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SelectedValue",
                schema: "dbo",
                table: "PollAnswers",
                type: "varchar(200)",
                unicode: false,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "dbo",
                table: "Polls");

            migrationBuilder.DropColumn(
                name: "SelectedValue",
                schema: "dbo",
                table: "PollAnswers");
        }
    }
}
