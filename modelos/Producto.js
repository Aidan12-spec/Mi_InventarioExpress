const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({

    nombre: { 
        type: String, 
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    
    precio: { 
        type: Number, 
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },

    descripcion: { 
        type: String,
        required: [true, 'La descripción es obligatoria']
    },

    
});

module.exports = mongoose.model('Producto', productoSchema);
