import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    fileName: {
        type:String,
        required:true
    },
    folderId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fileType:{
        type: String,
        default: "pdf"
    },
    fileData:{
        type: String,
        required:true
    }
},{
    timestamps:true
})

const File = mongoose.model("File" , fileSchema);

export default File