import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user_content:{
        type:String,
        default:""
    },
    model_content:{
        type:String,
        required:true
    },
    _user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
});

const Notes = mongoose.model("Notes" , notesSchema);
export default Notes