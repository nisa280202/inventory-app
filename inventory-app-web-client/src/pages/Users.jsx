import React, { useState } from 'react'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import UsersTable from '../components/table/UsersTable'
import AddUser from '../components/modal/AddUser'
import axios from 'axios'
import Swal from 'sweetalert2'

const Users = () => {
    const [openAdd, setOpenAdd] = useState(false)

    const handleAdd = async (user) => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            await axios.post('http://localhost:5000/users', user, config)

            Swal.fire({
                icon: 'success',
                title: 'Add Success',
                text: 'New user has been successfully added!',
                timer: 2000,
                timerProgressBar: true
            })
        } catch (error) {
            console.error('Axios Request Error:', error)

            Swal.fire({
                icon: 'error',
                title: 'Add Failed',
                text: 'Failed to add a new user. Please try again.',
                timer: 2000,
                timerProgressBar: true
            })
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<AddIcon />}
                    style={{ backgroundColor: "#FF9066", color: "#FFF" }}
                    onClick={() => setOpenAdd(true)}
                    >
                    User
                </Button>
            </div>

            <UsersTable />

            <AddUser open={openAdd} onAddUser={handleAdd} onClose={() => setOpenAdd(false)} />
        </>
    )
}

export default Users