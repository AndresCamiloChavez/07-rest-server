const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearProducto,
  getProductoById,
  getProductos,
  updateProducto
} = require("../controllers/productos");
const {
  existeCategoriaByid,
  existeProductoByid,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
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
router.put("/:id",[
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( existeProductoByid ),
],updateProducto);

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

router.get("/", (req, res) => {
  return res.status(200).json({
    msg: "TODO OK!",
  });
});

module.exports = router;
