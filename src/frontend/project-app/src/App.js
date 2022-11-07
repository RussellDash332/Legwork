import './App.css';
import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

/* Pages */
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import Home from './pages/HomePage/Home';
import Configuration from './pages/ConfigPage/Configuration';

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    const htmlElement = document.querySelector('html')
    htmlElement.setAttribute("data-theme", savedTheme);

    console.log("saved theme in local storage: ", savedTheme);
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }/>
        <Route path="/configuration" element={
          <ProtectedRoute>
            <Configuration />
          </ProtectedRoute>
        }/>
      </Routes>
    </Router>
    
  );
}

export default App;
