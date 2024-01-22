import express from "express"
import { 
    getTransactionDetails, 
    getTransactionDetailById, 
    getTransactionDetailsByTransactionId,
    createTransactionDetail, 
    updateTransactionDetail, 
    deleteTransactionDetail 
} from "../controllers/TransactionDetails.js"
import { verifyUser, warehouseStaffOnly } from "../middleware/AuthUser.js"

const router = express.Router()

router.get('/transaction-details', verifyUser, getTransactionDetails)
router.get('/transaction-details/:id', verifyUser, getTransactionDetailById)
router.get('/transactions-details/:transactionId', verifyUser, getTransactionDetailsByTransactionId)
router.post('/transaction-details', verifyUser, warehouseStaffOnly, createTransactionDetail)
router.patch('/transaction-details/:id', verifyUser, warehouseStaffOnly, updateTransactionDetail)
router.delete('/transaction-details/:id', verifyUser, warehouseStaffOnly, deleteTransactionDetail)

export default router