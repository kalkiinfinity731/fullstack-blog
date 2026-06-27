import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const db = new Database("blog.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id)
  )
`);

export const findUserByEmail = (email) => {
  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  return stmt.get(email);
};

export const createUser = (username, email, password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const stmt = db.prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
  const result = stmt.run(username, email, hashedPassword);
  return { id: result.lastInsertRowid, username, email };
};

export const findPostById = (id) => {
  const stmt = db.prepare("SELECT * FROM posts WHERE id = ?");
  return stmt.get(id);
};

export const createPost = (title, content, authorId) => {
  const stmt = db.prepare("INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)");
  const result = stmt.run(title, content, authorId);
  return { id: result.lastInsertRowid, title, content, author_id: authorId };
};

export const updatePost = (id, title, content) => {
  const stmt = db.prepare("UPDATE posts SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
  stmt.run(title, content, id);
  return findPostById(id);
};

export const deletePost = (id) => {
  const stmt = db.prepare("DELETE FROM posts WHERE id = ?");
  stmt.run(id);
};

export const getAllPosts = () => {
  const stmt = db.prepare(`
    SELECT posts.*, users.username as author_name, users.email as author_email
    FROM posts
    JOIN users ON posts.author_id = users.id
    ORDER BY posts.created_at DESC
  `);
  return stmt.all();
};

export const getPostById = (id) => {
  const stmt = db.prepare(`
    SELECT posts.*, users.username as author_name, users.email as author_email
    FROM posts
    JOIN users ON posts.author_id = users.id
    WHERE posts.id = ?
  `);
  return stmt.get(id);
};

export const getPostsByAuthor = (authorId) => {
  const stmt = db.prepare(`
    SELECT posts.*, users.username as author_name, users.email as author_email
    FROM posts
    JOIN users ON posts.author_id = users.id
    WHERE posts.author_id = ?
    ORDER BY posts.created_at DESC
  `);
  return stmt.all(authorId);
};

export const verifyPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export default db;
