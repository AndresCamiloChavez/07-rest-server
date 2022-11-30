const { response } = require("express");
const Usuairo = require("../models/usuario");
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
    res.status(200).json({
      message: "Hola a todos",
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
