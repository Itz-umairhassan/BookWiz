import express from 'express';
import { validateUser } from '../middleware/authMiddleWare.js';
import mongodb from 'mongodb';
import Notes from '../models/notesModel.js';
import { serverError,successMessage,errorMessage } from '../helpers/helperFuncs.js';

const router = express.Router();

router.use(validateUser);

router.post('/create', async (req, res) => {
    try{
        const {name ,user_content, model_content } = req.body;
     
        const userId = req.userId;
        const newNote = new Notes({
            name,
            user_content,
            model_content,
            _user:new mongodb.ObjectId(userId)
        });

        const storedNote = await newNote.save();
        res.status(200).json(successMessage("Note created successfully",storedNote));
    }catch(error){
        console.log(`error : ${error}`);
        res.status(500).json(serverError());
    }
});

router.post('/update',async (req,res)=>{
    try{
        const {name ,user_content, model_content , noteId} = req.body;
        await Notes.findByIdAndUpdate(new mongodb.ObjectId(noteId),{
            name,
            user_content,
            model_content
        });

        const resp = await Notes.findById(new mongodb.ObjectId(noteId));
        res.status(200).json(successMessage("Note updated successfully",[resp]));
    }catch(error){
        console.log(`error = ${error}`);
        res.status(500).json(serverError());
    }
})

router.post("/fecthAll",async (req,res)=>{
    try{
        const userId = req.userId;
        const notes = await Notes.find({_user:new mongodb.ObjectId(userId)});
        res.status(200).json(successMessage("Notes fetched successfully",notes));
    }catch(error){
        console.log(`error = ${error}`);
        res.status(500).json(serverError());
    }  
});

router.delete('/:noteId',async (req,res)=>{
    try{
        const noteId = req.params.noteId;
        const userId = req.userId;
        console.log(`noteId = ${noteId}`);
        const note = await Notes.findById(noteId);
        if(!note){
            return res.status(404).json(errorMessage("Note not found"));
        }

        if(note._user.toString() !== userId){
            return res.status(403).json(errorMessage("Unauthorized"));
        }

        await Notes.findByIdAndDelete(noteId);
        res.status(200).json(successMessage("Note deleted successfully"));
    }catch(error){
        console.log(`error = ${error}`);
        res.status(500).json(serverError());
    }
});
export default router;