import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxzhZoMmVEKyvy6lDQiXjxrbrzRxVt0KCQJsSmZnWwBA&s"
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    folders:{
        type: [mongoose.Schema.Types.ObjectId],
        default:[]
    }
    
},{ timestamps:true})

const User=mongoose.model('User',userSchema)
export default User