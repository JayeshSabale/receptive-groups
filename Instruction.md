# 📝 Feedback Management App

This is a simple full-stack (MERN) application where employees can submit feedback and admins can manage, review, and filter feedback entries.

---

## 🔧 How to Run the App

### 📦 Backend Setup

1. **Navigate to backend folder:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the `backend` directory:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Start the server:**

   ```bash
   node server.js
   ```

   The backend will run at: `http://localhost:5000`

---

### 💻 Frontend Setup

1. **Navigate to frontend folder:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the frontend app:**

   ```bash
   npm run dev
   ```

   The frontend will run at: `http://localhost:5173`

---

## 📱 API Structure

Base URL: `http://localhost:5000/api/feedback`

| Method | Endpoint                 | Description                          |
| ------ | ------------------------ | ------------------------------------ |
| GET    | `/`                      | Get all feedback entries             |
| POST   | `/`                      | Submit a new feedback                |
| GET    | `/filter?category=value` | Get feedback by category             |
| PUT    | `/:id/reviewed`          | Mark feedback as reviewed/unreviewed |
| DELETE | `/:id`                   | Delete a feedback entry              |

---

## 💡 Assumptions Made

- No authentication implemented (admin is assumed from route access).
- Frontend and backend run on different local ports (`5173` and `5000`).
- Reviewed feedback is toggled using a boolean field `reviewed`.
- All new feedback is created with `reviewed: false`.

---

## ✅ What is Complete

- Employee feedback submission form.
- Admin dashboard:

  - View all feedback
  - Filter by category
  - Mark feedback as reviewed/unreviewed
  - Delete feedback

- REST API routes are functional and connected to MongoDB.

---

## 🚧 What’s Not Complete

- No login/signup or role-based authentication.
- No user sessions or token handling.
- UI does not include toast alerts or notifications.
- Styling and mobile responsiveness are minimal.

---

## ✨ Future Enhancements

- Add authentication for admin and employees
- Include user roles and secure endpoints
- Enhance UI/UX with alert messages
- Improve responsiveness and mobile design
