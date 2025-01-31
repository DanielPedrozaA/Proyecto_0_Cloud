import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api";

const LoginForm = () => {
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const [errorUsuario, setErrorUsuario] = useState("");
    const [errorContrasenia, setErrorContrasenia] = useState("");
    const [errorGeneral, setErrorGeneral] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorUsuario("");
        setErrorContrasenia("");
        setErrorGeneral("");

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
            const response = await api.post("/usuarios/iniciar-sesion", {
                nombre_usuario: nombreUsuario,
                contrasenia
            });

            if (response.status === 200) {
                localStorage.setItem("token", response.data.access_token);
                localStorage.setItem("user_id", response.data.user_id);

                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response) {
                const mensaje = error.response.data.mensaje;

                if (mensaje.includes("Credenciales inválidas")) {
                    setErrorGeneral("Usuario o contraseña incorrectos.");
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
                    <h3 className="text-light text-center">Iniciar Sesión</h3>

                    {errorGeneral && <p className="text-danger text-center">{errorGeneral}</p>}

                    <Form onSubmit={handleLogin}>
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

                        <div className="d-grid gap-2 mt-4">
                            <Button variant="success" size="lg" type="submit">Iniciar Sesión</Button>
                            <Button variant="outline-light" size="lg" onClick={() => navigate("/registro")}>Crear Cuenta</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
