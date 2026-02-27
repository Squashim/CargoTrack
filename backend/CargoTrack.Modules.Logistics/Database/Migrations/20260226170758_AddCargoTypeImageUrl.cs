using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CargoTrack.Modules.Logistics.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddCargoTypeImageUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                schema: "logistics",
                table: "CargoTypes",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                schema: "logistics",
                table: "CargoTypes");
        }
    }
}
