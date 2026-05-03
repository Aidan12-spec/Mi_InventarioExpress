const Producto = require('../modelos/Producto');

//Muestra el formulario para agregar
exports.formularioAgregar = (req, res) => {
    res.render('agregar');
};

//Guarda el producto en la base de datos
exports.guardarProducto = async (req, res) => {
    try {
        const { nombre, precio, descripcion } = req.body;
        const nuevoProducto = new Producto({ nombre, precio, descripcion });
        await nuevoProducto.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.send('Error al guardar el producto');
    }
};

//Muestra la lista los productos en el inicio
exports.listarProductos = async (req, res) => {
    try {
        const productos = await Producto.find().lean();
        res.render('inicio', { productos });
    } catch (error) {
        res.send('Error al listar el producto');
    }
};

//Permite eliminar los productos del inventario
exports.eliminarProducto = async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.send("Error al intentar eliminar el producto.");
    }
};

//Muestra el formulario con los datos ya guardados
exports.formularioEditar = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).lean();
        res.render('editar', { producto });
    } catch (error) {
        res.send("Error al buscar el producto.");
    }
};

//Permite que los cambios se apliquen en la base de datos
exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, precio, descripcion } = req.body;
        await Producto.findByIdAndUpdate(req.params.id, { nombre, precio, descripcion });
        res.redirect('/');
    } catch (error) {
        console.error("Error al actualizar:", error);
        res.send("Error al actualizar.");
    }
};
