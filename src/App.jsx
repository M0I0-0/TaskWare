import React from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/Navbar';
import Login from './pages/Login';
import './App.css';
import SignUp from './pages/SignUp';
import CalendarView from './components/CalendarView';
import DashBoard from './pages/DashBoard';
import ProtectedRoute from './components/ProtectedRoute'; 
import About from './pages/About';

function Home() {
  return (
    <section className="banner">
      <div className="content">
        <h1 className="left">TaskWare</h1>
        <div className="right">
          <h2>By MOI</h2>
          <div className="text">
            <p>Tu productividad, más simple que nunca.</p>
            <p>Convierte tus ideas en tareas y tus tareas en logros
              <br />Planifica, organiza y logra más.</p>
          </div>
        </div>
        <div className="image">
          <img src="ilu.png" alt="Ilustracion para presentar la pagina" />
        </div>
      </div>
    </section>
  );
}

function Layout({ children }) {
  const location = useLocation();
  const path = location.pathname;
  const hideNavbar =
    path === "/login" ||
    path === "/signup" ||
    path ==="/Dashboard" ||
    path === "/calendar";
  return (
    <>
      {!hideNavbar && <NavBar />}
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/calendar" 
            element={
              <ProtectedRoute>
                <CalendarView />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;