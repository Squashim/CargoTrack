using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CargoTrack.Modules.Logistics.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddCargoTypeRelationToJobOffers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Delete existing job offers that don't have CargoTypeId
            migrationBuilder.Sql("DELETE FROM logistics.\"JobOffers\";");

            migrationBuilder.AddColumn<Guid>(
                name: "CargoTypeId",
                schema: "logistics",
                table: "JobOffers",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_JobOffers_CargoTypeId",
                schema: "logistics",
                table: "JobOffers",
                column: "CargoTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobOffers_CargoTypes_CargoTypeId",
                schema: "logistics",
                table: "JobOffers",
                column: "CargoTypeId",
                principalSchema: "logistics",
                principalTable: "CargoTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobOffers_CargoTypes_CargoTypeId",
                schema: "logistics",
                table: "JobOffers");

            migrationBuilder.DropIndex(
                name: "IX_JobOffers_CargoTypeId",
                schema: "logistics",
                table: "JobOffers");

            migrationBuilder.DropColumn(
                name: "CargoTypeId",
                schema: "logistics",
                table: "JobOffers");
        }
    }
}
