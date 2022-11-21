const { response } = require("express");

const getUsuarios = (req, res = response) => {
  // = response es para el tipado
  res.status(404).json({
    ok: true,
    msg: "get API en controlador",
  }); //  retornando un JSON en lugar de un text/html
};

const putUsuario = (req, res) => {
  res.status(200).json({
    ok: true,
    msg: "put API controller",
  }); //  retornando un JSON en lugar de un text/html
};

const createUsuario = (req, res) => {
  res.status(201).json({
    ok: true,
    msg: "post API controller",
  });
};

const patchUsuario = (req, res) => {
  res.status(201).json({
    ok: true,
    msg: "patch API - controller",
  });
};
const deleteUsuario = (req, res) => {
  res.status(404).json({
    ok: true,
    msg: "delete API - controller",
  });
};

module.exports = {
  getUsuarios,
  putUsuario,
  createUsuario,
  patchUsuario,
  deleteUsuario
};
