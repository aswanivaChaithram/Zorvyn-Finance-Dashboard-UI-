import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Components/Login';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import UserDashboard from './Pages/Dashboard/UserDashboard';
import AdminDashboard from './Pages/Dashboard/AdminDashboard';

const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (user) {
      setIsAuthenticated(true);

      if (user.role === "Admin") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/user-dashboard", { replace: true });
      }
    }
  }, []);

  const registerUser = ({ username, email, password }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.email === email);
    if (exists) {
      alert("User already exists!");
      return false;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login.");
    return true;
  };

  const loginUser = ({ email, password, role, username }) => {

    // Admin login
    if (role === "Admin") {

      if (username === "Admin" && password === "admin@1234") {

        localStorage.setItem("currentUser", JSON.stringify({ role: "Admin" }));
        setIsAuthenticated(true);
        setShowLogin(false);
        navigate("/admin-dashboard", { replace: true });
        return true;
      } else {
        alert("Invalid username or password");
        return false;
      }
    }

    // User login
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid email or password");
      return false;
    }

    localStorage.setItem("currentUser", JSON.stringify({ ...user, role: "User" }));
    setIsAuthenticated(true);
    setShowLogin(false);
    navigate("/user-dashboard", { replace: true });
    return true;
  };

  const logoutUser = () => {
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    navigate("/", { replace: true });
  };

  return (
    <div>
      {showLogin && <Login setShowLogin={setShowLogin} registerUser={registerUser}
          loginUser={loginUser} />}

      <Navbar setShowLogin={setShowLogin} isAuthenticated={isAuthenticated}
        logoutUser={logoutUser} />

      <Routes>
        <Route path='/' element={ isAuthenticated ? (
            <Navigate
              to={currentUser?.role === "Admin" ? "/admin-dashboard" : "/user-dashboard"}
              replace /> ) : ( <Home /> ) }/>

        <Route path='/user-dashboard' element={ 
            isAuthenticated && currentUser?.role === "User" ? ( <UserDashboard /> ) 
            : <Navigate to="/" />} />

        <Route path='/admin-dashboard' element={
            isAuthenticated && currentUser?.role === "Admin" ? ( <AdminDashboard /> ) 
            : <Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App