import {Router} from 'express'
import { getUserProfile, googelAuth, login, logout, signup, updateUserDetails } from '../controllers/user.controller.js';
import { JWTAuthenticate } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';
const router = Router();

router.post('/signup', signup)
router.post('/google-auth', googelAuth)
router.post('/login', login)
router.post('/logout', JWTAuthenticate, logout)
router.post('/update-profile', JWTAuthenticate, upload.single('avatar'), updateUserDetails)
router.get('/get-profile', JWTAuthenticate, getUserProfile)

export default router