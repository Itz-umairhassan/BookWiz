import express from 'express'
import { signup, updateProfile } from '../controllers/authController.js';
import { signin } from '../controllers/authController.js';


const router=express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.put('/profile/:id',updateProfile)

export default router;