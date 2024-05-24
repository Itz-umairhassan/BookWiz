import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    fileName: {
        type:String,
        required:true
    },
    fileUrl:{
        type: String,
        required: true
    }
},{
    timestamps:true
})

const File = mongoose.model("File" , fileSchema);

export default File