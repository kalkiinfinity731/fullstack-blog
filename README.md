# Fullstack Blog

A full-stack blog application built with React, Vite, and Express. Features user authentication with JWT, RESTful API for posts management, SQLite database, and Tailwind CSS styling.

## Features

- **User Authentication**: Register, login, and session management with JWT tokens
- **Blog Posts**: Create, read, update, and delete posts
- **Responsive Design**: Tailwind CSS for modern styling
- **RESTful API**: Express backend with SQLite database

## Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend
- Express.js
- SQLite (better-sqlite3)
- JWT Authentication
- bcryptjs (password hashing)

## Installation

### Prerequisites
- Node.js 18+
- npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/fullstack-blog.git
cd fullstack-blog
```

2. Install dependencies:
```bash
npm install
npm install --prefix frontend
npm install --prefix backend
```

4. Create `.env` file in the backend directory:
```env
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## Development

Run both frontend and backend concurrently:
```bash
npm run start
```

Or run separately:
```bash
# Terminal 1 - Frontend
npm run frontend

# Terminal 2 - Backend
npm run backend
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

## Build

Build the frontend for production:
```bash
npm run build --prefix frontend
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (authenticated)
- `PUT /api/posts/:id` - Update post (authenticated)
- `DELETE /api/posts/:id` - Delete post (authenticated)

## Project Structure

```
fullstack-blog/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── lib/        # API utilities
│   │   └── App.jsx
│   └── vite.config.js
├── backend/            # Express backend
│   ├── routes/         # API routes
│   ├── db.js           # Database setup
│   └── server.js
└── package.json
```

## License

ISC