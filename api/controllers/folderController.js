import Folder from "../models/folderModel.js";
import File from "../models/fileModel.js";
import User from "../models/userModel.js";
import {errorMessage, successMessage ,serverError} from "../helpers/helperFuncs.js"
import mongodb from "mongodb";

export const folderCreation =  async (req , res) =>{
    const {userId , folderName , status} = req.body;

    try{
        const userObjId = new mongodb.ObjectId(userId);
        const user = await User.findById(userObjId);

        const folder = new Folder({
            folderName:folderName,
            owner:userObjId,
            _status:status
        })

        const newFolder = await folder.save();
        
        const response = await User.findByIdAndUpdate(
            userObjId,
            {
                $push:{
                    folders: new mongodb.ObjectId(newFolder["_id"])
                }
            }
        )

        res.status(200).json(successMessage("folder created" , [newFolder,response]));
    }catch(error){
        console.log(`error: ${error}`);
        res.status(500).json(serverError());
    } 
}

export const getAllFiles = async (req , res)=>{
    try{
        console.log("hehe request");
        let {folderId} = req.body;
        if(!folderId){
            folderId = req.params.folderId;
        }
        console.log("folder id " + folderId)
        const folderObjId = new mongodb.ObjectId(folderId);
        var folder = await Folder.findById(folderObjId);
        console.log(folder)
        var files = []
        for(let file of folder.files){
           files.push(await File.findById(file));
        }
        res.status(200).json(successMessage("fetched successfuly" , files))

    }catch(error){
        console.log(`see error: ${error}`);
        res.status(500).json(serverError());
    }
}

export const removeFolder = async (req  ,res)=>{
    try{

        const {userId , folderId} = req.body;
        const user = await User.findById(new mongodb.ObjectId(userId));
        const folder = await Folder.findById(new mongodb.ObjectId(folderId));
        
        if(!(folder["owner"].equals(user["_id"]))){
            res.status(500).json(errorMessage("no right to delete the folder"))
            return;
        }
        // delete the folder now...
        const response = await Folder.findByIdAndDelete(new mongodb.ObjectId(folderId));

        res.status(200).json(successMessage("folder deleted" , [response]))

    }catch(error){

        console.log(`error: ${error}`)
        res.status(500).json(serverError())

    }
}