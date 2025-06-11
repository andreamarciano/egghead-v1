# SQL - Syntax Basics

## 📚 Table of Contents

- [Basic Concepts](#basic)
- [Create & Drop a Database](#createdb)
- [Create & Drop a Table](#createtable)
- [Alias](#alias)

---

## Basic concepts {#basic}

### 🧩 Keywords

- SQL **keywords are not case-sensitive**: `SELECT`, `select`, and `SeLeCt` are equivalent.
- Conventionally, **uppercase is used** for keywords to improve readability.

### 📋 Query Structure

A basic SQL query typically consists of:

```sql
SELECT column1, column2
FROM table_name
WHERE condition;
```

- **SELECT**: list of fields to retrieve
- **FROM**: target table
- **WHERE**: (optional) filter condition

> The semicolon `;` at the end is used to **terminate statements**. It’s **optional** in many tools, but recommended.

### 💬 Comments

SQL supports two types of comments:

```sql
-- This is a single-line comment

/*
 This is a
 multi-line comment
*/
```

---

### 🧪 Example

```sql
-- Query: get employee by salary > 1800

SELECT name, hiring_date, salary
FROM employee
WHERE salary > 1800;
```

---

## Create & Drop a Database {#createdb}

### ➕ Create a Database

```sql
CREATE DATABASE db_test;
```

- This command creates a new database named `db_test`.
- After running it, **refresh your database client** (e.g., Beekeeper Studio) to see the new database appear.

### ➖ Drop a Database

```sql
DROP DATABASE db_test;
```

- This command **deletes** the `db_test` database **permanently**.
- As with creation, **refresh your client** to confirm the database is gone.

---

## Create & Drop a Table {#createtable}

### 🛠️ Create Table Syntax

To create a table, use the `CREATE TABLE` statement:

```sql
CREATE TABLE table_name (
  column_name data_type constraint,
  column_name data_type constraint,
  ...
);
```

You can also use `IF NOT EXISTS` to **avoid errors** if the table already exists.

```sql
CREATE TABLE IF NOT EXISTS employee (
  id INT,
  first_name VARCHAR(20),
  last_name VARCHAR(50),
  hiring_date DATE,
  salary DECIMAL
);
```

### 🗑️ Drop Table

To remove a table from the database:

```sql
DROP TABLE table_name;
```

---

### 📦 Common SQL Data Types

| Type         | Description                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| `INT`        | Stores numeric values in the range of **-2,147,483,648 to 2,147,483,647**.                             |
| `DECIMAL`    | Stores decimal values with **exact precision**.                                                        |
| `CHAR(n)`    | Stores **fixed-length strings** with a maximum size of **255 characters**.                             |
| `VARCHAR(n)` | Stores **variable-length strings** with a maximum size of **65,535 characters**.                       |
| `TEXT`       | Stores strings with a maximum size of **65,535 characters**.                                           |
| `DATE`       | Stores **date values** in the `YYYY-MM-DD` format.                                                     |
| `DATETIME`   | Stores combined **date and time** in the `YYYY-MM-DD HH:MM:SS` format.                                 |
| `TIMESTAMP`  | Stores **timestamp values** as the number of seconds since the Unix epoch (`1970-01-01 00:00:01` UTC). |

---

## Alias

**Aliases** allow you to assign temporary names to **tables** or **columns** to make your SQL queries more readable and concise.

---

### 📁 Table Alias

Used to shorten table names, especially useful in JOINs:

```sql
SELECT e.employee_id, e.first_name, e.hiring_date, e.phone, off.office_name
FROM employee AS e
INNER JOIN office AS off
ON e.office_id = off.office_id;
```

🔎 Equivalent to:

```sql
SELECT employee.employee_id, employee.first_name, employee.hiring_date, employee.phone, office.office_name
FROM employee
INNER JOIN office ON employee.office_id = office.office_id;
```

> You can also omit `AS` (optional):
> `FROM employee e INNER JOIN office off ON ...`

---

### 📄 Column Alias

Used to rename the output column of an expression or function:

```sql
SELECT first_name, DATE_FORMAT(hiring_date, "%e %M, %Y") AS hiring_date
FROM employee;
```

🔎 Equivalent to:

```sql
SELECT first_name, DATE_FORMAT(hiring_date, "%e %M, %Y")
FROM employee;
```

In the second version, the formatted date will appear with the function name as column label unless renamed.
