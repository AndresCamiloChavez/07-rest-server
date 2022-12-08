const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearProducto,
  getProductoById,
  getProductos,
  updateProducto,
  eliminarProducto,
} = require("../controllers/productos");
const {
  existeCategoriaByid,
  existeProductoByid,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { tieneRol } = require("../middlewares/validar-roles");
const { validartJwt } = require("../middlewares/validart-jwt");
const router = Router();

router.get(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeProductoByid),
    validarCampos,
  ],
  getProductoById
);

router.get("/", getProductos);
router.put(
  "/:id",
  [
    validartJwt,
    tieneRol("ADMIN_ROL"),
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(existeProductoByid),
    check("categoria").custom(existeCategoriaByid),
    validarCampos,
  ],
  updateProducto
);

router.post(
  "/",
  [
    validartJwt,
    //validar que la categoria exista
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("precio", "El precio es obligatorio").notEmpty(),
    check("categoria", "La categoria es obligatoria").notEmpty(),
    check("categoria", "La categoria es obligatoria").isMongoId(),
    check("categoria").custom(existeCategoriaByid),
    validarCampos,
  ],
  crearProducto
);

router.delete("/:id", [
  check('id', 'Id no es válido').isMongoId(),
  check('id').custom(existeProductoByid),
  validarCampos
], eliminarProducto);

module.exports = router;
