import Categories from "../models/CategoryModel.js"
import { Op } from "sequelize"

export const getCategories = async (req, res) => {
    try {
        const response = await Categories.findAll({
            attributes: ['uuid', 'name']
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const response = await Categories.findOne({
            attributes: ['uuid', 'name'],
            where: {
                uuid: req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createCategory = async (req, res) => {
    const { name } = req.body
    
    try {
        const existingCategory = await Categories.findOne({
            where: {
                name: name
            }
        });

        if (existingCategory) {
            return res.status(400).json({ msg: "Category dengan nama tersebut sudah ada" });
        }

        await Categories.create({
            name: name
        })
        res.status(201).json({ msg: "Category berhasil dibuat" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const updateCategory = async (req, res) => {
    const categoryId = req.params.id
    const { name } = req.body

    const category = await Categories.findOne({
        where: {
            uuid: categoryId
        }
    })

    if (!category) return res.status(404).json({ msg: "Category tidak ditemukan" })

    try {
        const existingCategory = await Categories.findOne({
            where: {
                name: name,
                uuid: { [Op.not]: categoryId }
            }
        })

        if (existingCategory) {
            return res.status(400).json({ msg: "Category dengan nama tersebut sudah ada" })
        }

        await Categories.update({
            name: name
        }, {
            where: {
                uuid: categoryId
            }
        })
        res.status(200).json({ msg: "Category Updated" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const deleteCategory = async (req, res) => {
    const category = await Categories.findOne({
        where: {
            uuid: req.params.id
        }
    })

    if (!category) return res.status(404).json({ msg: "Category tidak ditemukan" })

    try {
        await Categories.destroy({
            where: {
                id: category.id
            }
        })
        res.status(200).json({ msg: "Category Deleted" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}