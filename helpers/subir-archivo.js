const path = require("path");
const { v4: uuidv4 } = require("uuid");


const subirArchivo = (
  files,
  extencionesValidas = ["png", "jpg", "jpeg", "gif"],
  nombreCarpeta = ''
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    //Validar la extencion
    // const extencionesValidas = ["png", "jpg", "jpeg", "gif"];
    if (!extencionesValidas.includes(extension)) {
      return reject(`La extensión ${extension} no es válida -> ${extencionesValidas}`);
    }
    const nombreTemp = uuidv4() + "." + extension; // generando un nombre unico
    const uploadPath = path.join(__dirname, `../uploads/${nombreCarpeta}/` + nombreTemp);
    console.log('Valor path a subir', uploadPath);
    archivo.mv(uploadPath, (err) => {
      // para mover
      if (err) {
        return reject(err);
      }
      resolve(nombreTemp)
    });
  });
};

module.exports = { subirArchivo };
