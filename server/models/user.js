const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    date: {
        type:Date,
        default:new Date()
    },
    age:{
        type:String,
        required:true
    },
    department: {
        type:String,
        required:true
    },
    role: {
        type:String,
        required:true,
        enum: ["User","Admin"],
        default:"User"
    }
})

const User = mongoose.model("user",userSchema)
module.exports = User