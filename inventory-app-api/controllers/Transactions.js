import Transactions from "../models/TransactionModel.js"
import Users from "../models/UserModel.js"

export const getTransactions = async (req, res) => {
    try {
        const transaction = await Transactions.findAll({
            attributes: ['id', 'uuid', 'type', 'date', 'sender', 'recipient', 'userId']
        })
        res.status(200).json(transaction)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transactions.findOne({
            where: {
                uuid: req.params.id
            },
            include: Users
        })

        if (!transaction) return res.status(404).json({ msg: "Transaction tidak ditemukan" })

        res.status(200).json(transaction)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createTransaction = async (req, res) => {
    const { type, date, sender, recipient } = req.body

    try {
        await Transactions.create({
            type: type,
            date: date,
            sender: sender,
            recipient: recipient,
            userId: req.userId
        })

        res.status(201).json({ msg: "Transaction berhasil dibuat" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const updateTransaction = async (req, res) => {
    const transaction = await Transactions.findOne({
        where: {
            uuid: req.params.id
        },
    })
    
    if (!transaction) return res.status(404).json({ msg: "Transaction tidak ditemukan" })
    
    const { type, date, sender, recipient } = req.body
    
    try {
        await Transactions.update({
            type: type,
            date: date,
            sender: sender,
            recipient: recipient,
            userId: req.userId,
        }, {
            where: {
                id: transaction.id,
            }
        })
    
        res.status(200).json({ msg: "Transaction updated" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const deleteTransaction = async (req, res) => {
    const transaction = await Transactions.findOne({
        where: {
            uuid: req.params.id
        },
    })
    
    if (!transaction) return res.status(404).json({ msg: "Transaction tidak ditemukan" })

    try {
        await Transactions.destroy({
            where: {
                id: transaction.id
            }
        })
    
        res.status(200).json({ msg: "Transaction deleted" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}