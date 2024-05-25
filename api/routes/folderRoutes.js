import express from "express"
import {validateUser} from "../middleware/authMiddleWare.js"
import {folderCreation , getAllFiles , removeFolder} from "../controllers/folderController.js";

const router = express.Router();
router.use(validateUser);

router.post('/create' , folderCreation);
router.get('/getFiles' , getAllFiles);
router.post('/remove' , removeFolder);

export default router