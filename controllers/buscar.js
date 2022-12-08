const { response } = require("express");
const Usuario = require("../models/usuario");
const Producto = require("../models/producto");
const { ObjectId } = require("mongoose").Types;

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const isMongoId = ObjectId.isValid(termino);

  if (isMongoId) {
    const usuarioDb = await Usuario.findById(termino);
    return res.status(200).json({ results: [usuarioDb] });
  }
  const regex = new RegExp(termino, 'i'); // estableciendo una expresión regular para realizar las busquedas
  const usuarios = await Usuario.find({$or: [
    {nombre: regex},
    {correo: regex},
  ]});
  return res.status(200).json({
    results: usuarios
  })
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      break;
    case "productos":
      break;
    case "usuarios":
      break;
    default:
      res.status(500).json({
        msg: "Se me olvido esta busqueda",
      });
  }
};

module.exports = {
  buscar,
};
