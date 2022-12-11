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
    const uploadPath = path.join(__dirname, `../${nombreCarpeta}/` + nombreTemp);

    archivo.mv(uploadPath, (err) => {
      // para mover
      if (err) {
        return reject(err);
      }
      resolve("El archivo se subio a el " + nombreTemp)
    });
  });
};

module.exports = { subirArchivo };
