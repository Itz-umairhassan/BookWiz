import express from "express"
import { testInsertion } from "../controllers/testingController.js"
import { testSelect } from "../controllers/testingController.js";
const router = express.Router()

router.post('/insertion' , testInsertion);
router.post('/select' , testSelect);
export default router