import Folder from "../models/folderModel.js";
import File from "../models/fileModel.js";
import User from "../models/userModel.js";
import {errorMessage, successMessage ,serverError} from "../helpers/helperFuncs.js"
import mongodb from "mongodb";

export const folderCreation =  async (req , res) =>{
    const {folderName , status} = req.body;

    try{
        const userId = req.userId;
        console.log('user id is ++ ' + userId);

        const userObjId = new mongodb.ObjectId(userId);
        const user = await User.findById(userObjId);
  

        const folder = new Folder({
            folderName:folderName,
            owner:userObjId,
            _status:status
        })

        const newFolder = await folder.save();
        console.log(newFolder)
        
        const response = await User.findByIdAndUpdate(
            userObjId,
            {
                $push:{
                    folders: new mongodb.ObjectId(newFolder["_id"])
                }
            }
        )
        console.log(response)  
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
console.log("in remove")
        //const {folderId} = req.body;
        const folderId = req.params.folderId;
        const userId = req.userId;

        const user = await User.findById(new mongodb.ObjectId(userId));
        const folder = await Folder.findById(new mongodb.ObjectId(folderId));
        
        if(!(folder["owner"].equals(user["_id"]))){
            res.status(500).json(errorMessage("no right to delete the folder"))
            return;
        }
        // delete the folder now...
        if(folder.files.length>0){
            console.log('files deleted before')
            await File.deleteMany({_id:{$in:folder.files}});
        }
        
        console.log("all files has been deleted");
        // await User.findByIdAndDelete(folderId);
        const response = await Folder.findByIdAndDelete(new mongodb.ObjectId(folderId));

        res.status(200).json(successMessage("folder deleted" , [response]))

    }catch(error){

        console.log(`error: ${error}`)
        res.status(500).json(serverError())

    }
}
export const editFolder = async (req, res) => {
    try {
        console.log("inside edit")
        const { folderId, folderName } = req.body;
        const userId = req.userId;

        const user = await User.findById(new mongodb.ObjectId(userId));
        const folder = await Folder.findById(new mongodb.ObjectId(folderId));
console.log(user+"\t"+folder)
        if (!(folder["owner"].equals(user["_id"]))) {
            res.status(500).json(errorMessage("no right to edit the folder"));
            return;
        }

        folder.folderName = folderName;
        const updatedFolder = await folder.save();

        res.status(200).json(successMessage("folder updated", [updatedFolder]));
    } catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json(serverError());
    }
}
