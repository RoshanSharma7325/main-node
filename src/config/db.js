const mongoose = require("mongoose");

const connection = async () => {
     await mongoose.connect("mongodb://localhost:27017/NewData");

     console.log("database connected");
     

}

connection()

module.exports = { connection }