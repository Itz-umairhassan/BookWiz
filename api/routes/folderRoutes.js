import express from "express"
import {folderExists, userExists, userFolderAuth, validateUser} from "../middleware/authMiddleWare.js"
import {folderCreation , getAllFiles , removeFolder} from "../controllers/folderController.js";

const router = express.Router();

router.use(validateUser);
router.use(userExists);


router.post('/create' , folderCreation);
router.get('/getFiles/:folderId' ,folderExists, userFolderAuth, getAllFiles);
router.post('/remove' ,folderExists,userFolderAuth, removeFolder);

export default router