const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validartJwt } = require("../middlewares/validart-jwt");
const {
  crearCategoria,
  getCategoriaById,
  getCategorias,
  borrarCategoria,
  actualizarCategoria,
} = require("../controllers/categorias");
const { existeCategoriaByid } = require("../helpers/db-validators");
const { tieneRol } = require("../middlewares/validar-roles");

const router = Router();

//obtener todas las categorias
router.get("/", getCategorias);

//obtener una categoria por id
router.get(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeCategoriaByid),
    validarCampos,
  ],
  getCategoriaById
);

//crear categoria con token
//Cualquier ROL
router.post(
  "/",
  [
    validartJwt,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//Actualizar categoria por id, cualquiera con token válido
router.put("/:id",[
  validartJwt,
  tieneRol('ADMIN_ROL'),
  check("id").custom(existeCategoriaByid),
  validarCampos
], actualizarCategoria);
//Borrar una categoria,
router.delete("/:id", [
  validartJwt,
  tieneRol('ADMIN_ROL'),
  check("id").custom(existeCategoriaByid),
  check("nombre", "El nombre es obligatorio").notEmpty(),
  validarCampos
], borrarCategoria);
module.exports = router;
