const { response } = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { subirArchivo } = require("../helpers/subir-archivo");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario");

const cargarArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "No har archivos que subir" });
    return;
  }

  try {
    const pathCompleto = await subirArchivo(req.files, ["pdf"], "usuarios");
    res.status(200).json({
      msg: "OK!",
      path: pathCompleto,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const actualizarImagen = async (req, res = response) => {
  const { coleccion, id } = req.params;

  console.log("files", req.files);
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
    modelo.img = await subirArchivo(req.files, undefined, coleccion);
    await modelo.save();
    res.json(modelo);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
};
