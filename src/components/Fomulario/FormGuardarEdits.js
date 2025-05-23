import React from "react";
import { useFormik } from "formik";
import { Button, Form, Row, Col, InputGroup, Image } from "react-bootstrap";
import { initialValues } from "./Productos.form";
import { Producto } from "../../api";

const ctrProducto = new Producto();

export function FormGuardarEdits({ producto, onReload, closeModal }) {
  const formik = useFormik({
    initialValues: initialValues(producto),
    enableReinitialize: true,
    validationSchema: null, // Desactiva la validación
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const formData = new FormData();
      formData.append("nombre", formValue.nombre);
      formData.append("precio", formValue.precio);
      formData.append("cantidad", formValue.cantidad);
      formData.append("unidad", formValue.unidad);
      formData.append("description", formValue.description);
      if (formValue.imagenFile) {
        formData.append("imagen", formValue.imagenFile);
      }
      if (producto) {
        await ctrProducto.updateProduct(producto._id, formData);
      } else {
        await ctrProducto.createProduct(formData);
      }
      if (onReload) onReload();
      if (closeModal) closeModal();
    },
  });

  // Permite previsualizar la imagen actual o la nueva seleccionada
  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("imagenFile", file);
      formik.setFieldValue("imagenPreview", URL.createObjectURL(file));
    }
  };

  // Determina la imagen a mostrar
  const getImagen = () => {
    if (formik.values.imagenPreview) {
      return formik.values.imagenPreview;
    } else if (producto && producto.imagen) {
      return `http://localhost:4000/${producto.imagen}`;
    }
    return "https://via.placeholder.com/180x180?text=Sin+Imagen";
  };

  return (
    <div>
      <Form noValidate onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <Row className="mb-3">
          <Form.Group as={Col} md="12">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Producto"
              name="nombre"
              onChange={formik.handleChange}
              value={formik.values.nombre}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              placeholder="Precio"
              value={formik.values.precio}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Cantidad</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="number"
                name="cantidad"
                placeholder="Cantidad"
                value={formik.values.cantidad}
                onChange={formik.handleChange}
              />
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
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Descripción del producto"
              value={formik.values.description || ""}
              onChange={formik.handleChange}
              rows={2}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12">
            <Form.Label>Imagen</Form.Label>
            <div className="mb-2">
              <Image src={getImagen()} rounded style={{ width: 120, height: 120, objectFit: "cover" }} />
            </div>
            <Form.Control
              type="file"
              name="imagen"
              onChange={handleImageChange}
            />
          </Form.Group>
        </Row>
        <Button type="submit" className="mt-3" variant="primary">
          {!producto ? "Guardar" : "Editar"}
        </Button>
      </Form>
    </div>
  );
}
