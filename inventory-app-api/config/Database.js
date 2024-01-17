import { Sequelize } from "sequelize"

const db = new Sequelize('inventory', 'root', '', {
    host: 'localhost',
    dialect: 'postgres'
})

export default db