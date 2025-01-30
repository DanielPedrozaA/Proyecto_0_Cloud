import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Dashboard.css";

const TaskDetail = () => {
    const { tareaId } = useParams();
    const [tarea, setTarea] = useState(null);
    const [texto, setTexto] = useState("");
    const [estado, setEstado] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTarea = async () => {
            try {
                const response = await api.get(`/tareas/detalle/${tareaId}`);
                setTarea(response.data);
                setTexto(response.data.texto_area);
                setEstado(response.data.estado);
            } catch (error) {
                console.error("Error al obtener tarea", error);
            }
        };
        fetchTarea();
    }, [tareaId]);

    const handleUpdate = async () => {
        try {
            await api.put(`/tareas/${tareaId}`, { texto_area: texto, estado });
            alert("Tarea actualizada");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error al actualizar tarea", error);
        }
    };

    if (!tarea) return <p>Cargando...</p>;

    return (
        <Container className="task-detail-container">
            <h2>Detalle de la Tarea</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" value={texto} onChange={(e) => setTexto(e.target.value)} />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select value={estado} onChange={(e) => setEstado(e.target.value)}>
                        <option value="Sin Empezar">Sin Empezar</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Completado">Completado</option>
                    </Form.Select>
                </Form.Group>

                <Button className="mt-4" variant="primary" onClick={handleUpdate}>Guardar Cambios</Button>
            </Form>
        </Container>
    );
};

export default TaskDetail;
