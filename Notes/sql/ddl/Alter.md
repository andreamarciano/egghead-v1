# SQL - ALTER

The `ALTER TABLE` statement is used to **modify the structure** of an existing table. You can use it to add, remove, or change columns and constraints.

## Table of Contents

- [`ADD` - Add column](#add)
- [`MODIFY-AFTER` - Change position](#modify)
- [`ADD` - Add Constraint](#constraint)
- [`DROP COLUMN` - Remove column](#remove)
- [`MODIFY` - Change data type](#changetype)
- [`RENAME` - Rename table](#rename)

---

## ➕ Add a Column {#add}

```sql
ALTER TABLE table_name
ADD column_name data_type constraints;
```

Example:

```sql
ALTER TABLE customer_relations
ADD test VARCHAR(50) NOT NULL;
```

---

## Change Column Position {#modify}

You can reposition a column using `AFTER`:

```sql
ALTER TABLE table_name
MODIFY column_name column_definition AFTER column_name;
```

Example:

```sql
ALTER TABLE customer_relations
MODIFY test VARCHAR(50) AFTER relation_id;
```

---

## Add a Constraint {#constraint}

You can add constraints such as `UNIQUE`, `PRIMARY KEY`, `FOREIGN KEY`, `CHECK`, etc.

```sql
ALTER TABLE table_name
ADD UNIQUE (column_name, ...);
```

Example:

```sql
ALTER TABLE customer_relations
ADD UNIQUE (test);
```

---

## ❌ Remove a Column {#remove}

```sql
ALTER TABLE table_name
DROP COLUMN column_name;
```

Example:

```sql
ALTER TABLE customer_relations
DROP COLUMN test;
```

---

## Change Column Data Type {#changetype}

```sql
ALTER TABLE table_name
MODIFY column_name new_data_type;
```

Example:

```sql
ALTER TABLE customer_relations
MODIFY test INT;
```

---

### 📝 Rename a Table {#rename}

```sql
ALTER TABLE current_table_name
RENAME new_table_name;
```

Example:

```sql
ALTER TABLE customer_relations
RENAME new_customer_relations;
```
