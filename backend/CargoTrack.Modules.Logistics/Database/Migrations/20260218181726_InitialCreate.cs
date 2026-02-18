using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

#nullable disable

namespace CargoTrack.Modules.Logistics.Database.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "logistics");

            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:postgis", ",,");

            migrationBuilder.CreateTable(
                name: "CargoTypes",
                schema: "logistics",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    BasePrice = table.Column<decimal>(type: "numeric", nullable: false),
                    RequiredTrailer = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CargoTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NpcCompanies",
                schema: "logistics",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Industry = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NpcCompanies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Depots",
                schema: "logistics",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NpcCompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    Location = table.Column<Point>(type: "geography(Point, 4326)", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Depots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Depots_NpcCompanies_NpcCompanyId",
                        column: x => x.NpcCompanyId,
                        principalSchema: "logistics",
                        principalTable: "NpcCompanies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobOffers",
                schema: "logistics",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SourceDepotId = table.Column<Guid>(type: "uuid", nullable: false),
                    TargetDepotId = table.Column<Guid>(type: "uuid", nullable: false),
                    RequiredTrailer = table.Column<int>(type: "integer", nullable: false),
                    CargoName = table.Column<string>(type: "text", nullable: false),
                    WeightTons = table.Column<double>(type: "double precision", nullable: false),
                    Revenue = table.Column<decimal>(type: "numeric", nullable: false),
                    DistanceKm = table.Column<double>(type: "double precision", nullable: false),
                    IsTaken = table.Column<bool>(type: "boolean", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobOffers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobOffers_Depots_SourceDepotId",
                        column: x => x.SourceDepotId,
                        principalSchema: "logistics",
                        principalTable: "Depots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobOffers_Depots_TargetDepotId",
                        column: x => x.TargetDepotId,
                        principalSchema: "logistics",
                        principalTable: "Depots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CargoTypes_Code",
                schema: "logistics",
                table: "CargoTypes",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Depots_NpcCompanyId",
                schema: "logistics",
                table: "Depots",
                column: "NpcCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_JobOffers_SourceDepotId",
                schema: "logistics",
                table: "JobOffers",
                column: "SourceDepotId");

            migrationBuilder.CreateIndex(
                name: "IX_JobOffers_TargetDepotId",
                schema: "logistics",
                table: "JobOffers",
                column: "TargetDepotId");

            migrationBuilder.CreateIndex(
                name: "IX_NpcCompanies_Code",
                schema: "logistics",
                table: "NpcCompanies",
                column: "Code",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CargoTypes",
                schema: "logistics");

            migrationBuilder.DropTable(
                name: "JobOffers",
                schema: "logistics");

            migrationBuilder.DropTable(
                name: "Depots",
                schema: "logistics");

            migrationBuilder.DropTable(
                name: "NpcCompanies",
                schema: "logistics");
        }
    }
}
