import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../styles/CreateCategory.css";

const CategoryForm = ({ onSubmit, error, mensajeExito }) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ nombre, descripcion });
    };

    return (
        <Form onSubmit={handleSubmit} className="category-creator-form">
            <h2 className="category-creator-title">Crear Nueva Categoría</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {mensajeExito && <Alert variant="success">{mensajeExito}</Alert>}

            {/* Nombre de la Categoría */}
            <Form.Group>
                <Form.Label className="category-creator-label">Nombre</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ej: Trabajo, Personal, Estudio..."
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="category-creator-input"
                />
            </Form.Group>

            {/* Descripción */}
            <Form.Group className="mt-3">
                <Form.Label className="category-creator-label">Descripción</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Describe brevemente esta categoría..."
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="category-creator-input"
                />
            </Form.Group>

            {/* Botones */}
            <div className="category-buttons mt-4">
                <Button type="submit" className="category-creator-button">Crear</Button>
                <Button variant="danger" className="category-cancel-button" onClick={() => window.history.back()}>Cancelar</Button>
            </div>
        </Form>
    );
};

export default CategoryForm;
