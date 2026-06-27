Intern Details 
Intern ID: CITS3867 
Name: Nandhini A 
No. of Weeks: 4 Weeks 
Project Name: Full-Stack Blog with Auth
Project Scope:  Fullstack Blog

# Aspect	Details
Purpose:	Create, manage, and share blog posts with user authentication
Target Users:	Bloggers, content creators, developers learning full-stack development
Frontend:	React SPA with Vite, Tailwind CSS, React Router
Backend:	Express API with SQLite, JWT auth, RESTful endpoints

Core Features:	User registration/login, CRUD posts, dashboard, profile
Planned Integrations	GitHub Pages (frontend), Render/Railway (backend), Cloud database

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



<img width="1887" height="955" alt="Image" src="https://github.com/user-attachments/assets/aea0248c-7084-4cf5-902c-3b1c068cd697" />

<img width="1912" height="966" alt="Image" src="https://github.com/user-attachments/assets/55ccd345-7c2d-4ed9-87b4-a9b500186e5c" />

<img width="1902" height="967" alt="Image" src="https://github.com/user-attachments/assets/91c3f8f2-df4b-49bb-ac65-d685682f4eee" />

<img width="1911" height="962" alt="Image" src="https://github.com/user-attachments/assets/01a76b38-689a-41c8-aafd-d20be5bbb65e" />

<img width="1912" height="971" alt="Image" src="https://github.com/user-attachments/assets/1271d6e4-b002-4642-9200-3c9e52a30c7f" />

