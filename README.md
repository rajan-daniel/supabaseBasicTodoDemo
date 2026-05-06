# Supabase Basic Todo Demo

A simple Todo application built with **Next.js** and **Supabase** to demonstrate the most basic form of CRUD (Create, Read, Update, Delete) operations using a backend-as-a-service.

This project uses an **unrestricted Supabase database** for learning purposes only and is not intended for production use.

---

## 🚀 Tech Stack

- Next.js (App Router)
- React Hooks (useState, useEffect)
- Supabase (Database + API)
- TypeScript

---

## 📌 Features

- Create new todo items
- Read and display todos from Supabase
- Update todo completion status
- Delete todo items
- Real-time UI updates (client state sync)

---

## 🧠 What I Learned

This project was built to understand:

- How Supabase handles database operations via client SDK
- Basic CRUD patterns in a frontend application
- State management with React hooks
- Syncing UI with backend changes
- Handling async API calls in React
- Real SQL querying concepts, through JavaScript interface.
---

## 🗄️ Database Structure

Table: `TodoList`

| Column        | Type    |
|--------------|---------|
| id           | number (auto-generated) |
| name         | text    |
| isCompleted  | boolean |

---
