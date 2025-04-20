< --- USE DATABASE --- >
USE college;
< --- CREATE TABLE --- >
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULl,
    email VARCHAR(255) NOT NULL UNIQUE,
    branch VARCHAR(255) NOT NULL,
    year INT NOT NULL
);
< --- INSERT DATA ONE DATA --- >
INSERT INTO students (name, email, branch, year)
VALUES ("Shammu", "shammu@gmail.com", "ECE", 2019);
< --- SELECT DATA --- >
SELECT *
FROM students;
< --- ALTER TABLE --- >
ALTER TABLE students
MODIFY COLUMN branch ENUM("CIVIL", "EEE", "MECH", "ECE", "CSE", "IT") NOT NULL,
    MODIFY COLUMN year VARCHAR(255) NOT NULL;
< --- INSERT DATA MULTIPLE DATA --- >
INSERT INTO students (name, email, branch, year)
VALUES (
        "Raju",
        "raju@gmail.com",
        "EEE",
        "2019-2023"
    ),
    (
        "Satyam",
        "satyam@gmail.com",
        "CSE",
        "2019-2023"
    );
< --- UPDATE DATA ONE STUDENT --- >
UPDATE students
SET year = "2019-2023"
WHERE id = 1;
< --- SELECT DATA ORDER BY NAME --- >
SELECT *
FROM students
ORDER BY name DESC;
< --- LIMIT --- >
SELECT *
FROM students
LIMIT 5;
< --- ADD AGE COLUMN --- >
ALTER TABLE students
ADD COLUMN age INT NOT NULL;
-- ADDING AGE TO THE ALL STUDENTS
UPDATE students
SET age = 21;
-- ADDING PERSENTAGE COLUMN
ALTER TABLE students
ADD COLUMN persentage INT NOT NULL;
-- ADDING PERSENTAGE TO THE ALL STUDENTS
UPDATE students
SET persentage = 85
WHERE id = 1;
UPDATE students
SET persentage = 80
WHERE id = 2;
UPDATE students
SET persentage = 75
WHERE id = 3;
-- SELECTING DATA
SELECT *
FROM students;
-- RENAME COLUNM TITLE
ALTER TABLE students
    RENAME COLUMN persentage TO marks;
-- AVERAGE OF MARKS
SELECT AVG(marks)
FROM students;
-- MAXIMUM MARKS
SELECT MAX(marks)
FROM students;
-- MINIMUM MARKS
SELECT MIN(marks)
FROM students;
-- SUM OF MARKS
SELECT SUM(marks)
FROM students;
-- COUNT OF STUDENTS
SELECT COUNT(name)
FROM students;
UPDATE students
set age = 23
WHERE id = 2;
CREATE DATABASE IF NOT EXISTS user;
DROP DATABASE IF EXISTS user;