import { Sequelize } from "sequelize"
import db from "../config/Database"
import Goods from "./GoodsModel"
import Transactions from "./TransactionModel"
import Users from "./UserModel"

const { DataTypes } = Sequelize

const TransactionDetails = db.define('transaction_details', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    goodsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
})

Goods.hasMany(TransactionDetails)
TransactionDetails.belongsTo(Goods, {foreignKey: 'goodsId'})

Transactions.hasMany(TransactionDetails)
TransactionDetails.belongsTo(Transactions, {foreignKey: 'transactionId'})

Users.hasMany(TransactionDetails)
TransactionDetails.belongsTo(Users, {foreignKey: 'userId'})

export default TransactionDetails