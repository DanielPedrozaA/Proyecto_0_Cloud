// 📌 src/components/TaskForm.js
import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import api from "../api";
import "../styles/CreateTask.css";

const TaskForm = ({ onSubmit, error, mensajeExito }) => {
    const [textoArea, setTextoArea] = useState("");
    const [fechaFinalizacion, setFechaFinalizacion] = useState("");
    const [categoriaId, setCategoriaId] = useState(null);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await api.get("/categorias");
                setCategorias(response.data);
            } catch (error) {
                console.error("Error al obtener categorías", error);
            }
        };
        fetchCategorias();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!textoArea.trim()) {
            alert("La tarea debe tener una descripción.");
            return;
        }
        onSubmit({
            texto_area: textoArea,
            fecha_tentativa_finalizacion: fechaFinalizacion,
            categoria_id: categoriaId || null
        });
    };

    return (
        <Form onSubmit={handleSubmit} className="task-form">
            {error && <Alert variant="danger">{error}</Alert>}
            {mensajeExito && <Alert variant="success">{mensajeExito}</Alert>}

            {/* Descripción de la tarea */}
            <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ej. Terminar reporte"
                    value={textoArea}
                    onChange={(e) => setTextoArea(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mt-3">
                <Form.Label>Fecha Tentativa de Finalización</Form.Label>
                <Form.Control
                    type="date"
                    value={fechaFinalizacion}
                    onChange={(e) => setFechaFinalizacion(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mt-3">
                <Form.Label className="text-light">Categoría</Form.Label>
                <Form.Control
                    as="select"
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value === "" ? null : e.target.value)}
                >
                    <option value="">Seleccionar categoría</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <div className="task-buttons">
                <Button variant="success" type="submit">Guardar</Button>
                <Button variant="danger" className="ml-2" onClick={() => window.history.back()}>Cancelar</Button>
            </div>
        </Form>
    );
};

export default TaskForm;
