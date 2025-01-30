import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LogIn";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TaskDetail from "./pages/TaskDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tareas/:tareaId" element={<TaskDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
