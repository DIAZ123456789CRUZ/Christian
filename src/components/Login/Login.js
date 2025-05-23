import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { loginUser } from "../../api/usuario";

export function Login() {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(""); setError("");
    const form = e.target;
    const data = {
      email: form.email.value,
      password: form.password.value,
    };
    if (!data.email || !data.password) {
      setError("Todos los campos son obligatorios");
      return;
    }
    try {
      const res = await loginUser(data);
      setMsg("Bienvenido, " + res.data.usuario.nombre);
      localStorage.setItem("token", res.data.token);
      // Aquí puedes redirigir o actualizar el estado global de autenticación
    } catch (err) {
      setError(err.response?.data?.msg || "Error al iniciar sesión");
    }
  };

  return (
    <Card className="mt-5 mx-auto" style={{ maxWidth: "400px" }}>
      <Card.Body>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        {msg && <Alert variant="success">{msg}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control name="email" type="email" placeholder="ejemplo@correo.com" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control name="password" type="password" placeholder="Contraseña" required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Ingresar
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}