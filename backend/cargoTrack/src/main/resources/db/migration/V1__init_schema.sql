CREATE TABLE status (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(45) NOT NULL UNIQUE
);

CREATE TABLE company_types (
                              id SERIAL PRIMARY KEY,
                              type VARCHAR(45) NOT NULL
);

CREATE TABLE locations (
                          id SERIAL PRIMARY KEY,
                          number VARCHAR(10) DEFAULT ' ' NOT NULL,
                          longitude DECIMAL(10,7) NOT NULL,
                          latitude DECIMAL(10,7) NOT NULL,
                          postal_code VARCHAR(6) NOT NULL,
                          city VARCHAR(45) NOT NULL,
                          province VARCHAR(45) NOT NULL,
                          street VARCHAR(45) NOT NULL
);

CREATE TABLE building_type (
                               id SERIAL PRIMARY KEY,
                               vehicle_capacity INTEGER NOT NULL,
                               trailer_capacity INTEGER NOT NULL,
                               driver_capacity INTEGER NOT NULL,
                               name VARCHAR(45) NOT NULL,
                               radius DECIMAL(10,2) 
);

CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       company_name VARCHAR(100) NOT NULL UNIQUE,
                       balance DECIMAL(12,2) NOT NULL,
                       created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE building (
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(45) NOT NULL,
                          created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          location_id INTEGER NOT NULL REFERENCES locations(id),
                          building_type_id INTEGER NOT NULL REFERENCES building_type(id),
                          users_id INTEGER NOT NULL REFERENCES users(id)
);

CREATE TABLE transaction_types (
                                   id SERIAL PRIMARY KEY,
                                   name VARCHAR(45) NOT NULL UNIQUE
);

CREATE TABLE transactions (
                              id SERIAL PRIMARY KEY,
                              amount DECIMAL(12,2) NOT NULL,
                              timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                              users_id INTEGER NOT NULL REFERENCES users(id),
                              transaction_types_id INTEGER NOT NULL REFERENCES transaction_types(id),
                              name VARCHAR(45) NOT NULL
);

CREATE TABLE vehicle_types (
                               id SERIAL PRIMARY KEY,
                               name VARCHAR(45) NOT NULL,
                               trailer_required BOOLEAN NOT NULL
);

CREATE TABLE trailer_types (
                               id SERIAL PRIMARY KEY,
                               name VARCHAR(45) NOT NULL,
                               capacity DECIMAL(10,2) NOT NULL,
                               price DECIMAL(12,2) NOT NULL,
                               image_path VARCHAR(255) NOT NULL
);

CREATE TABLE vehicles (
                          id SERIAL PRIMARY KEY,
                          model VARCHAR(45) NOT NULL,
                          brand VARCHAR(45) NOT NULL,
                          horsepower INTEGER NOT NULL,
                          max_speed INTEGER NOT NULL,
                          production_year INTEGER NOT NULL,
                          fuel_consumption DECIMAL(5,2) NOT NULL,
                          price DECIMAL(12,2) NOT NULL,
                          color VARCHAR(45) NOT NULL DEFAULT 'white',
                          users_id INTEGER DEFAULT NULL REFERENCES users(id),
                          vehicle_types_id INTEGER NOT NULL REFERENCES vehicle_types(id),
                          status_id INTEGER DEFAULT null REFERENCES status(id),
                          image_path VARCHAR(255) NOT NULL,
                          register_number VARCHAR(20) DEFAULT NULL,
                          building_id INTEGER DEFAULT NULL REFERENCES building(id)
);

CREATE TABLE trailers (
                          id SERIAL PRIMARY KEY,
                          users_id INTEGER NOT NULL REFERENCES users(id),
                          trailer_types_id INTEGER NOT NULL REFERENCES trailer_types(id),
                          status_id INTEGER NOT NULL REFERENCES status(id),
                          BUILDING_ID INTEGER DEFAULT NULL REFERENCES building(id)
);

CREATE TABLE drivers (
                         id SERIAL PRIMARY KEY,
                         first_name VARCHAR(45) NOT NULL,
                         last_name VARCHAR(45) NOT NULL,
                         skills INTEGER NOT NULL,
                         salary DECIMAL(10,2) NOT NULL,
                         building_id INTEGER NOT NULL REFERENCES building(id),
                         status_id INTEGER NOT NULL REFERENCES status(id)
);

CREATE TABLE company (
                         id SERIAL PRIMARY KEY,
                         name VARCHAR(400) NOT NULL,
                         longitude DECIMAL(10,7) NOT NULL,
                         latitude DECIMAL(10,7) NOT NULL,
                         street VARCHAR(45) NOT NULL,
                         number VARCHAR(45) DEFAULT ' ' NOT NULL,
                         postal_code VARCHAR(6) NOT NULL,
                         city VARCHAR(45) NOT NULL,
                         province VARCHAR(45) NOT NULL,
                         company_types_id INTEGER NOT NULL REFERENCES company_types(id)
);

CREATE TABLE good_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL UNIQUE
);

CREATE TABLE good_subtypes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    good_type_id INTEGER NOT NULL REFERENCES good_types(id) ON DELETE CASCADE
);

CREATE TABLE goods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    weight DECIMAL(10,2) NOT NULL,
    base_price DECIMAL(12,2) NOT NULL,
    good_subtype_id INTEGER NOT NULL REFERENCES good_subtypes(id) ON DELETE CASCADE
);

CREATE TABLE jobs (
                      id SERIAL PRIMARY KEY,
                      distance DECIMAL(10,2) NOT NULL,
                      payment DECIMAL(12,2) NOT NULL,
                      destination_company INTEGER NOT NULL REFERENCES company(id),
                      origin_company INTEGER NOT NULL REFERENCES company(id),
                      goods_id INTEGER NOT NULL REFERENCES goods(id)
);

CREATE TABLE deliveries (
                            id SERIAL PRIMARY KEY,
                            start_time TIMESTAMP WITH TIME ZONE NOT NULL,
                            end_time TIMESTAMP WITH TIME ZONE,
                            fuel_used DECIMAL(10,2),
                            users_id INTEGER NOT NULL REFERENCES users(id),
                            jobs_id INTEGER NOT NULL REFERENCES jobs(id),
                            status_id INTEGER NOT NULL REFERENCES status(id)
);



CREATE TABLE trailer_goods_compatibility (
                                             id SERIAL PRIMARY KEY,
                                             jobs_id INTEGER NOT NULL REFERENCES jobs(id),
                                             good_types_id INTEGER NOT NULL REFERENCES good_types(id),
                                             trailer_types_id INTEGER NOT NULL REFERENCES trailer_types(id)
);