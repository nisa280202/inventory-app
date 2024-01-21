import express from "express"
import { Login, Me, Logout } from "../controllers/Auth.js"
import { verifyUser } from "../middleware/AuthUser.js"

const router = express.Router()

router.get('/me', verifyUser, Me)
router.post('/login', Login)
router.delete('/logout', Logout)

export default router