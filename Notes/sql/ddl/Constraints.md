# SQL - 🧷 Constraints

**Constraints** are rules applied to columns to enforce data integrity in the database.

| Constraint    | Description                                            |
| ------------- | ------------------------------------------------------ |
| `NOT NULL`    | Ensures the column **cannot be null**                  |
| `PRIMARY KEY` | Uniquely identifies each row; **cannot be null**       |
| `UNIQUE`      | Ensures all values in the column are **distinct**      |
| `DEFAULT`     | Sets a **default value** when no value is provided     |
| `CHECK`       | Restricts values using a **condition**                 |
| `FOREIGN KEY` | Links a column to the **primary key** of another table |
| `INDEX`       | Speeds up data retrieval                               |

---

## Example 1: `employee` Table with Constraints

```sql
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
```

> 🔎 `phone` is `UNIQUE`, but not a good `PRIMARY KEY` since it might change. A national ID or tax code would be more stable, but these depend on the country.

---

## Example 2: `customer` Table

```sql
CREATE TABLE
    IF NOT EXISTS customer (
        customer_id INT NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        vat_number VARCHAR(16) NOT NULL UNIQUE,
        address VARCHAR(255) NOT NULL,
        phone VARCHAR(10) NOT NULL UNIQUE,
        PRIMARY KEY (customer_id)
    );
```

---

## 🔗 Example 3: Relationship Table

Each customer is assigned a support employee. The `customer_relations` table represents the **many-to-one relationship** (many customers → one employee) between customers and employees:

```sql
CREATE TABLE
    IF NOT EXISTS customer_relations (
        relation_id INT NOT NULL,
        customer_id INT NOT NULL,
        employee_id INT NOT NULL,
        PRIMARY KEY (relation_id),
        FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
        FOREIGN KEY (employee_id) REFERENCES employee (employee_id)
    );
```
