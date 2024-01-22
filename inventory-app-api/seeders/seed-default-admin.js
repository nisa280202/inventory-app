import argon2 from 'argon2'
import db from '../config/Database.js'
import Users from '../models/UserModel.js'

const seedDefaultAdmin = async () => {
    try {
        const existingAdmin = await Users.findOne({
            where: { role: 0 }
        })

        if (!existingAdmin) {
            const hashedPassword = await argon2.hash('superadmin123')

            await Users.create({
                name: 'Super Admin',
                email: 'superadmin@gmail.com',
                password: hashedPassword,
                role: 0
            })

            console.log('Default super admin berhasil ditambahkan.')
        } else {
            console.log('Super admin sudah ada.')
        }
    } catch (error) {
        console.error('Error saat menambahkan default super admin:', error)
    } finally {
        await db.close()
    }
}

seedDefaultAdmin()
