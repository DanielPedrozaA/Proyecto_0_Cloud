import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api";
import CategoryForm from "../components/CategoryForm";
import "../styles/CreateCategory.css";

const CreateCategory = () => {
    const [error, setError] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");
    const navigate = useNavigate();

    const handleCreateCategory = async (categoryData) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Error: Usuario no autenticado.");
            return;
        }

        try {
            await api.post("/categorias", categoryData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMensajeExito("Categoría creada exitosamente.");
            setTimeout(() => navigate("/dashboard"), 1500);
        } catch (err) {
            setError(err.response?.data?.mensaje || "Hubo un error al crear la categoría.");
        }
    };

    return (
        <div className="category-creator-page">
            <Container className="category-creator-container">
                <CategoryForm onSubmit={handleCreateCategory} error={error} mensajeExito={mensajeExito} />
            </Container>
        </div>
    );
};

export default CreateCategory;
