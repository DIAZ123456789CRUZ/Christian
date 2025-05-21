const Producto = require('../modelos/productos.models')
const imagen = require('../utiles/imagen')
const fs = require('fs');
const path = require('path');

async function createProducto(req, res) {
    try {
        console.log("req.files:", req.files);
        console.log("req.body:", req.body);

        const productos = new Producto(req.body);
        console.log("Producto creado:", productos);
        // Validación de campos requeridos
        if (!productos.nombre || !productos.precio || !productos.cantidad || !productos.unidad) {
            return res.status(400).send({ msg: "Todos los campos son obligatorios" });
        }
        // Manejo de la imagen 
        if (req.files?.imagen) {
            console.log("req.files:", req.files); 
            console.log("Imagen recibida en backend:", req.files.imagen); 
            const filePath = imagen.getFilePath(req.files.imagen);
            console.log("Ruta devuelta por getFilePath:", filePath); // <-- LOG
            const fileName = path.basename(filePath);
            productos.imagen = fileName;
            console.log("Nombre guardado en BD:", fileName); 
        } else {
            console.log("No se recibió archivo imagen en req.files");
        }

        const datos = await productos.save();
        res.status(201).send({
            msg: "Producto creado correctamente",
            datos,
            imageId: productos.imagen,  
            imageUrl: `http://localhost:4000/${productos.imagen}`,
        });
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).send({ msg: "Error al guardar los datos", error: error.message });
    }
}
 
async function getProducto(_req, res) {
    try {
        const buscarProducto = await Producto.find();
        res.status(200).send(buscarProducto);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).send({ msg: "Error al buscar los datos", error: error.message });
    }
}

async function delProducto(req, res) {
    const { id } = req.params;
    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).send({ msg: "Producto no encontrado" });
        }

        // Eliminar la imagen asociada si existe
        if (producto.imagen) {
            const imagePath = path.join(__dirname, '..', 'uploads', producto.imagen);
            try {
                await fs.promises.unlink(imagePath);
            } catch (err) {
                console.error("Error al eliminar la imagen:", err);
                return res.status(500).send({ msg: "Error al eliminar la imagen" });
            }
        }

        await Producto.findByIdAndDelete(id);
        res.status(200).send({ msg: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).send({ msg: "No se ha podido eliminar la información", error: error.message });
    }
}

async function updateProducto(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
        if (req.files?.imagen) {
            const filePath = imagen.getFilePath(req.files.imagen); 
            const fileName = path.basename(filePath); 
            updateData.imagen = fileName;

            const producto = await Producto.findById(id);
            if (producto?.imagen) {
                const oldImagePath = path.join(__dirname, '..', 'uploads', producto.imagen);
                if (fs.existsSync(oldImagePath)) {
                    await fs.promises.unlink(oldImagePath); 
                }
            }
        }

        // Actualiza el producto en la base de datos
        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            updateData,
            { new: true } // Devuelve el producto actualizado
        );

        if (!productoActualizado) {
            return res.status(404).send({ msg: "Producto no encontrado" });
        }

        res.status(200).send({ msg: "Producto actualizado correctamente", producto: productoActualizado });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).send({ msg: "Error al actualizar el producto", error: error.message });
    }
}

module.exports = {
    createProducto,
    getProducto,
    delProducto,
    updateProducto
};