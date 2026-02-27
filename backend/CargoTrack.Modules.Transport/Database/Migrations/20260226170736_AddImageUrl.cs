using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CargoTrack.Modules.Transport.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddImageUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                schema: "game",
                table: "Trucks",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                schema: "game",
                table: "Trailers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                schema: "game",
                table: "Drivers",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                schema: "game",
                table: "Trucks");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                schema: "game",
                table: "Trailers");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                schema: "game",
                table: "Drivers");
        }
    }
}
