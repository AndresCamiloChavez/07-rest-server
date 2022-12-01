const { response, request, json } = require('express');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const validartJwt = async (req=request, res = response, next) => {
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No estas autorizado'
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETPRIVATEKEY); //obteniendo el payload
        console.log('uid', uid);
        const usuarioAuth = await Usuario.findById({_id: uid});
        req.usuarioAuth = usuarioAuth;

        if(!usuarioAuth){
            return res.status(401).json({
                msg: 'Usuario no existe en DB / token invalido'
            })
        }

        //Verificar que el usuario este activo

        if(!usuarioAuth.estado){
            return res.status(401).json({
                msg: 'El usuario no existe / token no válido'
            });
        }


        // req.uid = uid; // estamos dejando el id en la request para luego obtenerlo
        next();
    } catch (error) {
        console.log('Error en validar token',error);
        return res.status(400).json({
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validartJwt
}