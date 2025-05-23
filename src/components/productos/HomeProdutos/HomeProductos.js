import React, { useState, useEffect } from "react";
import { Row, Col, Button, ButtonGroup, Modal, Table, Badge } from "react-bootstrap";
import { ItemProductos } from "../ItemProductos";
import axios from "axios";
import "./HomeProducto.scss";

export function HomeProductos({ refresh }) {
  const [carrito, setCarrito] = useState([]);
  const [showCarrito, setShowCarrito] = useState(false);
  const [productos, setProductos] = useState([]);

  // Cargar productos del backend y refrescar cuando cambie refresh
  useEffect(() => {
    axios.get("http://localhost:4000/api/lista")
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  }, [refresh]);

  const handleMasInfo = (producto) => {
    console.log("Mostrar precio:", producto.nombre);
  };

  const handleAgregarCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    setShowCarrito(true);
  };

  const handleEliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  const handleComprar = () => {
    alert(`Compra realizada por ${carrito.length} productos!`);
    setCarrito([]);
    setShowCarrito(false);
  };

  return (
    <div className="container">
      {/* Ícono del carrito con badge (sustituye al botón original) */}
      {carrito.length > 0 && (
        <div 
          className="position-relative d-inline-block mb-3"
          style={{ cursor: 'pointer' }}
          onClick={() => setShowCarrito(true)}
          title="Ver carrito"
        >
          <i className="fas fa-shopping-cart fs-3 text-primary me-2"></i>
          <Badge 
            pill 
            bg="danger"
            className="position-absolute top-0 start-100 translate-middle"
          >
            {carrito.length}
          </Badge>
        </div>
      )}

      <Row xs={1} sm={2} md={3} lg={4}>
        {productos.map((producto, index) => (
          <Col key={producto._id || index}>
            <div className="p-2">
              <ItemProductos producto={{
                ...producto,
                imagen: producto.imagen ? `http://localhost:4000/${producto.imagen}` : ""
              }} />
              
              <ButtonGroup className="w-100 mt-2">
                <Button 
                  onClick={() => handleMasInfo(producto)}
                  className="flex-grow-1"
                >
                  Precio ${producto.precio?.toFixed(2) || '0.00'}
                </Button>
                
                <Button 
                  variant="outline-success" 
                  onClick={() => handleAgregarCarrito(producto)}
                  className="flex-grow-1"
                >
                  <i className="fas fa-cart-plus me-2" />
                  Agregar
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        ))}
      </Row>

      {/* Modal del Carrito (igual al original) */}
      <Modal show={showCarrito} onHide={() => setShowCarrito(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-shopping-cart me-2"></i>
            Tu Carrito de Compras
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {carrito.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody> 
                  {carrito.map((item, index) => (
                    <tr key={index}>
                      <td style={{ width: '100px' }}>
                        <img 
                          src={item.imagen} 
                          alt={item.nombre} 
                          className="img-thumbnail"
                        />
                      </td>
                      <td>{item.nombre}</td>
                      <td>${item.precio?.toFixed(2) || '0.00'}</td>
                      <td>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleEliminarProducto(index)}
                        >
                          <i className="fas fa-trash"></i> Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2" className="text-end fw-bold">Total:</td>
                    <td className="fw-bold">
                      ${carrito.reduce((sum, item) => sum + (item.precio || 0), 0).toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCarrito(false)}>
            Seguir Comprando
          </Button>
          {carrito.length > 0 && (
            <Button variant="success" onClick={handleComprar}>
              <i className="fas fa-credit-card me-2"></i> Comprar Ahora
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}


