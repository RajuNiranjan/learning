--
-- COLLEGE TABLE
CREATE TABLE IF NOT EXISTS colleges (
    college_id SERIAL PRIMARY KEY,
    college_name VARCHAR(255) NOT NULL,
    university VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('PRIVATE', 'PUBLIC')),
    established_year INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_number VARCHAR(255) NOT NULL,
    website VARCHAR(255) NOT NULL
) --
--
-- DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL,
    college_id INT NOT NULL,
    FOREIGN KEY (college_id) REFERENCES colleges(college_id)
) --
-- COURSES TABLE
--
CREATE TABLE IF NOT EXISTS courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    course_type VARCHAR(20) NOT NULL CHECK (course_type IN ('BTECH', 'MTECH', 'PHD')),
    duration INT NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
) --
-- STUDENTS TABLE
--
CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    student_email VARCHAR(255) NOT NULL,
    student_phone VARCHAR(255) NOT NULL,
    gender VARCHAR(20) NOT NULL CHECK (gender IN ('MALE', 'FEMALE')),
    dob DATE NOT NULL,
    address TEXT NOT NULL,
    college_id INT NOT NULL,
    department_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_year INT NOT NULL,
    FOREIGN KEY (college_id) REFERENCES colleges(college_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
) --
-- FACULTY TABLE
--
CREATE TABLE IF NOT EXISTS faculty (
    faculty_id SERIAL PRIMARY KEY,
    faculty_name VARCHAR(255) NOT NULL,
    faculty_email VARCHAR(255) NOT NULL,
    faculty_phone VARCHAR(255) NOT NULL,
    gender VARCHAR(20) NOT NULL CHECK (gender IN ('MALE', 'FEMALE')),
    dob DATE NOT NULL,
    address TEXT NOT NULL,
    department_id INT NOT NULL,
    college_id INT NOT NULL,
    designation VARCHAR(20) NOT NULL CHECK (
        designation IN ('ASSISTANT', 'ASSOCIATE', 'PROFESSOR')
    ),
    joining_date DATE NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    FOREIGN KEY (college_id) REFERENCES colleges(college_id)
) --
-- SUBJECTS TABLE
--
CREATE TABLE IF NOT EXISTS subjects (
    subject_id SERIAL PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL,
    course_id INT NOT NULL,
    faculty_id INT NOT NULL,
    semester INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id)
) --
-- SUBJECTS TABLE
--
CREATE TABLE IF NOT EXISTS enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    semester INT NOT NULL,
    grade VARCHAR(5),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
) --
-- RESULTS TABLE
--
CREATE TABLE IF NOT EXISTS results (
    result_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    semester INT NOT NULL,
    grade VARCHAR(5),
    marks INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
)