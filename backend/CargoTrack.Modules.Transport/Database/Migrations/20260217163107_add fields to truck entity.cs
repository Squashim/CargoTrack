using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

#nullable disable

namespace CargoTrack.Modules.Transport.Database.Migrations
{
    /// <inheritdoc />
    public partial class addfieldstotruckentity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Transports",
                schema: "transport",
                table: "Transports");

            migrationBuilder.EnsureSchema(
                name: "game");

            migrationBuilder.RenameTable(
                name: "Transports",
                schema: "transport",
                newName: "ActiveTransports",
                newSchema: "transport");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ActiveTransports",
                schema: "transport",
                table: "ActiveTransports",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Companies",
                schema: "game",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Color = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Balance = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    Level = table.Column<int>(type: "integer", nullable: false),
                    Reputation = table.Column<decimal>(type: "numeric", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Garages",
                schema: "game",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    Location = table.Column<Point>(type: "geography(Point, 4326)", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Slots = table.Column<int>(type: "integer", nullable: false),
                    Level = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Garages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Trucks",
                schema: "game",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    Model = table.Column<string>(type: "text", nullable: false),
                    LicensePlate = table.Column<string>(type: "text", nullable: false),
                    Odometer = table.Column<decimal>(type: "numeric", nullable: false),
                    Fuel = table.Column<decimal>(type: "numeric", nullable: false),
                    MaxFuel = table.Column<decimal>(type: "numeric", nullable: false),
                    IsDriving = table.Column<bool>(type: "boolean", nullable: false),
                    ProductionYear = table.Column<int>(type: "integer", nullable: false),
                    Condition = table.Column<decimal>(type: "numeric", nullable: false),
                    GarageId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trucks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Trucks_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalSchema: "game",
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Trucks_Garages_GarageId",
                        column: x => x.GarageId,
                        principalSchema: "game",
                        principalTable: "Garages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Drivers",
                schema: "game",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Salary = table.Column<decimal>(type: "numeric", nullable: false),
                    AssignedTruckId = table.Column<Guid>(type: "uuid", nullable: true),
                    IsDriving = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drivers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Drivers_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalSchema: "game",
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Drivers_Trucks_AssignedTruckId",
                        column: x => x.AssignedTruckId,
                        principalSchema: "game",
                        principalTable: "Trucks",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Trailers",
                schema: "game",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    AttachedTruckId = table.Column<Guid>(type: "uuid", nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    CargoCapacityKg = table.Column<double>(type: "double precision", nullable: false),
                    Condition = table.Column<double>(type: "double precision", nullable: false),
                    ModelName = table.Column<string>(type: "text", nullable: false),
                    GarageId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trailers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Trailers_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalSchema: "game",
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Trailers_Garages_GarageId",
                        column: x => x.GarageId,
                        principalSchema: "game",
                        principalTable: "Garages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Trailers_Trucks_AttachedTruckId",
                        column: x => x.AttachedTruckId,
                        principalSchema: "game",
                        principalTable: "Trucks",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_AssignedTruckId",
                schema: "game",
                table: "Drivers",
                column: "AssignedTruckId");

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_CompanyId",
                schema: "game",
                table: "Drivers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Trailers_AttachedTruckId",
                schema: "game",
                table: "Trailers",
                column: "AttachedTruckId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Trailers_CompanyId",
                schema: "game",
                table: "Trailers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Trailers_GarageId",
                schema: "game",
                table: "Trailers",
                column: "GarageId");

            migrationBuilder.CreateIndex(
                name: "IX_Trucks_CompanyId",
                schema: "game",
                table: "Trucks",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Trucks_GarageId",
                schema: "game",
                table: "Trucks",
                column: "GarageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Drivers",
                schema: "game");

            migrationBuilder.DropTable(
                name: "Trailers",
                schema: "game");

            migrationBuilder.DropTable(
                name: "Trucks",
                schema: "game");

            migrationBuilder.DropTable(
                name: "Companies",
                schema: "game");

            migrationBuilder.DropTable(
                name: "Garages",
                schema: "game");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ActiveTransports",
                schema: "transport",
                table: "ActiveTransports");

            migrationBuilder.RenameTable(
                name: "ActiveTransports",
                schema: "transport",
                newName: "Transports",
                newSchema: "transport");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Transports",
                schema: "transport",
                table: "Transports",
                column: "Id");
        }
    }
}
