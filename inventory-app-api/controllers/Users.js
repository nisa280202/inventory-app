import Users from "../models/UserModel.js"
import argon2 from "argon2"
import validator from "validator"

export const getUsers = async (req, res) => {
    try {
        const totalUsers = await Users.count()

        const user = await Users.findAll({
            attributes: ['id', 'uuid', 'name', 'email', 'role', 'images']
        })

        res.status(200).json({
            totalUsers,
            user
        })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role', 'images'],
            where: {
                uuid: req.params.id
            }
        })

        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" })

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createUser = async (req, res) => {
    const { name, email, password, confPassword, role } = req.body
    
    if (!validator.isEmail(email)) {
        return res.status(400).json({ msg: "Invalid email format" });
    }

    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" })
    const hashPassword = await argon2.hash(password)
    
    try {
        let imagePath = ""
        if (req.file) imagePath = req.normalizedImagePath

        await Users.create({
            name: name, 
            email: email,
            password: hashPassword,
            role: role,
            images: imagePath || null
        })
        res.status(201).json({ msg: "User berhasil ditambahkan" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const updateUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    })

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" })
    const { name, email, password, confPassword, role } = req.body
    let hashPassword

    if (!validator.isEmail(email)) {
        return res.status(400).json({ msg: "Invalid email format" });
    }

    if (password === "" || password === null || password == undefined) {
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password)
    }

    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" })

    try {
        let imagePath = ""
        if (req.file) imagePath = req.normalizedImagePath

        await Users.update({
            name: name, 
            email: email,
            password: hashPassword,
            role: role,
            images: imagePath || null
        }, {
            where: {
                id: user.id
            }
        })

        res.status(200).json({ msg: "User Updated" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    })

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" })

    try {
        await Users.destroy({
            where: {
                id: user.id
            }
        })
        res.status(200).json({ msg: "User Deleted" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}