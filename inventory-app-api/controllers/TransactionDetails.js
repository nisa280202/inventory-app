import TransactionDetails from "../models/TransactionDetailModel.js"
import Transactions from "../models/TransactionModel.js"
import Goods from "../models/GoodsModel.js"
import Users from "../models/UserModel.js"

export const getTransactionDetails = async (req, res) => {
    try {
        const transactionDetail = await TransactionDetails.findAll({
            include: [Goods, Transactions, Users],
            attributes: ['uuid', 'stock']
        })
        res.status(200).json(transactionDetail)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getTransactionDetailById = async (req, res) => {
    try {
        const transactionDetail = await TransactionDetails.findOne({
            where: {
                uuid: req.params.id,
            },
            include: [Goods, Transactions, Users],
            attributes: ['uuid', 'stock']
        })
    
        if (!transactionDetail) return res.status(404).json({ msg: "Detail transaction tidak ditemukan" })
    
        res.status(200).json(transactionDetail)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getTransactionDetailsByTransactionId = async (req, res) => {
    const { transactionId } = req.params;

    try {
        const transactionDetails = await TransactionDetails.findAll({
            where: {
                '$transaction.uuid$': transactionId,
            },
            include: [Goods, Transactions, Users],
            attributes: ['uuid', 'stock'],
        });

        if (!transactionDetails || transactionDetails.length === 0) {
            return res.status(404).json({ msg: "Detail transactions tidak ditemukan" });
        }

        res.status(200).json(transactionDetails);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createTransactionDetail = async (req, res) => {
    const { stock, goodsId, transactionId } = req.body

    try {
        const transaction = await Transactions.findOne({
            where: {
                id: transactionId
            }
        })

        if (!transaction) return res.status(404).json({ msg: "Transaction tidak ditemukan" })

        await TransactionDetails.create({
            stock: stock,
            goodsId: goodsId,
            transactionId: transactionId,
            userId: req.userId
        })

        // Update stok di tabel goods berdasarkan type transaksi
        const updatedStock = transaction.type == 0 ? stock : -stock

        await Goods.update({
            stock: Goods.sequelize.literal(`stock + ${updatedStock}`)
        }, {
            where: {
                id: goodsId
            }
        })

        res.status(201).json({ msg: "Detail transaction berhasil dibuat" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const updateTransactionDetail = async (req, res) => {
    const transactionDetail = await TransactionDetails.findOne({
        where: {
            uuid: req.params.id
        }
    })    
    
    if (!transactionDetail) return res.status(404).json({ msg: "Detail transaction tidak ditemukan" })
    
    const { stock, goodsId, transactionId } = req.body

    const transaction = await Transactions.findOne({
        where: {
            id: transactionId
        }
    })

    if (!transaction) {
        return res.status(404).json({ msg: "Transaction tidak ditemukan" })
    }

    try {
        await TransactionDetails.update({
            stock: stock,
            goodsId: goodsId,
            transactionId: transactionId,
            userId: req.userId
        }, {
            where: {
                id: transactionDetail.id
            }
        })

        // Update stok di tabel goods berdasarkan perubahan type transaksi
        const updatedStock = transaction.type === 0 ? stock - transactionDetail.stock : transactionDetail.stock - stock

        await Goods.update({
            stock: Goods.sequelize.literal(`stock + ${updatedStock}`)
        }, {
            where: {
                id: goodsId
            }
        })

        res.status(200).json({ msg: "Detail transaction updated" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const deleteTransactionDetail = async (req, res) => {
    const transactionDetail = await TransactionDetails.findOne({
        where: {
            uuid: req.params.id
        },
        include: Transactions
    })

    if (!transactionDetail) return res.status(404).json({ msg: "Detail transaction tidak ditemukan" })

    try {
        let updatedStock = 0;

        if (transactionDetail.transaction.type === 0) {
            // Jika tipe transaksi adalah 0 (in), maka kurangi stok
            updatedStock = -transactionDetail.stock;
        } else {
            // Jika tipe transaksi bukan 0 (out), maka tambahkan stok
            updatedStock = transactionDetail.stock;
        }

        await Goods.update({
            stock: Goods.sequelize.literal(`stock + ${updatedStock}`),
        }, {
            where: {
                id: transactionDetail.goodsId
            }
        })

        await TransactionDetails.destroy({
            where: {
                id: transactionDetail.id
            }
        })

        res.status(200).json({ msg: "Detail transaction deleted" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
