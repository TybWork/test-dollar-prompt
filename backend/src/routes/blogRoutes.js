import express from 'express'
import { createBlog, deleteBlog, getAllBlog, getFilteredBlogs, updateBlog } from '../controllers/blog.controller.js'
import multerFunc from '../middlewares/multer.middle.js'
import { isAdmin, isAdminOrSuperAdmin } from '../middlewares/verifyToken.middle.js'
// import { getUserId } from '../middlewares/verifyToken.middle.js'
export const blogRoutes = express.Router()

// blogRoutes.post('/create', multerFunc, isAdmin, isSuperAdmin, createBlog)
blogRoutes.post('/create', multerFunc, isAdminOrSuperAdmin, createBlog)
blogRoutes.delete('/delete/:id', isAdminOrSuperAdmin, deleteBlog)
blogRoutes.get('/get', getAllBlog)
blogRoutes.put('/update/:id', isAdmin, updateBlog)
blogRoutes.get('/filter', getFilteredBlogs)