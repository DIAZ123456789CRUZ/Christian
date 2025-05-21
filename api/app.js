const express = require('express');
const cors = require('cors');
const path = require('path');

const productoRuta = require('./rutas/Producto.route');
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/api', productoRuta);

module.exports = app;