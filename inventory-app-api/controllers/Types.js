import Types from "../models/TypeModel.js"
import { Op } from "sequelize"

export const getTypes = async (req, res) => {
    try {
        const response = await Types.findAll({
            attributes: ['uuid', 'name']
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getTypeById = async (req, res) => {
    try {
        const response = await Types.findOne({
            attributes: ['uuid', 'name'],
            where: {
                uuid: req.params.id
            }
        })

        if (!response) return res.status(404).json({ msg: "Type tidak ditemukan" })

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createType = async (req, res) => {
    const { name } = req.body

    try {
        const existingType = await Types.findOne({
            where: {
                name: name
            }
        });

        if (existingType) {
            return res.status(400).json({ msg: "Type dengan nama tersebut sudah ada" });
        }

        await Types.create({
            name: name
        })
        res.status(201).json({ msg: "Type berhasil dibuat" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const updateType = async (req, res) => {
    const typeId = req.params.id
    const { name } = req.body

    const type = await Types.findOne({
        where: {
            uuid: typeId
        }
    })

    if (!type) return res.status(404).json({ msg: "Type tidak ditemukan" })

    try {
        const existingType = await Types.findOne({
            where: {
                name: name,
                uuid: { [Op.not]: typeId }
            }
        })

        if (existingType) {
            return res.status(400).json({ msg: "Type dengan nama tersebut sudah ada" })
        }

        await Types.update({
            name: name
        }, {
            where: {
                uuid: typeId
            }
        })
        res.status(200).json({ msg: "Type Updated" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const deleteType = async (req, res) => {
    const type = await Types.findOne({
        where: {
            uuid: req.params.id
        }
    })

    if (!type) return res.status(404).json({ msg: "Type tidak ditemukan" })

    try {
        await Types.destroy({
            where: {
                id: type.id
            }
        })
        res.status(200).json({ msg: "Type Deleted" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}