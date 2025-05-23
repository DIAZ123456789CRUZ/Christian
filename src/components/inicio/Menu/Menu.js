import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Menu() { 
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand  >Kit-Clic</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/Home">Home</Nav.Link>
          <Nav.Link as={Link} to="/producto">Productos</Nav.Link>
          <Nav.Link as={Link} to="/formproductos">Gestión de productos</Nav.Link>
        </Nav>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Inicio de sesion</Nav.Link>
          <Nav.Link as={Link} to="/Registro">Registro</Nav.Link>

        </Nav>
      </Container>
    </Navbar>
  );
}