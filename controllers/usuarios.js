const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const getUsuarios = async (req = request, res = response) => {
  const { q, nombre = "No name", apiKey } = req.query;

  const { limit = 5, desde = 0 } = req.query;

  // console.log('Valor de los parametros', params);
  console.log("Valor del limit", limit);

  // const usuarios = await Usuario.find({ estado: true })
  //   .skip(Number(desde))
  //   .limit(Number(limit));

  // const total = await Usuario.countDocuments({ estado: true });

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limit)),
  ]);

  return res.status(200).json({
    total,
    usuarios,
  });
};

const putUsuario = async (req, res) => {
  const id = req.params.id;
  const { _id, password, google, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.status(200).json({
    id,
    msg: "put API controller",
    usuario,
  }); //  retornando un JSON en lugar de un text/html
};

const createUsuario = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;

  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en base de datos
  await usuario.save(); // para guardar en base de datos

  res.status(201).json({
    ok: true,
    usuario,
  });
};

const patchUsuario = (req, res) => {
  res.status(201).json({
    ok: true,
    msg: "patch API - controller",
  });
};
const deleteUsuario = async(req, res) => {
  const {id} = req.params;
  //Fisicamente se borra
  // const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
  res.status(200).json(usuario);
};

module.exports = {
  getUsuarios,
  putUsuario,
  createUsuario,
  patchUsuario,
  deleteUsuario,
};
