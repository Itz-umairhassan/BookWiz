import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import testRoutes from './routes/testRoutes.js'
import fileRoutes from "./routes/fileRoutes.js"
import cors from 'cors'
import cookieParser from 'cookie-parser';
import {makeConecction} from './controllers/connetionController.js' 

const PORT_NUMBER = 3001

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

app.listen(PORT_NUMBER , ()=>{
    console.log(`App is listening at PORT = ${PORT_NUMBER}`)
})