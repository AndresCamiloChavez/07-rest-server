const { Router } = require("express");
const { getUsuarios, putUsuario, createUsuario, patchUsuario, deleteUsuario } = require("../controllers/usuarios");

const router = Router(); // llamar la función

router.get("/", getUsuarios);
router.put("/:id", putUsuario);
router.post("/", createUsuario);
router.patch("/", patchUsuario);
router.delete("/", deleteUsuario);

module.exports = router;
