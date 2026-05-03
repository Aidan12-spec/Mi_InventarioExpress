const Usuario = require('../modelos/Usuario');

exports.formularioLogin = (req, res) => {
    res.render('login', { layout: false }); 
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    //Busca un usuario con ese email y esa clave
    const usuario = await Usuario.findOne({ email, password });

    if (usuario) {
        req.session.usuarioId = usuario._id;
        return res.redirect('/');
    } else {
        return res.send("Credenciales incorrectas");
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};
