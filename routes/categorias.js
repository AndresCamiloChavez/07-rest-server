const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validartJwt } = require("../middlewares/validart-jwt");
const {
  crearCategoria,
  getCategoriaById,
  getCategorias,
  borrarCategoria,
} = require("../controllers/categorias");
const { existeCategoriaByid } = require("../helpers/db-validators");

const router = Router();

//obtener todas las categorias
router.get("/", getCategorias);

//obtener una categoria por id
router.get(
  "/:id",
  [
    check(":id", "No es un id válido").isMongoId(),
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
router.put("/:id", (req, res) => {
  console.log("Todo OK!");
  res.status(200).json({
    ok: "put categoria",
  });
});
//Borrar una categoria,
router.delete("/:id", [], borrarCategoria);
module.exports = router;
