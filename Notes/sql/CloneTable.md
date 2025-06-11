# SQL - Clone & Temporary Table

## 🧬 Clone Table

Cloning a table is useful when:

- You want to experiment on production data without risk.
- You need a testing copy of an existing table.

---

### 🔁 Clone Table Structure + Data

```sql
CREATE TABLE new_table LIKE original_table;
INSERT INTO new_table SELECT * FROM original_table;
```

✅ Clones structure, keys, **constraints** and data.

---

### 🔁 Clone Only Basic Structure (No Constraints)

```sql
CREATE TABLE new_table SELECT * FROM original_table;
```

✅ Copies column names and data, but **not constraints** like primary keys.

---

## 🕒 SQL – Temporary Tables

Temporary tables are useful when:

- You want a test table during a session.
- You want to avoid cluttering your permanent database.
- You need something disposable that auto-deletes on session end.

---

### 🆕 Create a Temporary Table (from scratch)

```sql
CREATE TEMPORARY TABLE temp1 (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    total_score INT NOT NULL
);
```

Insert test data:

```sql
INSERT INTO temp1
VALUES
(1, "Jolly", "Female", 20, 500),
(2, "Jon", "Male", 22, 545),
(3, "Sarah", "Female", 25, 600),
(4, "Alan", "Male", 23, 300);
```

Query the table:

```sql
SELECT * FROM temp1;
```

> ⚠️ Temporary tables don’t appear in the list of normal tables.

---

### 🧬 Clone into a Temporary Table

```sql
CREATE TEMPORARY TABLE temp2 SELECT * FROM person_score;
SELECT * FROM temp2;
```

✅ This copies data and structure from an existing table into a temporary one.

---

### ❌ Delete a Temporary Table Manually

```sql
DROP TEMPORARY TABLE temp1;
```

> ❗ If you don’t drop it manually, it will be automatically deleted when the session ends (e.g. disconnecting from the DB).
