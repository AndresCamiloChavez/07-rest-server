const {Router} = require('express');
const { check } = require('express-validator');
const {login} = require('../controllers/auth');const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
router.post('/login', [
    check('correo', 'El correo es necesario').isEmail(),
    check('password', 'La contraseña tiene que se mayor a 5 caracteres').isLength({min: 5}),
    validarCampos
],login);
module.exports = router;