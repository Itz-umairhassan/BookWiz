import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import testRoutes from './routes/testRoutes.js'
import fileRoutes from "./routes/fileRoutes.js"
import folderRoutes from "./routes/folderRoutes.js"
import notesRoutes from "./routes/notesRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

import cors from 'cors'
import cookieParser from 'cookie-parser';
import {makeConecction} from './controllers/connetionController.js' 

const PORT_NUMBER = process.env.PORT || 3001

dotenv.config()
const app=express();

app.use(express.json())
app.use(cors())
app.use(cookieParser())

// make db connection
makeConecction()

app.use(express.json())
app.use(cors());

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use("/api/test" , testRoutes);
app.use("/api/file" ,fileRoutes);
app.use("/api/folder" , folderRoutes);
app.use('/api/notes',notesRoutes);
app.use('/api/chat' ,chatRoutes);

app.listen(PORT_NUMBER ,"0.0.0.0", ()=>{
    console.log(`App is listening at PORT = ${PORT_NUMBER}`)
})