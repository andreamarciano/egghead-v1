# SQL – 📝 Data Manipulation (DML)

## ➕ `INSERT` – Add Records to a Table

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

## 🔍 `SELECT` – Query Data from a Table

```sql
SELECT column1, column2, ...
FROM table_name;
```

- Use `SELECT *` to fetch **all columns**.
- You can also specify only the **columns you need**.

---

### 🔸 Example

**Select specific columns:**

```sql
SELECT company_name, vat_number
FROM customers;
```
