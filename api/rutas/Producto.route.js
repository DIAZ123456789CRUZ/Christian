const express = require("express");
const multiparty = require("connect-multiparty");

const productosController = require("../controles/productos.controler");

const md_mparty = multiparty({ uploadDir: "./uploads" });
const api = express.Router();

api.post("/createproduct", md_mparty, productosController.createProducto); 
api.get("/lista", productosController.getProducto);
api.patch("/verlos/:id", md_mparty, productosController.updateProducto);
api.delete('/eliminar/:id', productosController.delProducto);

module.exports = api;

//backent