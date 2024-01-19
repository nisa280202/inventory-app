import express from "express"
import { 
    getGoods, 
    getGoodsById, 
    createGoods, 
    updateGoods, 
    deleteGoods 
} from "../controllers/Goods.js"
import { verifyUser, officeStaffOnly } from "../middleware/AuthUser.js"

const router = express.Router()

router.get('/goods', verifyUser, getGoods)
router.get('/goods/:id', verifyUser, getGoodsById)
router.post('/goods', verifyUser, officeStaffOnly, createGoods)
router.patch('/goods/:id', verifyUser, officeStaffOnly, updateGoods)
router.delete('/goods/:id', verifyUser, officeStaffOnly, deleteGoods)

export default router