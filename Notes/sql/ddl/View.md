# SQL – VIEW

A **VIEW** is a **saved query** that behaves like a virtual table. Instead of rewriting the same SQL logic multiple times, you can reference a view directly.

```sql
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
[JOIN ...]
[WHERE ...];
```

**Example:**

```sql
CREATE VIEW test AS
SELECT e.employee_id, e.first_name, off.office_id
FROM employee AS e
LEFT JOIN office AS off
ON e.office_id = off.office_id;
```

> This view stores the structure of the query, **not** its result.
> To retrieve data, you must **query the view**:

```sql
SELECT * FROM test;
```

---

## 🔄 Replace an Existing View

If a view already exists, use `CREATE OR REPLACE` to update it:

```sql
CREATE OR REPLACE VIEW test AS
SELECT * FROM employee;

SELECT * FROM test;
```

---

## ❌ Drop a View

To permanently remove a view:

```sql
DROP VIEW test;
```

> This will delete the view definition (but not the underlying tables).
