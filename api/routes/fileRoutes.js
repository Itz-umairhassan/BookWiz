import express from "express"
import File from "../models/fileModel.js";
import Folder from "../models/folderModel.js";
import mongodb from "mongodb"
import jwt from "jsonwebtoken";
import { errorMessage, serverError, successMessage } from "../helpers/helperFuncs.js";
import { userExists, folderExists, userFolderAuth, validateUser } from "../middleware/authMiddleWare.js";
import User from "../models/userModel.js";
const router = express.Router();

router.use(validateUser);

router.get('/testit' , (req,res)=>{
    console.log("testing it bro");
    res.send("oooohk finneeee");
})

router.post('/upload' ,userExists,folderExists,userFolderAuth, async (req , res)=>{
    // suppose file is uploaded and a url is generated
    try{
        console.log(`cookies = ${req.cookies.access_token}`);
        const {userId , folderId , fileName} = req.body;
        console.log(`user id is ${userId}`)
        const fileUrl = "dummyurl.com";
        const newFile = new File({
            fileName: fileName,
            fileUrl : fileUrl
        });

        const storedFile = await newFile.save();

        // now add this file to file list of folder
        const updatedFolder = await Folder.findByIdAndUpdate(
            new mongodb.ObjectId(folderId),
            {
                $push:{
                    files: storedFile['_id']
                }
            }
        )

        res.status(200).json(successMessage("file stored successfuly" , [storedFile,updatedFolder]));
    }catch(error){
        console.log(`error : ${error}`)
        res.status(500).json(serverError());
    }
});

export default router