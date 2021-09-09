const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({ 

    name : {
        type : String,
        required : true, 
    },

    price : {
        type : String,
        required : true, 
    },

    description: {
        type :String,
        required : true
    },

    user_id :{
        type: String,
        required : true
    },
  
    username : { 
        type : String,
        required : true
    }
} , {
    timestamps: true
})

module.exports = mongoose.model("product",productSchema)