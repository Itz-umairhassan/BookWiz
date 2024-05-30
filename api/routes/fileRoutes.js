import express from "express"
import Folder from "../models/folderModel.js";
import mongodb from "mongodb"
import jwt from "jsonwebtoken";
import { errorMessage, serverError, successMessage } from "../helpers/helperFuncs.js";
import { userExists, folderExists, userFolderAuth, validateUser } from "../middleware/authMiddleWare.js";
import User from "../models/userModel.js";
import multer from "multer";
import PdfParse from "pdf-parse";
import fs from "fs";
import File from "../models/fileModel.js";

const router = express.Router();

router.use(validateUser);
const upload = multer({dest: 'uploads/'});

router.post('/testUpload', upload.single('file'), async (req, res) => {
  console.log("Start uploading");

  try {
    console.log("ok fine");
    res.send("djwdw");
  } catch (error) {
    console.log(`error: ${error}`);
    res.status(500).json({ message: "Error uploading file" });
  }
});

router.post('/upload' ,upload.single("file"),userExists,folderExists,userFolderAuth, async (req , res)=>{
    // suppose file is uploaded and a url is generated
    console.log("start uploading");
    try{
        console.log(`end is ${req.body.folderId}`)
        const dataBuffer = fs.readFileSync(req.file.path);
        const data = await PdfParse(dataBuffer);

        const folderId = req.body.folderId;
        console.log(`again end is ${folderId}`)

        const newFile = new File({
            folderId:new mongodb.ObjectId(folderId),
            fileName:req.file.originalname,
            fileData: data.text,
            fileType:"Pdf"
        })

        const storedFile = await newFile.save();
        console.log(storedFile);
        // now add this file to file list of folder
        const updatedFolder = await Folder.findByIdAndUpdate(
            new mongodb.ObjectId(folderId),
            {
                $push:{
                    files: storedFile['_id']
                }
            }
        )

        console.log("got in the end");
        res.status(200).json(successMessage("file stored successfuly" , [storedFile,updatedFolder]));
    }catch(error){
        console.log(`error : ${error}`)
        res.status(500).json(serverError());
    }
});

export default router