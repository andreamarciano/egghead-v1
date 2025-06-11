# 🕒 SQL – Date & Time

## Table of Contents

- [Supported Data Types](#supported)
- [Automatic Timestamps](#timestamps)
- [Extract Date Parts](#extract)
- [Format Date](#format)

## 📅 Supported Data Types {#supported}

| Type        | Default Format            | Range                                      |
| ----------- | ------------------------- | ------------------------------------------ |
| `DATE`      | `YYYY-MM-DD`              | 1000-01-01 to 9999-12-31                   |
| `TIME`      | `HH:MM:SS` or `HHH:MM:SS` | -838:59:59 to 838:59:59                    |
| `DATETIME`  | `YYYY-MM-DD HH:MM:SS`     | 1000-01-01 00:00:00 to 9999-12-31 23:59:59 |
| `TIMESTAMP` | `YYYY-MM-DD HH:MM:SS`     | 1970-01-01 00:00:00 to 2037-12-31 23:59:59 |
| `YEAR`      | `YYYY`                    | 1901 to 2155                               |

---

## 🛠️ Automatic Timestamps {#timestamps}

You can set up columns to automatically store creation and update times.

```sql
CREATE TABLE IF NOT EXISTS time_test (
    id INT(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    birth_date DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

- `created_at`: automatically set to the current date and time on insertion.
- `updated_at`: updated to the current date and time whenever the row is updated.

---

### Insert with automatic timestamp

```sql
INSERT INTO time_test (name, birth_date)
VALUES ("Mark", "1995-06-06");
```

> You don’t need to specify the timestamps – they’re handled automatically.

---

### 🔄 Update and track modification time

```sql
UPDATE time_test
SET name = "Mario"
WHERE id = 1;
```

> The `updated_at` field will change automatically to reflect the update time.

---

## 🔍 Extract Date Parts {#extract}

You can extract specific parts of a date using functions:

```sql
SELECT name, YEAR(birth_date) FROM time_test;
```

Common functions include:

- `YEAR(date)`
- `MONTH(date)`
- `DAYOFMONTH(date)`
- `MONTHNAME(date)`
- `DAYNAME(date)`
- `HOUR(datetime)`
- `MINUTE(datetime)`
- `SECOND(datetime)`

---

## 🎨 Format Dates {#format}

Use `DATE_FORMAT()` to display dates in a custom format:

```sql
SELECT name, DATE_FORMAT(birth_date, "%M %e, %Y") AS birth_date
FROM time_test;
```

> Output example: `June 6, 1995`
