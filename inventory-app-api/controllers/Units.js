import Units from "../models/UnitModel.js"
import { Op } from "sequelize"

export const getUnits = async (req, res) => {
    try {
        const response = await Units.findAll({
            attributes: ['id', 'uuid', 'name']
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getUnitById = async (req, res) => {
    try {
        const response = await Units.findOne({
            attributes: ['uuid', 'name'],
            where: {
                uuid: req.params.id
            }
        })

        if (!response) return res.status(404).json({ msg: "Unit tidak ditemukan" })

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createUnit = async (req, res) => {
    const { name } = req.body

    try {
        const existingUnit = await Units.findOne({
            where: {
                name: name
            }
        });

        if (existingUnit) {
            return res.status(400).json({ msg: "Unit dengan nama tersebut sudah ada" });
        }

        await Units.create({
            name: name
        })
        res.status(201).json({ msg: "Unit berhasil dibuat" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const updateUnit = async (req, res) => {
    const unitId = req.params.id
    const { name } = req.body

    const unit = await Units.findOne({
        where: {
            uuid: unitId
        }
    })

    if (!unit) return res.status(404).json({ msg: "Unit tidak ditemukan" })

    try {
        const existingUnit = await Units.findOne({
            where: {
                name: name,
                uuid: { [Op.not]: unitId }
            }
        })

        if (existingUnit) {
            return res.status(400).json({ msg: "Unit dengan nama tersebut sudah ada" })
        }

        await Units.update({
            name: name
        }, {
            where: {
                uuid: unitId
            }
        })
        res.status(200).json({ msg: "Unit Updated" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const deleteUnit = async (req, res) => {
    const unit = await Units.findOne({
        where: {
            uuid: req.params.id
        }
    })

    if (!unit) return res.status(404).json({ msg: "Unit tidak ditemukan" })

    try {
        await Units.destroy({
            where: {
                id: unit.id
            }
        })
        res.status(200).json({ msg: "Unit Deleted" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}