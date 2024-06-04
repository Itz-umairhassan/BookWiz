import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    chatName:{
        type:String,
        required : true
    },
    messages:{
        type: [String],
        default : []
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required : true
    },
    fileId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }
},{
    timestamps: true
})

const Chat = mongoose.model("Chat" , chatSchema);

export default Chat