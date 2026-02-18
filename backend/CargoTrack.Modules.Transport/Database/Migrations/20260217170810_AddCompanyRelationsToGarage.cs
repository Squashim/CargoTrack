using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CargoTrack.Modules.Transport.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddCompanyRelationsToGarage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Garages_CompanyId",
                schema: "game",
                table: "Garages",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Garages_Companies_CompanyId",
                schema: "game",
                table: "Garages",
                column: "CompanyId",
                principalSchema: "game",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Garages_Companies_CompanyId",
                schema: "game",
                table: "Garages");

            migrationBuilder.DropIndex(
                name: "IX_Garages_CompanyId",
                schema: "game",
                table: "Garages");
        }
    }
}
