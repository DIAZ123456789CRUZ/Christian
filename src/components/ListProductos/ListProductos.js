import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner, Modal } from "react-bootstrap";
import axios from "axios";
import { FormGuardarEdits } from '../Fomulario/FormGuardarEdits';

export function ListProductos({ refresh, onEdit }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:4000/api/lista")
      .then(res => setProductos(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [refresh]);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      try {
        await axios.delete(`http://localhost:4000/api/eliminar/${id}`);
        setProductos(productos.filter(p => p._id !== id));
      } catch (err) {
        alert("Error al eliminar el producto");
      }
    }
  };

  const handleEditClick = (producto) => {
    setProductoEditar(producto);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setProductoEditar(null);
  };

  const handleReload = () => {
    // Refresca la lista después de editar
    if (typeof refresh === 'function') {
      refresh(r => !r); // Si el padre provee setRefresh, lo usa
    } else {
      // Si no, recarga la lista localmente
      setLoading(true);
      axios.get("http://localhost:4000/api/lista")
        .then(res => setProductos(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
    setShowModal(false);
    setProductoEditar(null);
  };

  return (
    <div className="mt-4">
      <h4 className="mb-3 text-secondary">Lista de productos</h4>
      {loading ? (
        <div className="text-center my-4"><Spinner animation="border" /></div>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm bg-white">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Nombre Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Imagen</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod, idx) => (
              <tr key={prod._id || idx}>
                <td>{idx + 1}</td>
                <td>{prod.nombre}</td>
                <td>${prod.precio}</td>
                <td>{prod.cantidad}</td>
                <td>{prod.unidad}</td>
                <td>
                  {prod.imagen ? (
                    <img
                      src={`http://localhost:4000/${prod.imagen}`}
                      alt={prod.nombre}
                      width={50}
                      style={{ borderRadius: 8, border: '1px solid #eee' }}
                    />
                  ) : (
                    "Sin imagen"
                  )}
                </td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEditClick(prod)}>
                    Editar
                  </Button>
                </td>
                <td>
                  <Button variant='danger' size="sm" onClick={() => handleDelete(prod._id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productoEditar && (
            <FormGuardarEdits
              producto={productoEditar}
              onReload={handleReload}
              closeModal={handleModalClose}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
