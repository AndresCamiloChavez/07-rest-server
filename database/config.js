const mongoose = require('mongoose');
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Base de datos arriba!!');
    } catch (error) {
        console.log('Error -> ',error);
        throw new Error('Error en la base de datos al momento de inicializar la DB');
    }
}


module.exports = {
    dbConnection
}