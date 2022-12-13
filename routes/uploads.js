const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo, actualizarImagen, mostrarImagen } = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarArchivo } = require("../middlewares/validar-archivos");
const { validarImagen } = require("../middlewares/validar-image");

const router = Router();
router.post("/", cargarArchivo);
router.put(
  "/:coleccion/:id",
  [
    check("id", "El id debe de ser de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarArchivo,
    validarCampos,
  ],
  actualizarImagen
);

router.get("/:coleccion/:id", [
  check("id", "El id debe de ser de mongo").isMongoId(),
  check("coleccion").custom((c) =>
    coleccionesPermitidas(c, ["usuarios", "productos"])
  ),
  validarImagen,
  validarCampos,
], mostrarImagen);

module.exports = router;
