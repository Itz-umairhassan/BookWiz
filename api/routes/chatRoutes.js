import express from "express";
import { serverError, successMessage } from "../helpers/helperFuncs.js";
import Chat from "../models/chatModel.js";
import mongodb from "mongodb"
import { validateUser } from "../middleware/authMiddleWare.js";

const router = express.Router();
router.use(validateUser);

router.post('/saveChat' , async (req , res)=>{
    try{
        console.log("start");
        const {chatName,fileId , chatMessages} = req.body;
        const userId = req.userId;

        for(let index in chatMessages){
            chatMessages[index] = JSON.stringify(chatMessages[index]);
        }

        const newChat = new Chat({
            chatName: chatName,
            messages : chatMessages,
            userId: userId,
            fileId: fileId
        })

        const resp = await newChat.save();
        res.status(200).json(successMessage("chat is saved" , [resp]));
    }catch(error){
        console.log(`error : ${error}`);
        res.status(500).json(serverError());
    }
})

router.post("/fetchChat" , async (req , res)=>{
    try{
        const {chatId} = req.body;
        const resp = await Chat.findById(new mongodb.ObjectId(chatId));
        res.status(200).json(successMessage("chat retrieved" , [resp]));
    }catch(error){
        console.log(`error = ${error}`);
        res.status(200).json(serverError());
    }
})

router.post("/updateChat" , async (req , res)=>{
    try{
        const {chatId , chatName,chatMessages} = req.body;
        for(let index in chatMessages){
            chatMessages[index] = JSON.stringify(chatMessages[index]);
        }

        let resp = await Chat.findByIdAndUpdate(new mongodb.ObjectId(chatId) , {
            messages: chatMessages,
            chatName: chatName
        })

        resp = await Chat.findById(new mongodb.ObjectId(chatId));
        res.status(200).json(successMessage("chat updated successfully" , [resp]));
    }catch(error){
        console.log(`error = ${error}`);
        res.status(500).json(serverError());
    }
})

router.post("/fetchAll" , async (req,res)=>{
    try{
        
        const userId = req.userId;

        const resp = await Chat.find({userId: userId});

        res.status(200).json(successMessage("chats are loaded" , [resp]));
    }catch(error){
        console.log(`error  = ${error}`);
        res.status(500).json(serverError());
    }
})

export default router