CREATE TABLE IF NOT EXISTS public.building
(
    id_building bigserial NOT NULL,
    price character varying(45) COLLATE pg_catalog."default" NOT NULL,
    available_truck_slots character varying(45) COLLATE pg_catalog."default" NOT NULL,
    max_truck_slots character varying(45) COLLATE pg_catalog."default" NOT NULL,
    employee_slots character varying(45) COLLATE pg_catalog."default" NOT NULL,
    available_employee_slots character varying(45) COLLATE pg_catalog."default" NOT NULL,
    city_id integer NOT NULL,
    user_id_user bigint,
    building_type_id_building_type integer NOT NULL,
    building_stage integer NOT NULL,
    CONSTRAINT building_pkey PRIMARY KEY (id_building)
    );


CREATE TABLE IF NOT EXISTS public.building_type
(
    id_building_type serial NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT building_type_pkey PRIMARY KEY (id_building_type),
    CONSTRAINT building_type_name_key UNIQUE (name)
    );


CREATE TABLE IF NOT EXISTS public.city
(
    id_city serial NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    population integer NOT NULL,
    coordinates character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT city_pkey PRIMARY KEY (id_city),
    CONSTRAINT city_coordinates_key UNIQUE (coordinates)
    );


CREATE TABLE IF NOT EXISTS public.delivery
(
    id_delivery bigserial NOT NULL,
    description character varying(200) COLLATE pg_catalog."default" NOT NULL,
    title character varying(45) COLLATE pg_catalog."default" NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    start_city_id integer NOT NULL,
    end_city_id integer NOT NULL,
    user_id_user bigint,
    remuneration double precision NOT NULL,
    CONSTRAINT delivery_pkey PRIMARY KEY (id_delivery)
    );


CREATE TABLE IF NOT EXISTS public.employee
(
    id_employee bigserial NOT NULL,
    firstname character varying(25) COLLATE pg_catalog."default" NOT NULL,
    lastname character varying(45) COLLATE pg_catalog."default" NOT NULL,
    birth_date date NOT NULL,
    overall double precision NOT NULL,
    user_id_user bigint,
    CONSTRAINT employee_pkey PRIMARY KEY (id_employee)
    );


CREATE TABLE IF NOT EXISTS public.trailer
(
    id_trailer bigserial NOT NULL,
    name character varying(45) COLLATE pg_catalog."default" NOT NULL,
    capacity double precision NOT NULL,
    register_number character varying(10) COLLATE pg_catalog."default" NOT NULL,
    user_id_user bigint,
    trailer_type_id_trailer_type integer NOT NULL,
    CONSTRAINT trailer_pkey PRIMARY KEY (id_trailer),
    CONSTRAINT trailer_register_number_key UNIQUE (register_number)
    );


CREATE TABLE IF NOT EXISTS public.trailer_type
(
    id_trailer_type serial NOT NULL,
    type_name character varying(45) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT trailer_type_pkey PRIMARY KEY (id_trailer_type)
    );


CREATE TABLE IF NOT EXISTS public."user"
(
    id_user bigserial NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    company_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id_user),
    CONSTRAINT user_company_name_key UNIQUE (company_name),
    CONSTRAINT user_email_key UNIQUE (email)
    );


CREATE TABLE IF NOT EXISTS public.vehicle
(
    id_vehicle bigserial NOT NULL,
    model character varying(25) COLLATE pg_catalog."default" NOT NULL,
    mark character varying(25) COLLATE pg_catalog."default" NOT NULL,
    production_date date NOT NULL,
    register_number character varying(10) COLLATE pg_catalog."default" NOT NULL,
    power double precision NOT NULL,
    user_id_user bigint,
    vehicle_type_id_vehicle_type integer NOT NULL,
    CONSTRAINT vehicle_pkey PRIMARY KEY (id_vehicle),
    CONSTRAINT vehicle_register_number_key UNIQUE (register_number)
    );


CREATE TABLE IF NOT EXISTS public.vehicle_type
(
    id_vehicle_type serial NOT NULL,
    name character varying(25) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT vehicle_type_pkey PRIMARY KEY (id_vehicle_type)
    );


ALTER TABLE IF EXISTS public.building
    ADD CONSTRAINT building_building_type_id_building_type_fkey FOREIGN KEY (building_type_id_building_type)
    REFERENCES public.building_type (id_building_type) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION;




ALTER TABLE IF EXISTS public.building
    ADD CONSTRAINT building_city_id_fkey FOREIGN KEY (city_id)
    REFERENCES public.city (id_city) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION;




ALTER TABLE IF EXISTS public.building
    ADD CONSTRAINT building_user_id_user_fkey FOREIGN KEY (user_id_user)
    REFERENCES public."user" (id_user) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION;




ALTER TABLE IF EXISTS public.delivery
    ADD CONSTRAINT delivery_end_city_id_fkey FOREIGN KEY (end_city_id)
    REFERENCES public.city (id_city) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION;




ALTER TABLE IF EXISTS public.delivery
    ADD CONSTRAINT delivery_start_city_id_fkey FOREIGN KEY (start_city_id)
    REFERENCES public.city (id_city) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION;




ALTER TABLE IF EXISTS public.delivery
    ADD CONSTRAINT delivery_user_id_user_fkey FOREIGN KEY (user_id_user)
    REFERENCES public."user" (id_user) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION;




ALTER TABLE IF EXISTS public.employee
    ADD CONSTRAINT employee_user_id_user_fkey FOREIGN KEY (user_id_user)
    REFERENCES public."user" (id_user) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION;




ALTER TABLE IF EXISTS public.trailer
    ADD CONSTRAINT trailer_trailer_type_id_trailer_type_fkey FOREIGN KEY (trailer_type_id_trailer_type)
    REFERENCES public.trailer_type (id_trailer_type) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION;




ALTER TABLE IF EXISTS public.trailer
    ADD CONSTRAINT trailer_user_id_user_fkey FOREIGN KEY (user_id_user)
    REFERENCES public."user" (id_user) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION;




ALTER TABLE IF EXISTS public.vehicle
    ADD CONSTRAINT vehicle_user_id_user_fkey FOREIGN KEY (user_id_user)
    REFERENCES public."user" (id_user) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION;




ALTER TABLE IF EXISTS public.vehicle
    ADD CONSTRAINT vehicle_vehicle_type_id_vehicle_type_fkey FOREIGN KEY (vehicle_type_id_vehicle_type)
    REFERENCES public.vehicle_type (id_vehicle_type) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION;






