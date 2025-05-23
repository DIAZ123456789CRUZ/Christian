import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { HomeProductos } from "../components/productos";
import { Home } from "../page";
import { Layout } from "../layouts";
import { Productos } from "../components/Fomulario";
import { Login } from "../components/Login";
import { Register } from "../components/Registro/Registro";

export function Rutas() {
  const [refresh, setRefresh] = useState(false);
  const Layouts = (Layout, Page) => (
    <Layout>
      <Page />
    </Layout>
  );

  return (
    <Routes>
      <Route path="/Registro" element={Layouts(Layout, Register)} />
      <Route path="/" element={Layouts(Layout, Login)} />
      <Route path="/Home" element={Layouts(Layout, Home)} />
      <Route path="/producto" element={Layouts(Layout, () => <HomeProductos refresh={refresh} />)} />
      <Route path="/formproductos" element={Layouts(Layout, () => <Productos setRefresh={setRefresh} refresh={refresh} />)} />
    </Routes>
  );
}