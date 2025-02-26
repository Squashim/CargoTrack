CREATE TABLE user_vehicles (
    id SERIAL PRIMARY KEY,
    users_id INTEGER NOT NULL REFERENCES users(id),
    vehicle_id INTEGER NOT NULL REFERENCES vehicles(id),
    status_id INTEGER NOT NULL REFERENCES status(id),
    register_number VARCHAR(20) UNIQUE DEFAULT NULL,
    building_id INTEGER DEFAULT NULL REFERENCES building(id),
    trailer_id INTEGER DEFAULT NULL REFERENCES trailers(id)
);
ALTER TABLE drivers
    ADD COLUMN user_vehicle_id INTEGER DEFAULT NULL REFERENCES user_vehicles(id);

    ALTER TABLE deliveries
    ADD COLUMN user_vehicle_id INTEGER NOT NULL REFERENCES user_vehicles(id);
    ALTER TABLE vehicles
    DROP COLUMN users_id,
    DROP COLUMN building_id,
    DROP COLUMN register_number;
    ALTER TABLE user_vehicles
    ADD CONSTRAINT fk_trailer FOREIGN KEY (trailer_id) REFERENCES trailers(id);
