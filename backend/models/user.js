const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        default:"user"
    }
})

const userModel = mongoose.model('UserCred',userSchema);

module.exports = userModel;