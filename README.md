# 📊 Expense Tracker Backend

This is the backend API for an **Expense Tracker** application built with **Node.js**, **Express**, **MongoDB**, and **Redis**. It handles user authentication, transaction management (income/expense), and account operations.

> 💡 This is a personal self-project aimed at tracking financial transactions and helping users manage their expenses.

---

## 🛠️ Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** (Mongoose ODM)
- **Redis** (for auth token storage)
- **UUID** & **Crypto** (secure token generation)
- **Helmet** (basic security headers)

---

## 📁 Project Structure (Overview)

```
.
├── app.js               # App entry point
├── routes/              # API route handlers
├── models/              # Mongoose models
├── db/                  # DB connections & transactions
├── middlewares/         # Express middlewares
├── utils/               # Helpers (request parsing, hashing, shutdown, etc.)
├── constants/           # Shared constants
└── env/                 # Environment configuration
```

---

## 🧠 Models

### User

| Field            | Type   | Description             |
| ---------------- | ------ | ----------------------- |
| `username`       | String | Unique, required        |
| `password`       | String | Required                |
| `createdAt`      | Number | Timestamp (default now) |
| `currentBalance` | Number | User's current balance  |

### Transaction

| Field       | Type   | Description                |
| ----------- | ------ | -------------------------- |
| `username`  | String | Refers to the user         |
| `value`     | Number | Amount of the transaction  |
| `type`      | String | `"EXPENSE"` or `"INCOME"`  |
| `message`   | String | Description of transaction |
| `createdAt` | Number | Timestamp (default now)    |

---

## 📌 Constants

- `transactionPerPage` = 30 — for pagination
- Custom Mongoose types in `constants/types.js`:
  - `STR_REQ`, `UNIQUE_STR_REQ`, `NUM_REQ`, `INDEXED` — for simplifying schema definitions

---

## 🔐 Authentication

- Tokens are generated using UUID + SHA256 hash of the username
- Stored in Redis with a 5-day expiry
- Token format: `Bearer <token>` in the `Authorization` header
- All protected routes require a valid token

---

## 🧪 API Endpoints

### 🧾 Auth (`/`)

#### `POST /login`

- **Body:** `{ username, password }`
- **Returns:** `{ userToken }`
- **Errors:** `401` for wrong credentials

#### `POST /signup`

- **Body:** `{ username, password }`
- **Returns:** `{ userToken }`
- **Errors:** `409` if username exists

#### `GET /logout`

- **Headers:** `Authorization: Bearer <token>`
- **Returns:** Success message

---

### 💸 Transactions (`/transaction`)

> Requires Auth

#### `GET /transaction`

- **Query:** `page` (default = 1)
- **Returns:** `{ transactions, nextPage }`

#### `POST /transaction`

- **Body:** `{ value, message, type (optional: INCOME/EXPENSE) }`
- **Returns:** `{ transaction, newBalance }`

#### `DELETE /transaction`

- **Body:** `{ ids: [id1, id2, ...] }`
- **Returns:** `{ newBalance }`

#### `DELETE /transaction/:id`

- **Returns:** Success or forbidden if not owned

---

### 👤 Account (`/account`)

> Requires Auth

#### `GET /account`

- **Returns:** `{ user: { username, currentBalance } }`

#### `DELETE /account`

- **Deletes:** Account + transactions
- **Returns:** Success

---

### 🛡️ Admin (`/admin`)

> Requires `username === "admin"`

#### `GET /admin/user?username=xyz`

- **Returns:** User details

#### `DELETE /admin/user?username=xyz`

- **Returns:** `204 No Content` on success

---

## 🧰 Utilities

### Enhanced Response Methods

- `res.ok()`, `res.failure()`, `res.unauth()`, `res.created()`, `res.deleted()`, `res.conflict()`, `res.forbidden()`, `res.serverError()`

### `ReqBody` wrapper

- Simplifies request parsing and validation for `req.body`, `req.params`, `req.query`

---

## ✅ Setup

1. Create `.env` file:

```
host=localhost
port=8000
mongo_uri=mongodb://localhost:27017/yourdbname
redis_uri=redis://localhost:6379
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
node app.js
```

---

## ✍️ Final Notes

- Passwords are stored in plain text! For production, hash using `bcrypt`.
- Use Postman/Insomnia for testing APIs.
- Transactions are MongoDB transactional to ensure balance consistency.
- Auth is stateless via Redis + token.

---

Happy tracking! 💰
