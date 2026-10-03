import {Router} from 'express'
import { deleteBlog, getAllBlogs, getAllBlogsByUserID, getBlogByCategoryId, getBlogById, getSearchedBlogs, postBlog, updateBlog } from '../controllers/blog.controller.js'
import { upload } from '../middleware/multer.middleware.js'
import { JWTAuthenticate } from '../middleware/auth.middleware.js'

const router = Router();

// unprotected routes
router.get('/get-all-blogs', getAllBlogs)
router.get('/get-blogs-by-category/:categoryId', getBlogByCategoryId)

// protected routes
router.use(JWTAuthenticate)

router.post('/post', upload.single("featured-image"), postBlog)
router.put('/update/:id', upload.single("featured-image"), updateBlog)
router.delete('/delete/:id', deleteBlog)
router.get('/get/:id', getBlogById)
router.get('/get-user-blogs/:userId', getAllBlogsByUserID)
router.get('/search-blogs', getSearchedBlogs)

export default router