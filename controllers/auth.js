const { response } = require("express");
const Usuairo = require("../models/usuario");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //Verificar si el email existe
    const usuario = await Usuairo.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "No existe el usuario con ese correo electrónico",
      });
    }

    //Verificar si el usuario está activo
    if(!usuario.estado){
        return res.status(400).json({
            msg: 'El usuario no existe ;) active'
        });
    }

    //Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if(!validPassword){
        return res.status(400).json({
            msg: 'Usuario/Password ;) no son correctos'
        });
    }
    
    const token = await generarJWT(usuario.id);
    res.status(200).json({
      usuario,
      token
    });
  } catch (error) {
    console.log("Error en auth", error);
    res.status(500).json({
      msg: "Algo salió mal hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
