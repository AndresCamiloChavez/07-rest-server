const { response } = require("express");
const path = require("path");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario");

const validarImagen = async (req, res = response, next) => {
  const { coleccion, id } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: "Se me olvido validar esto ",
      });
  }

  try {
    if (!modelo.img) {
      return res.sendFile(path.join(__dirname, "../assets/noimage.webp"));
    }
  } catch (error) {
    console.log("Ocurrió un error la imagen no existe");
  }
  next();
};


module.exports = {
    validarImagen
}