import Users from "../models/UserModel.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({msg: "Mohon login ke akun Anda!"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        const user = await Users.findOne({
            where: {
                uuid: decoded.uuid
            }
        })
        if (!user) return res.status(404).json({msg: "User tidak ditemukan"})
    
        req.user = user
        req.userId = user.id
        req.role = user.role
        next()
    } catch (error) {
        console.error("Error in verifyUser middleware:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const superAdminOnly = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({msg: "Mohon login ke akun Anda!"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(403).json({ msg: "Invalid token" });

        const user = await Users.findOne({
            where: {
                uuid: decoded.uuid
            }
        })
        if (!user) return res.status(404).json({msg: "User tidak ditemukan"})
        if (user.role !== 0) return res.status(403).json({msg: "Akses terlarang"})
        next()
    } catch (error) {
        console.error("Error in superAdminOnly middleware:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const officeStaffOnly = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({msg: "Mohon login ke akun Anda!"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(403).json({ msg: "Invalid token" });

        const user = await Users.findOne({
            where: {
                uuid: decoded.uuid
            }
        })
        if (!user) return res.status(404).json({msg: "User tidak ditemukan"})
        if (user.role !== 1) return res.status(403).json({msg: "Akses terlarang"})
        next()
    } catch (error) {
        console.error("Error in officeStaffOnly middleware:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const warehouseStaffOnly = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({msg: "Mohon login ke akun Anda!"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(403).json({ msg: "Invalid token" });

        const user = await Users.findOne({
            where: {
                uuid: decoded.uuid
            }
        })
        if (!user) return res.status(404).json({msg: "User tidak ditemukan"})
        if (user.role !== 2) return res.status(403).json({msg: "Akses terlarang"})
        next()
    } catch (error) {
        console.error("Error in warehouseStaffOnly middleware:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}