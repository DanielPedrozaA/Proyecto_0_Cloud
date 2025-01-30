import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import api from "../api";
import "../styles/TaskDetail.css";

const TaskDetailForm = ({ taskId, onUpdate, error, mensajeExito }) => {
    const [textoArea, setTextoArea] = useState("");
    const [fechaFinalizacion, setFechaFinalizacion] = useState("");
    const [estado, setEstado] = useState("Sin Empezar");
    const [categoriaId, setCategoriaId] = useState("");
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                // Obtener detalles de la tarea
                const tareaResponse = await api.get(`/tareas/${taskId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const tarea = tareaResponse.data;
                setTextoArea(tarea.texto_area);
                setFechaFinalizacion(tarea.fecha_tentativa_finalizacion.split("T")[0]);
                setEstado(tarea.estado);
                setCategoriaId(tarea.categoria_id || "");

                // Obtener categorías
                const categoriasResponse = await api.get("/categorias", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCategorias(categoriasResponse.data);
            } catch (error) {
                console.error("Error al cargar los datos", error);
            }
        };

        fetchData();
    }, [taskId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ texto_area: textoArea, fecha_tentativa_finalizacion: fechaFinalizacion, estado, categoria_id: categoriaId });
    };

    return (
        <Form onSubmit={handleSubmit} className="task-detail-form">
            <h2 className="task-detail-title">Actualizar Tarea</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {mensajeExito && <Alert variant="success">{mensajeExito}</Alert>}

            {/* Descripción */}
            <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    type="text"
                    value={textoArea}
                    onChange={(e) => setTextoArea(e.target.value)}
                    required
                />
            </Form.Group>

            {/* Fecha Tentativa */}
            <Form.Group className="mt-3">
                <Form.Label>Fecha Tentativa de Finalización</Form.Label>
                <Form.Control
                    type="date"
                    value={fechaFinalizacion}
                    onChange={(e) => setFechaFinalizacion(e.target.value)}
                    required
                />
            </Form.Group>

            {/* Estado */}
            <Form.Group className="mt-3">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                    as="select"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                >
                    <option value="Sin Empezar">Sin Empezar</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Completado">Completado</option>
                </Form.Control>
            </Form.Group>

            {/* Categoría */}
            <Form.Group className="mt-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                    as="select"
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                >
                    <option value="">Seleccionar categoría</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            {/* Botones */}
            <div className="task-detail-buttons mt-4">
                <Button type="submit" className="task-detail-save">Guardar Cambios</Button>
                <Button variant="secondary" className="task-detail-cancel" onClick={() => window.history.back()}>Cancelar</Button>
            </div>
        </Form>
    );
};

export default TaskDetailForm;
