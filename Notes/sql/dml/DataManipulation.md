# SQL – 📝 Data Manipulation (DML)

## Table of Contents

- [INSERT](#insert)
- [SELECT](#select)
  - [WHERE](#where)
    - [IN](#in)
    - [BETWEEN](#between)
    - [LIKE](#like)
  - [ORDER](#order)
  - [LIMIT](#limit)
  - [DISTINCT-count](#distinct)
- [UPDATE-set](#update)
- [DELETE](#delete)
- [TRUNCATE](#truncate)

## ➕ `INSERT` – Add Records to a Table {#insert}

```sql
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);
```

### 🔸 Example

```sql
INSERT INTO customers (customer_id, company_name, vat_number, address, phone)
VALUES (0, "Sweet Candies", "9045778", "First Road, New York", "3216767890");
```

> ⚠️ Make sure all rows match the same column order and data types.
> If you know the **column order**, you can omit the column list:

```sql
INSERT INTO customers
VALUES (0, "Sweet Candies", "9045778", "First Road, New York", "3216767890");
```

---

### 🔄 With `AUTO_INCREMENT`

If your table uses `AUTO_INCREMENT` for the ID field (e.g. `customer_id` or `employee_id`), you can omit that field:

```sql
INSERT INTO customers (company_name, vat_number, address, phone)
VALUES ("Sweet Candies", "9045778", "First Road, New York", "3216767890");
```

---

### 🧾 Multiple Inserts

You can insert multiple rows in a single query:

```sql
INSERT INTO customers (company_name, vat_number, address, phone)
VALUES
("Sweet Candies", "9045778", "First Road, New York", "3216767890"),
("Bitter Candies", "1045778", "Second Road, New York", "3116767840"),
("Salty Candies", "2222278", "Third Road, New York", "3444767890");
```

---

## 🔍 `SELECT` – Query Data from a Table {#select}

```sql
SELECT column1, column2, ...
FROM table_name;
```

- Use `SELECT *` to fetch **all columns**.
- You can also specify only the **columns you need**.

---

### 🔹 Example

**Select specific columns:**

```sql
SELECT company_name, vat_number
FROM customers;
```

## ⚙️ `WHERE` – Filter Query Results {#where}

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

---

### 🔸 Comparison Operators

- `=` → Equal
- `!=` or `<>` → Not equal
- `<`, `>`, `<=`, `>=` → Less/greater than
- `AND`, `OR`, `NOT` → Combine conditions

```sql
SELECT *
FROM employee
WHERE (role = "warehouseman" AND salary > 1300)
   OR (role = "employee" AND salary > 1500);
```

---

### 🔹 `IN` – Match Any Value in a List {#in}

```sql
SELECT *
FROM employee
WHERE role IN ("employee", "warehouseman");
```

---

### 🔹 `BETWEEN` – Range Filtering (Inclusive) {#between}

```sql
SELECT *
FROM employee
WHERE hiring_date BETWEEN "2018-01-31" AND "2018-12-31";
```

> Equivalent to: `hiring_date >= "2018-01-31" AND hiring_date <= "2018-12-31"`

---

### 🔹 `LIKE` – Pattern Matching {#like}

The `LIKE` operator is used for pattern-based filtering (mostly with strings):

| Symbol | Meaning                              |
| ------ | ------------------------------------ |
| `%`    | Matches **any** number of characters |
| `_`    | Matches **a single** character       |

```sql
-- Find employees whose first name starts with "Mar"
SELECT *
FROM employee
WHERE first_name LIKE "Mar%";

-- Find customers whose company name ends with "Candies"
SELECT *
FROM customers
WHERE company_name LIKE "%Candies";

-- Find employees whose name has 5 letters
SELECT *
FROM employee
WHERE first_name LIKE "_____";
```

> 🔍 Use `LIKE` when filtering strings that follow **partial or unknown patterns**.

---

## `ORDER BY` - Sort Query Results {#order}

```sql
SELECT column1, column2, ...
FROM table_name
ORDER BY column_name [ASC|DESC];
```

---

### 🔸  Example

```sql
SELECT *
FROM employee
ORDER BY salary ASC;
```

### 🔸 Ordering by Multiple Columns

When sorting by multiple columns, the order is **hierarchical**:
First column is sorted, then within that, the second column, and so on.

```sql
SELECT *
FROM employee
ORDER BY first_name, last_name ASC;
```

e.g. result:

```text
Mark Brown
Mark Purple
Mark Red
```

> Sorted first by `first_name`, and for rows with the same name, sorted by `last_name`.

---

## `LIMIT` – Restrict Number of Returned Rows {#limit}

```sql
SELECT column1, column2, ...
FROM table_name
LIMIT number_of_rows;
```

---

### 🔸  Examples

Top 3 highest salaries:

```sql
SELECT *
FROM employee
ORDER BY salary DESC
LIMIT 3;
```

Last added employee (assuming `employee_id` is AUTO\_INCREMENT):

```sql
SELECT *
FROM employee
ORDER BY employee_id DESC
LIMIT 1;
```

---

### 🔹 With Offset: `LIMIT offset, count`

Use `LIMIT` with **offset** to skip a number of rows before starting to return the results.

```sql
SELECT *
FROM employee
ORDER BY employee_id DESC
LIMIT 1, 2;
```

> 🔍 This means:

- **Skip** the first row
- **Return** the next 2 rows

---

📘 `LIMIT` is often combined with `ORDER BY` and used in **pagination** (e.g., show 10 items per page).

---

## `DISTINCT` - Eliminate Duplicate Values {#distinct}

```sql
SELECT DISTINCT column1, column2, ...
FROM table_name;
```

---

### 🔸 Examples

**Which cities do our customers work in?**

> Some cities may be repeated. Use `DISTINCT` to get only unique values.

```sql
SELECT DISTINCT city
FROM customer;
```

---

**How many different countries do our users come from?**

> Instead of listing all users (even from the same country), we want the **count of unique nations**.

```sql
SELECT COUNT(DISTINCT nation)
FROM user;
```

---

## `UPDATE` - Modify Existing Records {#update}

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

> ⚠️ **Always use a `WHERE` clause** to avoid updating **all rows** in the table.

---

### 🔸Examples

Update the phone number of a specific customer:

```sql
UPDATE customer
SET phone = "3494448923"
WHERE customer_id = 1;
```

---

Update multiple rows (same column):

```sql
UPDATE customer
SET city = "Rome"
WHERE customer_id = 1 OR customer_id = 3;
```

---

Update multiple columns in one row:

```sql
UPDATE customer
SET address = "3rd Road", city = "Milan"
WHERE customer_id = 3;
```

---

## `DELETE` - Delete Existing Records {#delete}

```sql
DELETE FROM table_name
WHERE condition;
```

> ⚠️ **Always include a `WHERE` clause** to avoid deleting **all records**.

---

### 🔸   Examples

**Delete a specific customer:**

```sql
DELETE FROM customer
WHERE customer_id = 7;
```

---

### Note on `AUTO_INCREMENT`

If your table uses `AUTO_INCREMENT`:

- Suppose you insert 7 records (IDs 1–7).
- Then delete records 6 and 7.
- The next inserted record will have ID **8**, not 6.

> This is because the auto-increment counter **remembers the last highest value**.

---

## `TRUNCATE` - Delete All Rows & Reset IDs {#truncate}

```sql
TRUNCATE TABLE table_name;
```

📌 Use `TRUNCATE` when:

- You want a **clean slate**
- You don’t need to filter which rows to delete
- You want to reset the primary key counter

> ❗ Make sure you don't need the data anymore – `TRUNCATE` is **irreversible** and much faster than `DELETE`.

---

### Key Differences: `TRUNCATE` vs `DELETE`

| Feature                | `TRUNCATE`                           | `DELETE`                         |
| ---------------------- | ------------------------------------ | -------------------------------- |
| Type                   | DDL (Data Definition Language)       | DML (Data Manipulation Language) |
| Auto Increment Reset   | ✅ Yes                                | ❌ No                             |
| Can Use `WHERE` Filter | ❌ No (removes all rows)              | ✅ Yes                            |
| Speed                  | ⚡ Very Fast (no row-by-row scan)     | 🐢 Slower (even without `WHERE`) |
| Table Structure        | Preserved (but recreated internally) | Preserved                        |

> - **DML (Data Manipulation Language)** command: operate on the **data** stored in database tables.
> - **DDL (Data Definition Language)** command: operate on the **structure of the database** (e.g., `CREATE TABLE`, `CREATE DATABASE`, `DROP TABLE`, `ALTER TABLE`).
