import express from "express"
import { 
    getUnits, 
    getUnitById, 
    createUnit, 
    updateUnit, 
    deleteUnit 
} from "../controllers/Units.js"

const router = express.Router()

router.get('/units', getUnits)
router.get('/units/:id', getUnitById)
router.post('/units', createUnit)
router.patch('/units/:id', updateUnit)
router.delete('/units/:id', deleteUnit)

export default router