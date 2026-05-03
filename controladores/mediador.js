module.exports = (req, res, next) => {
   //Verifica si el usuario existe
    if (req.session.usuarioId) {
        return next();
    }
    // Si no, lo manda a "entrar"
    res.redirect('/login');
};