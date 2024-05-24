import Folder from "../models/folderModel.js";
import File from "../models/fileModel.js";
import mongodb from "mongodb";

export const folderCreation = async (req , res) =>{
    const {userId , folderName , status} = req.body;

    try{
        const userObjId = new uid(userId);
        const user = await User.findById(userObjId);
        
        if(!user){
            res.status(404).json({
                "message":"user not found"
            })
            return;
        }

        const folder = new Folder({
            folderName:folderName,
            owner:userObjId,
            _status:status
        })

        const newFolder = await folder.save();

        res.status(200).json({
            "message" :"folder created successfuly",
            "folder":newFolder
        })

    }catch(error){
        console.log(`error: ${error}`);
        res.status(500).json({
            "message" : "Internal server error"
        })
    }
    
}