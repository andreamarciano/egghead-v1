# SQL – GROUP BY

`GROUP BY` is used to **aggregate rows** that share the same value in one or more columns. It is commonly used with aggregate functions like `COUNT`, `SUM`, `AVG`, etc.

## Table of Contents

- [Group By](#group)
- [Having](#having)

---

## 👥 Grouping Data {#group}

Let’s say we want to list all offices and count how many employees are assigned to each one.

```sql
SELECT off.office_name
FROM office AS off
LEFT JOIN employee AS e 
ON off.office_id = e.office_id;
```

🔎 Output (example):

```text
Administration
Customer Service
Customer Service
Sales
Sales
Human Resources
```

> Since we use a **LEFT JOIN**, even offices with no employees (e.g. Human Resources) are included.

---

### ✅ Use GROUP BY

To remove duplicates and aggregate by office:

```sql
SELECT off.office_name
FROM office AS off
LEFT JOIN employee AS e 
ON off.office_id = e.office_id
GROUP BY off.office_name;
```

This gives each office only once.

---

### 🔢 Count Employees per Office

We can use `COUNT()` along with `GROUP BY`:

```sql
SELECT off.office_name, COUNT(e.employee_id) AS employee_total
FROM office AS off
LEFT JOIN employee AS e ON off.office_id = e.office_id
GROUP BY off.office_name;
```

> This will return the number of employees in each office.
> Offices with no employees will show `0`.

---

## HAVING Clause {#having}

The `HAVING` clause filters groups **after aggregation** (like a `WHERE` but for grouped data):

```sql
SELECT off.office_name, COUNT(e.employee_id) AS employee_total
FROM office AS off
LEFT JOIN employee AS e ON off.office_id = e.office_id
GROUP BY off.office_name
HAVING employee_total = 2;
```

> Returns only offices that have exactly 2 employees.
