import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        minLength:3,
        maxLength:30,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        minLength:8,
        required:true
    },
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50,
    }
})

const User = mongoose.model('User',userSchema);

export default User;