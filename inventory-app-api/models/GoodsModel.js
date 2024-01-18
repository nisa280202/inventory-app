import { Sequelize } from "sequelize"
import db from "../config/Database.js"
import Types from "./TypeModel.js"
import Categories from "./CategoryModel.js"
import Units from "./UnitModel.js"

const { DataTypes } = Sequelize

const Goods = db.define('goods', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    images: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.INTEGER,
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
    typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    unitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
})

Types.hasMany(Goods)
Goods.belongsTo(Types, {foreignKey: 'typeId'})

Categories.hasMany(Goods)
Goods.belongsTo(Categories, {foreignKey: 'categoryId'})

Units.hasMany(Goods)
Goods.belongsTo(Units, {foreignKey: 'unitId'})

export default Goods