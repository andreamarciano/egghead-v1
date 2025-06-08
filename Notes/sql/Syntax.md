# SQL - Syntax Basics

## 📚 Table of Contents

- [Basic Concepts](#basic-concepts)
- [Create & Drop a Database](#create--drop-a-database)
- [Create & Drop a Table](#create--drop-a-table)

## Basic concepts

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

## Create & Drop a Database

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

## Create & Drop a Table

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
  fname VARCHAR(20),
  lname VARCHAR(50),
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
