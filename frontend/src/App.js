import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LogIn";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import CreateCategory from "./pages/CreateCategory";
import DeleteCategory from "./pages/DeleteCategory";
import TaskDetail from "./pages/TaskDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crear-tarea" element={<CreateTask />} />
        <Route path="/crear-categoria" element={<CreateCategory />} />
        <Route path="/borrar-categoria" element={<DeleteCategory />} />
        <Route path="/tareas/:id" element={<TaskDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
