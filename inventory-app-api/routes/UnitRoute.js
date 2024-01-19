import express from "express"
import { 
    getUnits, 
    getUnitById, 
    createUnit, 
    updateUnit, 
    deleteUnit 
} from "../controllers/Units.js"
import { verifyUser, officeStaffOnly } from "../middleware/AuthUser.js"

const router = express.Router()

router.get('/units', verifyUser, getUnits)
router.get('/units/:id', verifyUser, getUnitById)
router.post('/units', verifyUser, officeStaffOnly, createUnit)
router.patch('/units/:id', verifyUser, officeStaffOnly, updateUnit)
router.delete('/units/:id', verifyUser, officeStaffOnly, deleteUnit)

export default router