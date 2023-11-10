const mongoose = require("mongoose");

mongoose.connect(process.env.Mongo_Url);

const connection = mongoose.connection;

connection.on('connected',()=>{
    console.log("Mongodb is connected to server");
})

connection.on('error',()=>{
    console.log("Mongodb is not connected to server");
})

module.exports = connection;