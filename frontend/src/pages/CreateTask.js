// 📌 src/pages/CreateTask.js
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api";
import TaskForm from "../components/TaskForm";
import "../styles/CreateTask.css";

const CreateTask = () => {
    const [error, setError] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");
    const navigate = useNavigate();

    const handleCreateTask = async (taskData) => {
        setError("");
        setMensajeExito("");

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Error: Usuario no autenticado.");
            return;
        }

        try {
            const userResponse = await api.get("/usuarios/me", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const usuarioId = userResponse.data.id;
            const formattedData = {
                ...taskData,
                usuario_id: usuarioId,
                categoria_id: taskData.categoria_id ? parseInt(taskData.categoria_id) : null
            };

            console.log("Datos enviados al backend:", formattedData);

            const response = await api.post("/tareas", formattedData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 201) {
                setMensajeExito("Tarea creada exitosamente.");
                setTimeout(() => navigate("/dashboard"), 1000);
            }
        } catch (err) {
            setError(err.response?.data?.mensaje || "Hubo un error al crear la tarea.");
        }
    };

    return (
        <div className="task-creator-page">
            <Container className="task-creator-container">
                <h2 className="task-creator-title">Crear Nueva Tarea</h2>
                <TaskForm onSubmit={handleCreateTask} error={error} mensajeExito={mensajeExito} />
            </Container>
        </div>
    );
};

export default CreateTask;
