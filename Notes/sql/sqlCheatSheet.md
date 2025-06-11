# SQL - Quick Recap Cheat Sheet

## 📁 DDL – Data Definition Language

### Create Table

```sql
CREATE TABLE table_name (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);
```

### Drop Table

```sql
DROP TABLE table_name;
```

### Alter Table

```sql
-- Add column
ALTER TABLE table_name ADD column_name VARCHAR(50);

-- Modify column type
ALTER TABLE table_name MODIFY column_name INT;

-- Drop column
ALTER TABLE table_name DROP COLUMN column_name;

-- Rename table
ALTER TABLE old_name RENAME new_name;
```

---

## ✍️ DML – Data Manipulation Language

### Insert

```sql
INSERT INTO table_name (col1, col2) VALUES ("A", 100);
```

### Select

```sql
SELECT col1, col2 FROM table_name WHERE col1 = "A";
```

### Update

```sql
UPDATE table_name SET col2 = 200 WHERE col1 = "A";
```

### Delete

```sql
DELETE FROM table_name WHERE col1 = "A";
```

### Truncate

```sql
TRUNCATE TABLE table_name;
```

---

## 📌 Constraints

* `NOT NULL`
* `PRIMARY KEY (col)`
* `UNIQUE (col)`
* `FOREIGN KEY (col) REFERENCES other_table(id)`
* `DEFAULT 'value'`
* `CHECK (col > 0)`

---

## 🔗 JOINs

```sql
-- INNER JOIN
SELECT e.name, o.office_name
FROM employee e
INNER JOIN office o ON e.office_id = o.office_id;

-- LEFT JOIN
SELECT e.name, o.office_name
FROM employee e
LEFT JOIN office o ON e.office_id = o.office_id;

-- RIGHT JOIN
SELECT e.name, o.office_name
FROM employee e
RIGHT JOIN office o ON e.office_id = o.office_id;

-- FULL JOIN (MySQL: simulate with UNION)
SELECT ... FROM A LEFT JOIN B ...
UNION
SELECT ... FROM A RIGHT JOIN B ...
```

---

## GROUP BY & HAVING

```sql
SELECT o.office_name, COUNT(e.id) AS employee_total
FROM office o
LEFT JOIN employee e ON o.office_id = e.office_id
GROUP BY o.office_name
HAVING employee_total > 1;
```

---

## 🪞 Views

```sql
-- Create view
CREATE VIEW my_view AS
SELECT name FROM employee;

-- Use view
SELECT * FROM my_view;

-- Replace view
CREATE OR REPLACE VIEW my_view AS
SELECT * FROM office;

-- Drop view
DROP VIEW my_view;
```

---

## 🧪 Alias

```sql
-- Table alias
SELECT e.name FROM employee AS e;

-- Column alias
SELECT DATE_FORMAT(hiring_date, "%M %e, %Y") AS formatted_date FROM employee;
```

---

## 📅 Date & Time

```sql
-- Table with automatic timestamps
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

-- Insert current datetime
INSERT INTO table_name VALUES (..., NOW());

-- Extract part of date
SELECT YEAR(birth_date), MONTHNAME(birth_date) FROM employee;

-- Format date
SELECT DATE_FORMAT(birth_date, "%M %e, %Y") FROM employee;
```

---

## 🧬 Clone Tables

```sql
-- Structure only (with constraints)
CREATE TABLE clone LIKE original;

-- Insert all data
INSERT INTO clone SELECT * FROM original;

-- Structure & data (no constraints)
CREATE TABLE clone2 SELECT * FROM original;
```

---

## 🧾 Temporary Tables

```sql
-- Create new temporary table
CREATE TEMPORARY TABLE temp1 (
  id INT PRIMARY KEY,
  name VARCHAR(50)
);

-- Clone existing into temp
CREATE TEMPORARY TABLE temp2 SELECT * FROM employee;

-- Drop temporary table
DROP TEMPORARY TABLE temp1;
```
