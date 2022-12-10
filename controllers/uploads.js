const { response } = require("express");
const path  = require("path");
const cargarArchivo = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "No har archivos que subir" });
    return;
  }

  console.log("req.files >>>", req.files); // eslint-disable-line

  const { archivo } = req.files;
  const nombreCortado = archivo.name.split('.');
  const extension = nombreCortado[nombreCortado.length - 1];


  //Validar la extencion

  const extencionesValidas = ['png','jpg', 'jpeg', 'gif'];

  if(!extencionesValidas.includes(extension)){
    return res.status(400).json({
        msg: `La extensión ${extension} no es válida -> ${extencionesValidas}`
    });
  }
  console.log(nombreCortado );
  res.json({extension});


//   const uploadPath = path.join(__dirname, "../uploads/" + archivo.name);

//   archivo.mv(uploadPath, (err) => { // para mover
//     if (err) {
//       return res.status(500).json({ err });
//     }
//     res.json({
//         msg: 'El archivo se subio a el '+uploadPath 
//     });
//   });
};

module.exports = {
  cargarArchivo,
};
