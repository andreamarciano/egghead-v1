# Prisma

## 🔷 What is Prisma?

Prisma is a modern **ORM (Object Relational Mapper)** for **Node.js and TypeScript**.  
It helps you **interact with SQL databases** (e.g., PostgreSQL, MySQL, SQLite) using clean, type-safe JavaScript/TypeScript instead of raw SQL.

---

## ⚙️ What Prisma does

- Generates a **type-safe client** based on your DB schema
- Lets you **create, read, update, and delete** records using JS methods
- Keeps your **database and models in sync** with migrations
- Works great with REST, GraphQL, and frameworks like Express or Next.js

---

## Example Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
```

---

## 📦 Installation

```bash
npm install prisma --save-dev
npx prisma init
```

---

## 🔄 Migration + Client Generation

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 🧑‍💻 Basic Usage in Node/Express

```js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all users
const users = await prisma.user.findMany();

// Create a user
await prisma.user.create({
  data: { name: 'Mario', email: 'mario@example.com' }
});

// Find a user by ID
const user = await prisma.user.findUnique({ where: { id: 1 } });
```

---

## 🧰 Common Prisma Client Methods

### 📄 **Read Methods**

| Method                | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| `findMany()`          | Get multiple records with optional filters                      |
| `findUnique()`        | Get a single record by a unique field like `id` or `email`      |
| `findFirst()`         | Get the first record matching a filter (not necessarily unique) |
| `findUniqueOrThrow()` | Like `findUnique`, but throws an error if not found             |
| `findFirstOrThrow()`  | Like `findFirst`, but throws an error if not found              |
| `count()`             | Count how many records match a given filter                     |

### ✍️ **Write Methods (Create / Update / Delete)**

| Method         | Description                               |
| -------------- | ----------------------------------------- |
| `create()`     | Create a new record                       |
| `createMany()` | Create multiple records at once           |
| `update()`     | Update a single record by a unique field  |
| `updateMany()` | Update multiple records matching a filter |
| `delete()`     | Delete a single record by a unique field  |
| `deleteMany()` | Delete multiple records matching a filter |
| `upsert()`     | Update if exists, create if it doesn't    |

### 🔗 **Query Options**

| Option          | Description                               |
| --------------- | ----------------------------------------- |
| `where`         | Define filtering conditions               |
| `include`       | Include related data (e.g., `user.todos`) |
| `select`        | Select specific fields                    |
| `orderBy`       | Sort results                              |
| `skip` / `take` | Paginate results (skip and limit)         |

---

## 🛑 Note on Validation

Prisma **does not validate input data**.
You should use tools like `zod`, `yup`, or `express-validator` to handle validation before calling Prisma methods.
