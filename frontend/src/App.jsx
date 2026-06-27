import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import ViewPost from "./pages/ViewPost";
import EditPost from "./pages/EditPost";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-purpleBg text-purpleText">
        <nav className="flex justify-between items-center p-4 bg-purpleDark">
          <Link to="/" className="text-xl font-bold text-purpleAccent">Full-Stack Blog</Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-purpleAccent">Home</Link>
            {user && (
              <>
                <Link to="/profile" className="hover:text-purpleAccent">Profile</Link>
                <Link to="/create" className="hover:text-purpleAccent">Create Post</Link>
              </>
            )}
            {user ? (
              <button onClick={handleLogout} className="hover:text-purpleAccent">Logout</button>
            ) : (
              <>
                <Link to="/login" className="hover:text-purpleAccent">Login</Link>
                <Link to="/register" className="hover:text-purpleAccent">Register</Link>
              </>
            )}
          </div>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
            <Route path="/post/:id" element={<ViewPost />} />
            <Route path="/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
