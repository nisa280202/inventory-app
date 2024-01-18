import express from "express"
import { 
    getTransactionDetails, 
    getTransactionDetailById, 
    createTransactionDetail, 
    updateTransactionDetail, 
    deleteTransactionDetail 
} from "../controllers/TransactionDetails.js"

const router = express.Router()

router.get('/transaction_details', getTransactionDetails)
router.get('/transaction_details/:id', getTransactionDetailById)
router.post('/transaction_details', createTransactionDetail)
router.patch('/transaction_details/:id', updateTransactionDetail)
router.delete('/transaction_details/:id', deleteTransactionDetail)

export default router