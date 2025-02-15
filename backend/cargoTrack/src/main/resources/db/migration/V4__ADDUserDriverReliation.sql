ALTER TABLE drivers
    ADD COLUMN user_id INTEGER REFERENCES users(id);
