import { Sequelize } from "sequelize"

const db = new Sequelize('inventory', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
})

export default db