import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

// GET USER PROFILE
router.get('/profile', userAuth, getUserProfile);

// UPDATE USER PROFILE
router.put('/profile', userAuth, updateUserProfile);

export default router;
