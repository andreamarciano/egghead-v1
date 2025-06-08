# SQL - Syntax Basics

## Basic concepts:

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

> ⚠️ Be careful with `DROP DATABASE` — it cannot be undone.
