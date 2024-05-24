import express from "express"
import mongodb from "mongodb"

import {folderCreation} from "../controllers/folderController.js";

const router = express.Router();
const uid = mongodb.ObjectId;

router.post('/create' , folderCreation)

export default router