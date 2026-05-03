const express = require('express');
const router = express.Router();
const authControl = require('../controladores/authControl');

router.get('/login', (req, res) => res.render('login'));
router.get('/login', authControl.formularioLogin);
router.post('/login', authControl.login);
router.get('/logout', authControl.logout);

module.exports = router;
