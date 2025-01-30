import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Form, Alert } from "react-bootstrap";
import api from "../api";
import "../styles/TaskDetail.css";

const TaskDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tarea, setTarea] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");
    const [formData, setFormData] = useState({
        texto_area: "",
        fecha_tentativa_finalizacion: "",
        categoria_id: "",
        estado: ""
    });

    useEffect(() => {
        const fetchTarea = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/");
                    return;
                }

                const response = await api.get(`/tareas/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setTarea(response.data);
                setFormData({
                    texto_area: response.data.texto_area,
                    fecha_tentativa_finalizacion: response.data.fecha_tentativa_finalizacion.split("T")[0],
                    categoria_id: response.data.categoria_id || "",
                    estado: response.data.estado
                });

                // Obtener categorías para el dropdown
                const categoriasResponse = await api.get("/categorias", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCategorias(categoriasResponse.data);
            } catch (err) {
                setError("Error al cargar la tarea.");
                console.error(err);
            }
        };

        fetchTarea();
    }, [id, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError("");
        setMensajeExito("");

        try {
            const token = localStorage.getItem("token");
            await api.put(`/tareas/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMensajeExito("Tarea actualizada exitosamente.");
            setTimeout(() => navigate("/dashboard"), 1500);
        } catch (err) {
            setError("Error al actualizar la tarea.");
            console.error(err);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) return;

        try {
            const token = localStorage.getItem("token");
            await api.delete(`/tareas/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMensajeExito("Tarea eliminada exitosamente.");
            setTimeout(() => navigate("/dashboard"), 1500);
        } catch (err) {
            setError("Error al eliminar la tarea.");
            console.error(err);
        }
    };

    if (error) return <p className="text-danger">{error}</p>;
    if (!tarea) return <p className="text-white">Cargando tarea...</p>;

    return (
        <div className="task-detail-page">
            <Container className="task-detail-container">
                <h2 className="task-detail-title">Detalle de la Tarea</h2>

                {mensajeExito && <Alert variant="success">{mensajeExito}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleUpdate}>
                    <Form.Group>
                        <Form.Label className="task-detail-label">Descripción</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.texto_area}
                            onChange={(e) => setFormData({ ...formData, texto_area: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label className="task-detail-label">Fecha de Creación</Form.Label>
                        <Form.Control type="text" value={new Date(tarea.fecha_creacion).toLocaleDateString()} disabled />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label className="task-detail-label">Fecha Tentativa de Finalización</Form.Label>
                        <Form.Control
                            type="date"
                            value={formData.fecha_tentativa_finalizacion}
                            onChange={(e) => setFormData({ ...formData, fecha_tentativa_finalizacion: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label className="task-detail-label">Estado</Form.Label>
                        <Form.Select
                            value={formData.estado}
                            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                        >
                            <option value="Sin Empezar">Sin Empezar</option>
                            <option value="En Proceso">En Proceso</option>
                            <option value="Completado">Completado</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label className="task-detail-label">Categoría</Form.Label>
                        <Form.Select
                            value={formData.categoria_id}
                            onChange={(e) => setFormData({ ...formData, categoria_id: e.target.value })}
                        >
                            <option value="">Sin categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <div className="task-detail-buttons">
                        <Button variant="success" type="submit" className="mt-4">
                            Guardar Cambios
                        </Button>
                        <Button variant="danger" className="mt-4 ms-3" onClick={handleDelete}>
                            Eliminar
                        </Button>
                        <Button variant="secondary" className="mt-4 ms-3" onClick={() => navigate("/dashboard")}>
                            Volver
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
};

export default TaskDetail;
