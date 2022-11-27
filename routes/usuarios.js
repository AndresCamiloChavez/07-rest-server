const { Router } = require("express");
const { check } = require("express-validator");
const Role = require("../models/role");
const {
  getUsuarios,
  putUsuario,
  createUsuario,
  patchUsuario,
  deleteUsuario,
} = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router(); // llamar la función

router.get("/", getUsuarios);
router.put("/:id", putUsuario);
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
    check("rol").custom(async (rol = "") => {
      const existeRol = await Role.findOne({ rol });
      console.log('Existe rol', existeRol);
      if (!existeRol) {
        throw new Error(`El rol ${rol} no existe`);
      }
    }),
    validarCampos, // retonar los errores
  ],
  createUsuario
);
router.patch("/", patchUsuario);
router.delete("/", deleteUsuario);

module.exports = router;
