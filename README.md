DATABASE QUERIES:

1- Users Table
This table will store user information.
Stores user information (name, email, phone).

SQL
CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
full_name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
phone VARCHAR(15),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

2- Pets Table
This table will store information about pets available for adoption.
Stores pet information (name, age, breed, description, adoption status).

SQL
CREATE TABLE pets (
pet_id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
age INT,
breed VARCHAR(50),
description TEXT,
adopted BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

3- Applications Table
This table will handle the application submissions for adopting pets.
Links users and pets for adoption applications, with statuses.

SQL

CREATE TABLE applications (
application_id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
pet_id INT NOT NULL,
application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
status VARCHAR(20) DEFAULT 'Pending',
FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
FOREIGN KEY (pet_id) REFERENCES pets (pet_id) ON DELETE CASCADE
);
