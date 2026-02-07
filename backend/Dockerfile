FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["CargoTrack.slnx", "./"]
COPY ["CargoTrack.API/CargoTrack.API.csproj", "CargoTrack.API/"]
COPY ["CargoTrack.Modules.Identity/CargoTrack.Modules.Identity.csproj", "CargoTrack.Modules.Identity/"]
COPY ["CargoTrack.Modules.Fleet/CargoTrack.Modules.Fleet.csproj", "CargoTrack.Modules.Fleet/"]
COPY ["CargoTrack.Modules.Transport/CargoTrack.Modules.Transport.csproj", "CargoTrack.Modules.Transport/"]

RUN dotnet restore "CargoTrack.slnx"

COPY . .

WORKDIR "/src/CargoTrack.API"
RUN dotnet publish "CargoTrack.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
EXPOSE 8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "CargoTrack.API.dll"]
