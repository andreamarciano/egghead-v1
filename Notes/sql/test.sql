CREATE TABLE
    IF NOT EXISTS employee (
        employee_id INT NOT NULL,
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        hiring_date DATE NOT NULL,
        salary DECIMAL NOT NULL CHECK (
            salary >= 1200
            AND salary <= 5000
        ),
        phone VARCHAR(10) NOT NULL UNIQUE,
        role VARCHAR(255) NOT NULL DEFAULT 'employee',
        PRIMARY KEY (employee_id)
    );

CREATE TABLE
    IF NOT EXISTS customer (
        customer_id INT NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        vat_number VARCHAR(16) NOT NULL UNIQUE,
        address VARCHAR(255) NOT NULL,
        phone VARCHAR(10) NOT NULL UNIQUE,
        PRIMARY KEY (customer_id)
    );

CREATE TABLE
    IF NOT EXISTS customer_relations (
        relation_id INT NOT NULL,
        customer_id INT NOT NULL,
        employee_id INT NOT NULL,
        PRIMARY KEY (relation_id),
        FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
        FOREIGN KEY (employee_id) REFERENCES employee (employee_id)
    );