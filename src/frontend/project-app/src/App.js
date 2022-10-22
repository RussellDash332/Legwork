import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  redirect,
  Navigate
} from "react-router-dom";

/* Pages */
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import Home from './pages/HomePage/Home';
import Configuration from './pages/ConfigPage/Configuration';

function App() {
  return (
    <Router>

      {/* development navigation */}
      {/* <div>
        <nav>
          <ul>
            <li> <Link to="/login">Login</Link> </li>
            <li> <Link to="/register">Register</Link> </li>
            <li> <Link to="/home">Home</Link> </li>
            <li> <Link to="/configuration">Configuration</Link> </li>
          </ul>
        </nav>
      </div> */}

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
