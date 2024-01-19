import express from "express"
import { 
    getCategories, 
    getCategoryById, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} from "../controllers/Categories.js"
import { verifyUser, officeStaffOnly } from "../middleware/AuthUser.js"

const router = express.Router()

router.get('/categories', verifyUser, getCategories)
router.get('/categories/:id', verifyUser, getCategoryById)
router.post('/categories', verifyUser, officeStaffOnly, createCategory)
router.patch('/categories/:id', verifyUser, officeStaffOnly, updateCategory)
router.delete('/categories/:id', verifyUser, officeStaffOnly, deleteCategory)

export default router