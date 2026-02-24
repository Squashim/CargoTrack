using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CargoTrack.Modules.Transport.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddTransportJobRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                schema: "transport",
                table: "ActiveTransports",
                newName: "TrailerId");

            migrationBuilder.AddColumn<Guid>(
                name: "CompanyId",
                schema: "transport",
                table: "ActiveTransports",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "DriverId",
                schema: "transport",
                table: "ActiveTransports",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "JobOfferId",
                schema: "transport",
                table: "ActiveTransports",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_ActiveTransports_CompanyId",
                schema: "transport",
                table: "ActiveTransports",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_ActiveTransports_DriverId",
                schema: "transport",
                table: "ActiveTransports",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_ActiveTransports_TrailerId",
                schema: "transport",
                table: "ActiveTransports",
                column: "TrailerId");

            migrationBuilder.CreateIndex(
                name: "IX_ActiveTransports_TruckId",
                schema: "transport",
                table: "ActiveTransports",
                column: "TruckId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActiveTransports_Companies_CompanyId",
                schema: "transport",
                table: "ActiveTransports",
                column: "CompanyId",
                principalSchema: "game",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ActiveTransports_Drivers_DriverId",
                schema: "transport",
                table: "ActiveTransports",
                column: "DriverId",
                principalSchema: "game",
                principalTable: "Drivers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ActiveTransports_Trailers_TrailerId",
                schema: "transport",
                table: "ActiveTransports",
                column: "TrailerId",
                principalSchema: "game",
                principalTable: "Trailers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ActiveTransports_Trucks_TruckId",
                schema: "transport",
                table: "ActiveTransports",
                column: "TruckId",
                principalSchema: "game",
                principalTable: "Trucks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActiveTransports_Companies_CompanyId",
                schema: "transport",
                table: "ActiveTransports");

            migrationBuilder.DropForeignKey(
                name: "FK_ActiveTransports_Drivers_DriverId",
                schema: "transport",
                table: "ActiveTransports");

            migrationBuilder.DropForeignKey(
                name: "FK_ActiveTransports_Trailers_TrailerId",
                schema: "transport",
                table: "ActiveTransports");

            migrationBuilder.DropForeignKey(
                name: "FK_ActiveTransports_Trucks_TruckId",
                schema: "transport",
                table: "ActiveTransports");

            migrationBuilder.DropIndex(
                name: "IX_ActiveTransports_CompanyId",
                schema: "transport",
                table: "ActiveTransports");

            migrationBuilder.DropIndex(
                name: "IX_ActiveTransports_DriverId",
                schema: "transport",
                table: "ActiveTransports");

            migrationBuilder.DropIndex(
                name: "IX_ActiveTransports_TrailerId",
                schema: "transport",
                table: "ActiveTransports");

            migrationBuilder.DropIndex(
                name: "IX_ActiveTransports_TruckId",
                schema: "transport",
                table: "ActiveTransports");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                schema: "transport",
                table: "ActiveTransports");

            migrationBuilder.DropColumn(
                name: "DriverId",
                schema: "transport",
                table: "ActiveTransports");

            migrationBuilder.DropColumn(
                name: "JobOfferId",
                schema: "transport",
                table: "ActiveTransports");

            migrationBuilder.RenameColumn(
                name: "TrailerId",
                schema: "transport",
                table: "ActiveTransports",
                newName: "UserId");
        }
    }
}
