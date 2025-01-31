import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import api from "../api";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const [imagenPerfil, setImagenPerfil] = useState("");

    const [errorGeneral, setErrorGeneral] = useState("");
    const [errorUsuario, setErrorUsuario] = useState("");
    const [errorContrasenia, setErrorContrasenia] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorGeneral("");
        setErrorUsuario("");
        setErrorContrasenia("");

        let hasError = false;

        if (nombreUsuario.trim() === "") {
            setErrorUsuario("El nombre de usuario no puede estar vacío.");
            hasError = true;
        }

        if (contrasenia.trim() === "") {
            setErrorContrasenia("La contraseña no puede estar vacía.");
            hasError = true;
        }

        if (hasError) return;

        try {
            const response = await api.post("/usuarios", {
                nombre_usuario: nombreUsuario,
                contrasenia,
                imagen_perfil: imagenPerfil,
            });

            if (response.status === 201) {
                alert("Usuario registrado exitosamente!");
                navigate("/");
            }
        } catch (error) {
            if (error.response) {
                const mensaje = error.response.data.mensaje;

                if (mensaje.includes("El usuario ya existe")) {
                    setErrorGeneral("El usuario ya existe.");
                } else if (mensaje.includes("Faltan datos obligatorios")) {
                    setErrorGeneral("Todos los campos son obligatorios.");
                }
            } else {
                setErrorGeneral("Error en el servidor. Inténtalo más tarde.");
            }
        }
    };

    return (
        <Container className="login-container">
            <Row className="justify-content-center align-items-center vh-100">
                <Col md={4} className="login-box">
                    <h3 className="text-light text-center">Registro</h3>

                    {errorGeneral && <p className="text-danger text-center">{errorGeneral}</p>}

                    <Form onSubmit={handleRegister}>
                        <Form.Group>
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese su usuario"
                                value={nombreUsuario}
                                onChange={(e) => setNombreUsuario(e.target.value)}
                                isInvalid={!!errorUsuario}
                            />
                            <Form.Control.Feedback type="invalid">{errorUsuario}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ingrese su contraseña"
                                value={contrasenia}
                                onChange={(e) => setContrasenia(e.target.value)}
                                isInvalid={!!errorContrasenia}
                            />
                            <Form.Control.Feedback type="invalid">{errorContrasenia}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Imagen de Perfil (URL)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la URL de su imagen de perfil"
                                value={imagenPerfil}
                                onChange={(e) => setImagenPerfil(e.target.value)}
                            />
                        </Form.Group>

                        <div className="d-grid gap-2 mt-4">
                            <Button variant="success" size="lg" type="submit">Registrarse</Button>
                            <Button variant="outline-light" size="lg" onClick={() => navigate("/")}>Volver a Login</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterForm;
