-- # OFFICE
CREATE TABLE
    IF NOT EXISTS office (
        office_id INT NOT NULL AUTO_INCREMENT,
        office_name VARCHAR(30) NOT NULL,
        PRIMARY KEY (office_id)
    );

-- # EMPLOYEE
CREATE TABLE
    IF NOT EXISTS employee (
        employee_id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(20) NOT NULL,
        hiring_date DATE NOT NULL,
        salary DECIMAL NOT NULL CHECK (
            salary >= 1200
            AND salary <= 5000
        ),
        phone VARCHAR(10) NOT NULL UNIQUE,
        office_id INT,
        PRIMARY KEY (employee_id),
        FOREIGN KEY (office_id) REFERENCES office (office_id)
    );

-- # CUSTOMER
CREATE TABLE
    IF NOT EXISTS customer (
        customer_id INT NOT NULL AUTO_INCREMENT,
        company_name VARCHAR(255) NOT NULL,
        vat_number VARCHAR(16) NOT NULL UNIQUE,
        address VARCHAR(255) NOT NULL,
        city VARCHAR(30) NOT NULL,
        phone VARCHAR(10) NOT NULL UNIQUE,
        PRIMARY KEY (customer_id)
    );

-- # CUSTOMER RELATIONS
CREATE TABLE
    IF NOT EXISTS customer_relations (
        relation_id INT NOT NULL,
        customer_id INT NOT NULL,
        employee_id INT NOT NULL,
        PRIMARY KEY (relation_id),
        FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
        FOREIGN KEY (employee_id) REFERENCES employee (employee_id)
    );

-- # TIME TEST
CREATE TABLE
    IF NOT EXISTS time_test (
        id INT (4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL UNIQUE,
        birth_date DATE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );