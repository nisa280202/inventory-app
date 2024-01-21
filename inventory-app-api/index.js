import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import dotenv from "dotenv"
// import db from "./config/Database.js"
import UserRoute from "./routes/UserRoute.js"
import CategoryRoute from "./routes/CategoryRoute.js"
import UnitRoute from "./routes/UnitRoute.js"
import TypeRoute from "./routes/TypeRoute.js"
import GoodsRoute from "./routes/GoodsRoute.js"
import TransactionRoute from "./routes/TransactionRoute.js"
import TransactionDetailRoute from "./routes/TransactionDetailRoute.js"
import AuthRoute from "./routes/AuthRoute.js"

dotenv.config()

const app = express()

// (async() => {
//     await db.sync()
// })()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

app.use(express.json())

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static('uploads'))

app.use(UserRoute)
app.use(CategoryRoute)
app.use(UnitRoute)
app.use(TypeRoute)
app.use(GoodsRoute)
app.use(TransactionRoute)
app.use(TransactionDetailRoute)
app.use(AuthRoute)

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...')
})