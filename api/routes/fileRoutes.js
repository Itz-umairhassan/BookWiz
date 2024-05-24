import express from "express"
import File from "../models/fileModel.js";
import Folder from "../models/folderModel.js";
import mongodb from "mongodb"
const router = express.Router();

router.post('/upload' , async (req , res)=>{
    // suppose file is uploaded and a url is generated
    const {folderId , fileName} = req.body;
    const url = "dummyurl.com";

    const newFile = new File({
        fileName:fileName,
        fileUrl:url
    })

    try{
        const storedFile = await newFile.save();
        
        const folderObjId = new mongodb.ObjectId(folderId);

        const response = await Folder.findByIdAndUpdate(
            folderId,
            {
                $push:{files : new mongodb.ObjectId(storedFile["_id"])}
            }
        )

        res.status(200).json({
            "message" : "file stored successfully",
            "file" : storedFile,
            "response" : response
        })

    }catch(error){
        console.log(`error: ${error}`);
        res.status(500).json({
            "message" : "something wrong occured"
        })
    }
});

export default router