FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["CargoTrack.slnx", "./"]
COPY ["CargoTrack.API/CargoTrack.API.csproj", "CargoTrack.API/"]
COPY ["CargoTrack.Modules.Identity/CargoTrack.Modules.Identity.csproj", "CargoTrack.Modules.Identity/"]
COPY ["CargoTrack.Modules.Transport/CargoTrack.Modules.Transport.csproj", "CargoTrack.Modules.Transport/"]
COPY ["CargoTrack.Modules.Logistics/CargoTrack.Modules.Logistics.csproj", "CargoTrack.Modules.Logistics/"]
COPY ["CargoTrack.Modules.Shared/CargoTrack.Modules.Shared.csproj", "CargoTrack.Modules.Shared/"]
COPY ["CargoTrack.Contracts/CargoTrack.Contracts.csproj", "CargoTrack.Contracts/"]

RUN dotnet restore "CargoTrack.slnx"

COPY . .

WORKDIR "/src/CargoTrack.API"
RUN dotnet publish "CargoTrack.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
EXPOSE 8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "CargoTrack.API.dll"]