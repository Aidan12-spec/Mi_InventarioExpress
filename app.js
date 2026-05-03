const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const DB_URI = 'mongodb+srv://Aidan:alandamian@cluster0.7ums6em.mongodb.net/Mi_InventarioExpress?appName=Cluster0'
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const authRutas = require('./rutas/rutasAuth');
const productoRutas = require('./rutas/rutasProducto');

// --- CONFIGURACIÓN ---
// Middlewares para leer datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos (CSS, JS cliente, Imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Motor de plantillas Handlebars
app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'principal' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'vistas'));

// Sesiones de usuario (Punto 7)
app.use(session({
    secret: 'mi_clave_secreta',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    //Si existe usuarioId, logueado será verdadera
    res.locals.logueado = req.session.usuarioId ? true : false;
    next();
});

mongoose.connect(DB_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión:', err));

// --- RUTAS ---
app.use('/', require('./rutas/rutasProducto'));
app.use('/', require('./rutas/rutasAuth'));
app.use('/', authRutas);
app.use('/', productoRutas);

// --- CHAT EN TIEMPO REAL (Punto 10) ---
io.on('connection', (socket) => {
    console.log('Usuario conectado en el chat');
    socket.on('mensaje-chat', (msg) => {
        io.emit('mensaje-chat', msg);
    });
   
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

// --- INICIAR SERVIDOR ---
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor y Chat corriendo en http://localhost:${PORT}`);
});