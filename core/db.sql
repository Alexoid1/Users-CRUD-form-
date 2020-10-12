-- to create a new database
CREATE DATABASE form_node;

-- to use database
use form_node;

-- creating a new table
CREATE TABLE users (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  adress VARCHAR(100) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(15)
);

-- to show all tables
show tables;

-- to describe table
describe users;