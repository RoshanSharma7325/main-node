const { default: mongoose } = require("mongoose");


const schema = new mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
  
    Email:{
        type:String,
        require:true
    },

    Password:{
        type:String,
        // require:true
    },
    Image:[],
    Token:{
        type:String,
    },
  
})

const usermodel = mongoose.model('userdata',schema)
module.exports = usermodel

    