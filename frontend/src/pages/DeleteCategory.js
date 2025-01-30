import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api";
import DeleteCategoryForm from "../components/DeleteCategoryForm";
import "../styles/DeleteCategory.css";

const DeleteCategory = () => {
    const [error, setError] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");
    const navigate = useNavigate();

    const handleDeleteCategory = async (categoriaId) => {
        setError("");
        setMensajeExito("");

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Error: Usuario no autenticado.");
            return;
        }

        try {
            await api.delete(`/categorias/${categoriaId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMensajeExito("Categoría eliminada exitosamente.");
            setTimeout(() => navigate("/dashboard"), 1500);
        } catch (err) {
            setError(err.response?.data?.mensaje || "Hubo un error al eliminar la categoría.");
        }
    };

    return (
        <div className="delete-category-page">
            <Container className="delete-category-container">
                <DeleteCategoryForm onDelete={handleDeleteCategory} error={error} mensajeExito={mensajeExito} />
            </Container>
        </div>
    );
};

export default DeleteCategory;
