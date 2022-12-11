const { response } = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { subirArchivo } = require("../helpers/subir-archivo");

const cargarArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "No har archivos que subir" });
    return;
  }

  try {
    const pathCompleto = await subirArchivo(
      req.files,
      ["pdf"],
      "usuarios"
    );
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

module.exports = {
  cargarArchivo,
};
