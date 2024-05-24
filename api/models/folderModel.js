import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
    folderName : {
        type:String,
        required:true
    },
    _status :{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    files:{
        type:[mongoose.Schema.Types.ObjectId],
        default:[]
    }
})

const Folder = mongoose.model("Folder" , folderSchema);

export default Folder