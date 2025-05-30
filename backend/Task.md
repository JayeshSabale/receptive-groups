# Employee Feedback Portal

A Full Stack Employee Feedback Portal where employees can submit anonymous feedback, and an admin can view, filter, and categorize them.

## 🛠️ Tech Stack

- **Frontend:** React.js (with functional components & hooks) , Redux optional
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **API:** RESTful API
- **Styling:** Basic CSS + Bootstrap
- **Version Control:** GitHub

---

## 🚀 Features

### 👤 Employee Side

- Anonymous feedback submission
- Choose feedback category: `Work Environment`, `Leadership`, `Growth`, `Others`
- Submit anonymously (no login required)

### 🛠️ Admin Side

- View feedback in tabular format
- View all submitted feedback in a table with:
  o Feedback text
  o Category
  o Submission time
- Filter feedback by category
- Mark feedback as reviewed
- Delete feedback (optional)

---

## 🔗 API Structure

### Base URL: `/api`

| Method | Endpoint                   | Description                       |
| ------ | -------------------------- | --------------------------------- |
| POST   | `/feedback`                | Submit feedback                   |
| GET    | `/feedback`                | Get all feedback                  |
| GET    | `/feedback?category=xyz`   | Get feedback filtered by category |
| PATCH  | `/feedback/:id/reviewed`   | Mark feedback as reviewed         |
| DELETE | `/feedback/:id` (optional) | Delete feedback                   |

#### Sample Payload for POST `/feedback`

```json
{
  "text": "I feel the leadership could be more transparent.",
  "category": "Leadership",
  "submissionTime": "2025-05-29T12:00:00Z"
}
```
