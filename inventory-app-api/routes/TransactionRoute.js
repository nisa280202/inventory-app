import express from "express"
import { 
    getTransactions, 
    getTransactionById, 
    createTransaction, 
    updateTransaction, 
    deleteTransaction 
} from "../controllers/Transactions.js"
import { verifyUser, officeStaffOnly } from "../middleware/AuthUser.js"

const router = express.Router()

router.get('/transactions', verifyUser, getTransactions)
router.get('/transactions/:id', verifyUser, getTransactionById)
router.post('/transactions', verifyUser, officeStaffOnly, createTransaction)
router.patch('/transactions/:id', verifyUser, officeStaffOnly, updateTransaction)
router.delete('/transactions/:id', verifyUser, officeStaffOnly, deleteTransaction)

export default router