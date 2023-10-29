const mongoose = require('mongoose');
require('dotenv').config();
const URL = process.env.MONGO;///uri de mongo//
const DEPLOY_DB= process.env.DEPLOY_DB;

/////conexion a mongoose/////
mongoose.set('strictQuery', true);

const connection = mongoose.connect(URL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('[Mongoose] - Conectado a MongoDB', URL);
});
mongoose.connection.on('error',(error)=>{
    console.log('[Mongoose]-Error:',error);
});
module.exports = connection;
