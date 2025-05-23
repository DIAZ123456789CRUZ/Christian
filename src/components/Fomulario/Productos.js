import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Form, Row, Col, InputGroup, Alert } from "react-bootstrap";
import { initialValues, validationSchema } from "./Productos.form";
import { ListProductos } from "../ListProductos";
import { Producto } from "../../api";
import { useNavigate } from "react-router-dom";

const ctrProducto = new Producto() ;

export function Productos({ setRefresh, refresh }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [editData, setEditData] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(!!editData),
    validateOnChange: false,
    onSubmit: async (formValue, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("nombre", formValue.nombre);
        formData.append("precio", formValue.precio);
        formData.append("cantidad", formValue.cantidad);
        formData.append("unidad", formValue.unidad);
        formData.append("imagen", formValue.imagen);
        formData.append("description", formValue.description);
        if (editData) {
          await ctrProducto.updateProduct(editData._id, formData);
          setShowSuccess(true);
          setErrorMsg("");
          setEditData(null);
        } else {
          await ctrProducto.createProduct(formData);
          setShowSuccess(true);
          setErrorMsg("");
        }
        if (setRefresh) setRefresh((r) => !r); // refresca global
        resetForm();
        setTimeout(() => setShowSuccess(false), 2500);
      } catch (error) {
        setShowError(true);
        setErrorMsg(error?.response?.data?.msg || "Error al guardar el producto");
        setTimeout(() => setShowError(false), 3500);
      }
    },
  });

  const handleEdit = (producto) => {
    setEditData(producto);
    formik.setValues({
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: producto.cantidad,
      unidad: producto.unidad,
      imagen: null,
      description: producto.description || "",
    });
  };

  return (
    <div className="p-4">
      <h3 className="mb-4 text-primary">Gestión de productos</h3>
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          ¡Producto guardado correctamente!
        </Alert>
      )}
      {showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          {errorMsg}
        </Alert>
      )}
      <Form noValidate onSubmit={formik.handleSubmit} encType="multipart/form-data" className="shadow-sm p-4 rounded bg-white mb-4">
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Producto"
              name="nombre"
              onChange={formik.handleChange}
              value={formik.values.nombre}
              isInvalid={!!formik.errors.nombre}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.nombre}</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              required
              type="number"
              name="precio"
              placeholder="Precio"
              value={formik.values.precio}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.precio}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.precio}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustomUsername">
            <Form.Label>Cantidad</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="number"
                name="cantidad"
                placeholder="Cantidad"
                value={formik.values.cantidad}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.cantidad}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.cantidad}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Unidad</Form.Label>
            <Form.Control
              type="text"
              name="unidad"
              placeholder="Unidad"
              value={formik.values.unidad}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.unidad}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.unidad}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              name="imagen"
              onChange={(e) => formik.setFieldValue("imagen", e.currentTarget.files[0])}
              isInvalid={!!formik.errors.imagen}
            />  
            <Form.Control.Feedback type="invalid">{formik.errors.imagen}</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Descripción del producto"
              value={formik.values.description || ""}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.description}
              rows={2}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.description}</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit" className="w-100" variant="primary">
          {editData ? "Actualizar" : "Enviar"}
        </Button>
      </Form>
      <Row>
        <ListProductos refresh={refresh} onEdit={handleEdit} />
      </Row>
      <div className="mt-4 text-center">
        <Button variant="outline-primary" onClick={() => navigate("/producto")}>
          Ver catálogo de productos
        </Button>
      </div>
    </div>
  );
}
