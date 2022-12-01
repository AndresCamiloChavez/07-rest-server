const isAdminRole = (req, res, next) => {
  if(!req.usuarioAuth){
    return res.status(500).json({
        msg: 'Se quiere verificar el rol sin el token primero'
    });
  }
  const {rol, nombre} = req.usuarioAuth; 
  if(rol !== 'ADMIN_ROL'){
    return res.status(401).json({
        msg: 'Este usuario no tiene permiso, por favor comuniquese con el administrador'
    });
  }
  next();
};

const tieneRol = (...roles) => {


    return (req, res, next) => {

        const {rol} = req.usuarioAuth;
        if(!req.usuarioAuth){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin el token primero'
            });
          }
        if(!roles.includes(rol)){
            return res.status(401).json({
                msg:`El servicio requiere alguno de estos roles ${roles}`
            })
        }
        next();
    }
}

module.exports = {
  isAdminRole,
  tieneRol
};
