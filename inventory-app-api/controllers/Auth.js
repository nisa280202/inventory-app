import Users from "../models/UserModel.js"
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import validator from "validator"
import dotenv from "dotenv"

dotenv.config()

export const Login = async (req, res) => {
    if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({ msg: "Invalid email format!" });
    }

    const user = await Users.findOne({
        where: {
            email: req.body.email
        }
    })
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"})

    const match = await argon2.verify(user.password, req.body.password)
    if (!match) return res.status(400).json({msg: "Wrong Password"})

    const token = jwt.sign({
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        role: user.role,
        images: user.images
    }, process.env.JWT_SECRET)

    res.status(200).json({ token, user })
}

export const Me = async (req, res) => {
    if (!req.user.uuid) {
        return res.status(401).json({msg: "Mohon login ke akun Anda!"})
    }

    const user = await Users.findOne({
        attributes: ['uuid', 'name', 'email', 'role', 'images'],
        where: {
            uuid: req.user.uuid
        }
    })
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"})

    res.status(200).json(user)
}

export const Logout = (req, res) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(400).json({ msg: "Token tidak ditemukan" })
    }

    delete req.headers["authorization"]

    res.status(200).json({ msg: "Anda telah logout" })
} 