import express from "express"
import {folderExists, userExists, userFolderAuth, validateUser} from "../middleware/authMiddleWare.js"
import {folderCreation , getAllFiles , removeFolder, editFolder} from "../controllers/folderController.js";
const router = express.Router();

router.use(validateUser);
// router.use(userExists);


router.post('/create' , folderCreation);
router.get('/getFiles/:folderId' ,folderExists, getAllFiles);
// router.post('/remove' ,folderExists,removeFolder);
router.post('/remove/:folderId' ,folderExists,userFolderAuth, removeFolder);
router.post('/editFolder' ,folderExists,userFolderAuth, editFolder);

export default router