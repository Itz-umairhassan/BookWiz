import express from "express"
import File from "../models/fileModel.js";
const router = express.Router();

router.post('/upload' , async (req , res)=>{
    // suppose file is uploaded and a url is generated
    const {fileName} = req.body;
    const url = "dummyurl.com";

    const newFile = new File({
        fileName:fileName,
        fileUrl:url
    })

    try{
        const storedFile = await newFile.save();
        res.status(200).json({
            "message" : "file stored successfully"
        })

    }catch(error){
        console.log(`error: ${error}`);
        res.status(500).json({
            "message" : "something wrong occured"
        })
    }
});

export default router