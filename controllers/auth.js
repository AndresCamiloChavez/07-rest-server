const { response } = require("express");
const Usuairo = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

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
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "El usuario no existe ;) active",
      });
    }

    //Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario/Password ;) no son correctos",
      });
    }

    const token = await generarJWT(usuario.id);
    res.status(200).json({
      usuario,
      token,
    });
  } catch (error) {
    console.log("Error en auth", error);
    res.status(500).json({
      msg: "Algo salió mal hable con el administrador",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, correo, img } = await googleVerify(id_token);

    let usuario = await Usuairo.findOne({ correo });

    if (!usuario) {
      //tengo que crear
      const data = {
        nombre,
        correo,
        img,
        password: ":?",
        google: true,
        estado: true,
        rol: 'USER_ROL'
      };
      usuario = new Usuairo(data);
      await usuario.save();
    }

    //si el usuario
    if (usuario.estado == false) {
      res.status(401).json({
        msg: "Hable con el administrador usuario bloqueado",
      });
    }
    const token = await generarJWT(usuario.id);
    res.status(200).json({
      usuario,
      token
    });


  } catch (error) {
    console.log("Ocurrió un error", error);
    res.status(400).json({
      ok: false,
      msg: "El token no se pudo verificar",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
