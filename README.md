# Task Manager

A full-stack task management app with user authentication, task filtering, and category/priority organization. Built with React on the frontend and Express + MongoDB on the backend.
### https://task-manager-ps0e.onrender.com

## Features

- 🔐 User registration and login with JWT-based authentication
- ✅ Create, update, complete, and delete tasks
- 🎯 Set task priority (low / medium / high / no priority), category, and due date
- 🔍 Search tasks and filter by priority, category, or status (pending/completed)
- 📱 Responsive dashboard with collapsible sidebar

## Tech Stack

**Frontend**
- React 19 + Vite
- React Router
- Axios

**Backend**
- Node.js + Express 5
- MongoDB with Mongoose
- JWT (jsonwebtoken) for auth
- bcrypt for password hashing

## Project Structure

```
Task-Manager/
├── client/               # React frontend
│   └── src/
│       ├── api/          # Axios instance with auth interceptor
│       ├── components/   # Header, Sidebar, TaskCard, TaskModal
│       ├── pages/        # Login, Register, Dashboard
│       └── styles/
└── server/                # Express backend
    ├── middleware/        # JWT auth middleware
    ├── models/             # User and Task Mongoose schemas
    └── server.js           # App entry point & routes
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repo
```bash
git clone https://github.com/Humanshi-Kotia/Task-Manager.git
cd Task-Manager
```

### 2. Set up the backend
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the server:
```bash
node server.js
```

### 3. Set up the frontend
```bash
cd ../client
npm install
```

Create a `.env` file in `client/`:
```env
VITE_API_URL=http://localhost:5000
```

Run the client:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port), talking to the backend at the URL set in `VITE_API_URL`.

## API Endpoints

| Method | Endpoint      | Description                  | Auth Required |
|--------|--------------|-------------------------------|----------------|
| POST   | `/register`  | Register a new user           | No             |
| POST   | `/login`     | Log in and receive a JWT      | No             |
| GET    | `/tasks`     | Get all tasks for the user    | Yes            |
| POST   | `/tasks`     | Create a new task             | Yes            |
| PUT    | `/tasks/:id` | Update a task                 | Yes            |
| DELETE | `/tasks/:id` | Delete a task                 | Yes            |

Authenticated requests must include an `Authorization: Bearer <token>` header.

## License

This project currently has no license specified.
