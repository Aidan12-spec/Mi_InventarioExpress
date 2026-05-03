const express = require('express');
const router = express.Router();
const productoControl = require('../controladores/productoControl');
const estaLogueado = require('../controladores/mediador');

//Permite ver todos los productos del inventario
router.get('/', estaLogueado, productoControl.listarProductos);

//Es el formulario para agregar
router.get('/agregar', estaLogueado, productoControl.formularioAgregar);

//Permite guardar los prdouctos
router.post('/agregar', estaLogueado, productoControl.guardarProducto);

router.get('/eliminar/:id', estaLogueado, productoControl.eliminarProducto);

//Es la ruta para ver el formulario edicion
router.get('/editar/:id', estaLogueado, productoControl.formularioEditar);
router.post('/editar/:id', estaLogueado, productoControl.actualizarProducto);

router.get('/chat', estaLogueado, (req, res) => {
    res.render('chat');
});

module.exports = router;
