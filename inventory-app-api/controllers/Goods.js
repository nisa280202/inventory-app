import Goods from "../models/GoodsModel.js"
import Types from "../models/TypeModel.js"
import Categories from "../models/CategoryModel.js"
import Units from "../models/UnitModel.js"

export const getGoods = async (req, res) => {
    try {
        const goods = await Goods.findAll({
            include: [Types, Categories, Units],
            attributes: ['id', 'uuid', 'name', 'images', 'price', 'stock']
        })
        res.status(200).json(goods)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getGoodsStats = async (req, res) => {
    try {
        const totalGoods = await Goods.count()

        const topStockGoods = await Goods.findAll({
            order: [['stock', 'DESC']],
            limit: 5,
            attributes: ['uuid', 'name', 'stock']
        })

        const bottomStockGoods = await Goods.findAll({
            order: [['stock', 'ASC']],
            limit: 5,
            attributes: ['uuid', 'name', 'stock']
        })

        res.status(200).json({
            totalGoods,
            topStockGoods,
            bottomStockGoods
        })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getGoodsById = async (req, res) => {
    try {
        const goods = await Goods.findOne({
            where: {
                uuid: req.params.id,
            },
            include: [Types, Categories, Units],
            attributes: ['uuid', 'name', 'images', 'price', 'stock']
        })
    
        if (!goods) return res.status(404).json({ msg: "Goods tidak ditemukan" })
    
        res.status(200).json(goods)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createGoods = async (req, res) => {
    const { name, price, stock, typeId, categoryId, unitId } = req.body

    try {
        let imagePath = ""
        if (req.file) imagePath = req.normalizedImagePath

        await Goods.create({
            name: name,
            images: imagePath || null,
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

    const { name, price, stock, typeId, categoryId, unitId } = req.body
    
    try {
        let imagePath = ""
        if (req.file) imagePath = req.normalizedImagePath

        await Goods.update({
            name: name,
            images: imagePath || null,
            price: price,
            stock: stock || null,
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