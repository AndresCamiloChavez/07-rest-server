const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
router.post(
  "/login",
  [
    check("correo", "El correo es necesario").isEmail(),
    check(
      "password",
      "La contraseña tiene que se mayor a 5 caracteres"
    ).isLength({ min: 5 }),
    validarCampos,
  ],
  login
);
router.post(
  "/google",
  [check("id_token", "El Id token es necesario").notEmpty(), validarCampos],
  googleSignIn
);
module.exports = router;
