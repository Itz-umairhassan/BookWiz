import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
},{ timestamps:true})

const Customer=mongoose.model('Customer',userSchema)
export default Customer