import express from 'express'
import { test } from '../controllers/userController.js';
import { successMessage,serverError } from '../helpers/helperFuncs.js';
import { userExists, validateUser } from '../middleware/authMiddleWare.js';
import mongodb from 'mongodb';
import User from '../models/userModel.js';
import Folder from '../models/folderModel.js';

const router=express.Router();

router.get('/folders',validateUser,userExists,async (req,res)=>{
    try{
        const userId = req.userId;
        console.log("user id is " + userId);
        const user = await User.findById(new mongodb.ObjectId(userId));
        let folders = [];
        for(let folder of user["folders"]){
            const _folder = await Folder.findById(folder);  
            if(_folder){
                folders.push(_folder);
            }
        }
        console.log(folders)

        res.status(200).json(successMessage("folders fetched",folders));
        
    }catch(error){
        console.log(`error: ${error}`);
        res.status(500).json(serverError());
    }
});

export default router