import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import api from "../api";
import "../styles/DeleteCategory.css";

const DeleteCategoryForm = ({ onDelete, error, mensajeExito }) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaId, setCategoriaId] = useState("");

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/categorias", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCategorias(response.data);
            } catch (error) {
                console.error("Error al obtener categorías", error);
            }
        };

        fetchCategorias();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (categoriaId) {
            onDelete(categoriaId);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="delete-category-form">
            <h2 className="delete-category-title">Eliminar Categoría</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {mensajeExito && <Alert variant="success">{mensajeExito}</Alert>}

            <Form.Group>
                <Form.Label className="delete-category-label">Selecciona una categoría</Form.Label>
                <Form.Control
                    as="select"
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                    required
                    className="delete-category-select"
                >
                    <option value="">Seleccionar...</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <div className="delete-category-buttons mt-4">
                <Button type="submit" className="delete-category-button">Eliminar</Button>
                <Button variant="secondary" className="delete-category-cancel" onClick={() => window.history.back()}>
                    Cancelar
                </Button>
            </div>
        </Form>
    );
};

export default DeleteCategoryForm;
