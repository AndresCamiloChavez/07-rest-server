const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsuarios,
  putUsuario,
  createUsuario,
  patchUsuario,
  deleteUsuario,
} = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { esRolValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");

const router = Router(); // llamar la función

router.get("/", getUsuarios);
router.put("/:id", [
  check("id", 'No es un ID válido').isMongoId(), // tambien es capaz darse de cuenta del id del param segmento
  check("id").custom(existeUsuarioPorId),
  check("rol").custom(esRolValido),
  validarCampos
], putUsuario);
router.post(
  "/",
  [
    check("correo", "El correo no es válido").isEmail(), // el aquí almacena todos los errores en la request
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check(
      "password",
      "La contraseña es obligatoria y más de 6 letras"
    ).isLength({ min: 6 }),
    // check("rol", "No es un rol válido").isIn(['ADMIN_ROLE', 'USER_ROLE']), NO en duro
    check("correo").custom( email => emailExiste(email)),
    check("rol").custom(esRolValido),
    validarCampos, // retonar los errores
  ],
  createUsuario
);
router.patch("/", patchUsuario);
router.delete("/", deleteUsuario);

module.exports = router;
