import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Dashboard.css";
import defaultUserImage from "../assets/default_user.png";

const Dashboard = () => {
    const [tareas, setTareas] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/");
                return;
            }

            try {
                const userResponse = await api.get("/usuarios/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUsuario(userResponse.data);

                const tareasResponse = await api.get(`/usuarios/${userResponse.data.id}/tareas`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setTareas(tareasResponse.data);
            } catch (error) {
                console.error("Error al obtener datos", error);
            }
        };

        fetchData();
    }, [navigate]);

    const getEstadoColor = (estado) => {
        switch (estado) {
            case "Sin Empezar":
                return "🔴";
            case "En Proceso":
                return "🟠";
            case "Completado":
                return "🟢";
            default:
                return "⚪";
        }
    };

    return (
        <div className="dashboard-page">
            <Container className="dashboard-container">
                <Row className="dashboard-row">
                    <Col md={3} className="sidebar">
                        <h5 className="section-title">Tareas:</h5>
                        <Button variant="primary" className="btn-task" onClick={() => navigate("/crear-tarea")}>
                            Crear Tarea
                        </Button>

                        <h5 className="section-title">Categoría:</h5>
                        <Button variant="success" className="btn-category" onClick={() => navigate("/crear-categoria")}>
                            Crear Categoría
                        </Button>
                        <Button variant="danger" className="btn-category" onClick={() => navigate("/borrar-categoria")}>
                            Borrar Categoría
                        </Button>
                        <hr />

                        <div className="user-info">
                            <img
                                src={usuario?.imagen_perfil || defaultUserImage}
                                alt="Usuario"
                                className="user-avatar"
                            />
                            <p className="user-name">{usuario?.nombre_usuario || "Usuario"}</p>
                        </div>
                    </Col>

                    <Col md={9} className="task-list">
                        <h2 className="title">Tareas</h2>
                        <div className="task-table-container">
                            <Table striped bordered hover variant="dark" className="task-table">
                                <thead>
                                    <tr>
                                        <th>Tarea</th>
                                        <th>Fecha Tentativa</th>
                                        <th>Categoría</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tareas.length > 0 ? (
                                        tareas.map((tarea) => (
                                            <tr key={tarea.id} onClick={() => navigate(`/tareas/${tarea.id}`)} className="task-row">
                                                <td>{tarea.texto_area}</td>
                                                <td>{new Date(tarea.fecha_tentativa_finalizacion).toLocaleDateString()}</td>
                                                <td>{tarea.categoria || "Null"}</td>
                                                <td className="estado-col">{getEstadoColor(tarea.estado)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center text-white">No tienes tareas aún.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
