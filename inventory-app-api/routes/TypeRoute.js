import express from "express"
import { 
    getTypes, 
    getTypeById, 
    createType, 
    updateType, 
    deleteType 
} from "../controllers/Types.js"
import { verifyUser, officeStaffOnly } from "../middleware/AuthUser.js"

const router = express.Router()

router.get('/types', verifyUser, getTypes)
router.get('/types/:id', verifyUser, getTypeById)
router.post('/types', verifyUser, officeStaffOnly, createType)
router.patch('/types/:id', verifyUser, officeStaffOnly, updateType)
router.delete('/types/:id', verifyUser, officeStaffOnly, deleteType)

export default router