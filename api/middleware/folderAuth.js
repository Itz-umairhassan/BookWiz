import Folder from "../models/folderModel.js";
import { errorMessage , serverError,successMessage } from "../helpers/helperFuncs.js";
import mongodb from "mongodb"

export const folderExists = async (req , res  ,next)=>{
    try{
        const {folderId} = req.body;
        if(!folderId){
            res.status(500).json(errorMessage("folder id is required"));
            return;
        }

        const folder = await Folder.findById(new mongodb.ObjectId(folderId));
        if(!folder){
            res.status(500).json(errorMessage("folder not found"));
            return;
        }

        next();
    }catch(error){
        console.log(error);
        res.status(500).json(serverError());
    }
};