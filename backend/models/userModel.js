const mongoose = require('mongoose');
const validator = require('mongoose-validator')

const userSchema = new mongoose.Schema({ 
    username : {
        type: String, 
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        validate: [
            validator({
              validator: 'isEmail',
              message: 'Oops..please enter valid email'
            })
          ],
        unique : true
    },
    password : {
        type: String,
        required : true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('User', userSchema)