const mongoose = require("mongoose");
const app = require("./app");
const { DB_USER,
    DB_NAME,
    DB_PASSWORD,
    IP_SERVER, DB_PORT } = require("./constantes");

const port = process.env.PORT || 4000;

const uri = `mongodb://${IP_SERVER}:${DB_PORT}/${DB_NAME}`;
mongoose.connect(uri)
    .then(mongoose => console.log('Conectado a la base de datos en el puerto 27017'))
    .catch(err => console.log(err));

app.listen(port,()=>{
    console.log("*******************");
    console.log("***API REST********");
    console.log("*******************");
    console.log(`http://${IP_SERVER}:${port}`);
})