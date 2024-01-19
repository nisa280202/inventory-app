import Goods from "../models/GoodsModel.js"
import Types from "../models/TypeModel.js"
import Categories from "../models/CategoryModel.js"
import Units from "../models/UnitModel.js"

export const getGoods = async (req, res) => {
    try {
        const response = await Goods.findAll({
            include: [Types, Categories, Units],
            attributes: ['uuid', 'name', 'images', 'price', 'stock']
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getGoodsById = async (req, res) => {
    try {
        const response = await Goods.findOne({
            where: {
                uuid: req.params.id,
            },
            include: [Types, Categories, Units],
            attributes: ['uuid', 'name', 'images', 'price', 'stock']
        })
    
        if (!response) return res.status(404).json({ msg: "Goods tidak ditemukan" })
    
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createGoods = async (req, res) => {
    const { name, images, price, stock, typeId, categoryId, unitId } = req.body

    try {
        await Goods.create({
            name: name,
            images: images,
            price: price,
            stock: stock || 0, // Set stock default menjadi 0
            typeId: typeId,
            categoryId: categoryId,
            unitId: unitId
        })

        res.status(201).json({ msg: "Goods berhasil dibuat" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const updateGoods = async (req, res) => {
    const goods = await Goods.findOne({
        where: {
            uuid: req.params.id
        },
    })

    if (!goods) return res.status(404).json({ msg: "Goods tidak ditemukan" })

    const { name, images, price, stock, typeId, categoryId, unitId } = req.body
    
    try {
        await Goods.update({
            name: name,
            images: images,
            price: price,
            stock: stock,
            typeId: typeId,
            categoryId: categoryId,
            unitId: unitId,
        }, {
            where: {
                id: goods.id,
            }
        })
    
        res.status(200).json({ msg: "Goods updated" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const deleteGoods = async (req, res) => {
    const goods = await Goods.findOne({
        where: {
            uuid: req.params.id
        },
    })

    if (!goods) return res.status(404).json({ msg: "Goods tidak ditemukan" })

    try {
        await Goods.destroy({
            where: {
                id: goods.id
            }
        })
    
        res.status(200).json({ msg: "Goods deleted" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}