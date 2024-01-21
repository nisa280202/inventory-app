import express from "express"
import { 
    getGoods, 
    getGoodsById, 
    createGoods, 
    updateGoods, 
    deleteGoods,
    getGoodsStats 
} from "../controllers/Goods.js"
import { verifyUser, officeStaffOnly } from "../middleware/AuthUser.js"
import upload from "../middleware/Upload.js"

const router = express.Router()

router.get('/goods', verifyUser, getGoods)
router.get('/goods/stats', verifyUser, getGoodsStats)
router.get('/goods/:id', verifyUser, getGoodsById)
router.post('/goods', verifyUser, officeStaffOnly, upload.single('images'), createGoods)
router.patch('/goods/:id', verifyUser, officeStaffOnly, upload.single('images'), updateGoods)
router.delete('/goods/:id', verifyUser, officeStaffOnly, deleteGoods)

export default router