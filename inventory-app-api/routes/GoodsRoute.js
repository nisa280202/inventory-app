import express from "express"
import { 
    getGoods, 
    getGoodsById, 
    createGoods, 
    updateGoods, 
    deleteGoods 
} from "../controllers/Goods.js"

const router = express.Router()

router.get('/goods', getGoods)
router.get('/goods/:id', getGoodsById)
router.post('/goods', createGoods)
router.patch('/goods/:id', updateGoods)
router.delete('/goods/:id', deleteGoods)

export default router