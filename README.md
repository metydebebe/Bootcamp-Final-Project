POSTGRESQL DATABASE QUERIES:

1- Pets Table
This table will store information about pets available for adoption.

SQL

CREATE TABLE pets (
pet_id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
age INT,
pet_type VARCHAR(50),
description TEXT,
adopted BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

2- Applications Table
This table will handle the application submissions for adopting pets.

SQL

CREATE TABLE applications (
application_id SERIAL PRIMARY KEY,
pet_id INT NOT NULL,
full_name VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL,
phone VARCHAR(15),
address TEXT,
preferred_pet_type VARCHAR(50),
age_preference VARCHAR(20),
gender_preference VARCHAR(20),
previous_pet_ownership BOOLEAN,
experience_description TEXT,
reason_to_adopt TEXT,
special_needs TEXT,
application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
status VARCHAR(20) DEFAULT 'Pending',
FOREIGN KEY (pet_id) REFERENCES pets (pet_id) ON DELETE CASCADE
);

3- Events Table
This allows us to store data related to various events

SQL

CREATE TABLE events (
event_id SERIAL PRIMARY KEY,
event_name VARCHAR(100) NOT NULL,
event_date TIMESTAMP NOT NULL,
location VARCHAR(100),
description TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
