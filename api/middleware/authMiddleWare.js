import Folder from "../models/folderModel.js";
import User from "../models/userModel.js";
import { errorMessage , serverError,successMessage } from "../helpers/helperFuncs.js";
import mongodb from "mongodb"
import jwt from "jsonwebtoken"

export const    validateUser = async (req , res , next)=>{
    try{

        const token = req.cookies.access_token;
        const payload = jwt.verify(token , process.env.JWT_SECRET);
        req.userId = payload["id"]
        console.log("user validated successfuly");
        next();

    }catch(error){
        console.log(`error : ${error}`);
        res.clearCookie('access-token');
        res.status(401).json(errorMessage("Error in user validation"));
    }
}

// to see that user has provided userId 
// and relevant user exists
export const userExists =  async (req , res , next)=>{
    try{
        
        const userId = req.userId;
        if(!userId){
            res.status(500).json(errorMessage("user id is required"));
            return;
        }
        const user = await User.findById(new mongodb.ObjectId(userId));
        if(!user){
            res.status(500).json(errorMessage("user not found"));
            return;
        }

        next();
    }catch(error){
        console.log(`error : ${error}`);
        res.status(500).json(serverError());
    }
}

// to see if folder exists and user has provided folderId....
export const folderExists = async (req , res  ,next)=>{
    try{
        let folderId = req.body.folderId;
        console.log(req.body)
        if(!folderId){
            folderId = req.params.folderId
        }

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

export const userFolderAuth = async (req,res , next)=>{
    try{
        console.log("user folder auth");
        let userId = req.userId;
        let folderId = req.body.folderId;
        if(!folderId){
            folderId = req.params.folderId;
        }
    
        const userFolders = (await User.findById(new mongodb.ObjectId(userId)))["folders"];
        let userHasFolder = false;
        console.log(`user uid is ${userId}`);
        console.log(userFolders);
        for(let f of userFolders){
            if(f.equals(new mongodb.ObjectId(folderId))){
                userHasFolder = true;
            }
        }

        if(userHasFolder){
            next();
        }else{
            res.status(500).json(errorMessage("user has no access to this folder"));
        }

    }catch(error){
        console.log(`where error : ${error}`)
        res.status(500).json(serverError()); 
    }
};