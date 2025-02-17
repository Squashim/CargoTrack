## API Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/auth/login` | Logowanie uzytkownika |
| POST   | `/auth/logout` | Wylogowanie uzytkownika |
| POST   | `/auth/refresh` | Odswiezenie tokenu jwt |
| POST   | `/auth/signup` | Rejestracja uzytkownika |
| POST   | `/auth/verify` | Weryfikacja tokenu jwt |
| GET    | `/user/buildings` | Budynki użytownika |
| GET    | `/user/deliveries` | Zlecenia użytkownika |
| GET    | `/user/details` | Statystyki użytkownika |
| GET    | `/user/drivers` | Pracownicy użytkownika |
| GET    | `/user/vehicles` | Pojazdy należące do użytkownika |
| GET    | `/vehicles/all` | Wszystkie pojazdy |
| GET    | `/vehicles/type/{vehicleTypeId}` | Pojazdy wg typu |