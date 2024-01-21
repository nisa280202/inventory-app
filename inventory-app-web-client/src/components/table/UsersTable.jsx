import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './table.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import images from '../../constants/images'
import Swal from 'sweetalert2'
import UpdateUser from '../modal/UpdateUser'

const UsersTable = () => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [openUpdate, setOpenUpdate] = useState(false)

    const handleUpdate = (user) => {
        setSelectedUser(user)
        setOpenUpdate(true)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

                const res = await axios.get('http://localhost:5000/users', config)
                setUsers(res.data.user)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [users])  
    
    const onUpdateUser = async (user) => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.patch(`http://localhost:5000/users/${user.uuid}`, user, config)

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'User has been successfully updated.',
                timer: 2000,
                timerProgressBar: true
            })
        } catch (error) {
            console.error('Update Request Error: ', error)

            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'An error occurred while updating the user.',
                timer: 2000,
                timerProgressBar: true
            })
        }
    }

    const handleDelete = async (uuid) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
    
        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                await axios.delete(`http://localhost:5000/users/${uuid}`, config)
    
                Swal.fire('Deleted!', 'Your user has been deleted.', 'success')
                setUsers(users.filter(user => user.uuid !== uuid))
            } catch (error) {
                console.error('Delete Request Error:', error)
                Swal.fire('Error!', 'Failed to delete user.', 'error')
            }
        }
    }
    

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">Role</TableCell>
                        <TableCell className="tableCell">Name</TableCell>
                        <TableCell className="tableCell">Email</TableCell>
                        <TableCell className="tableCell">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.uuid}>
                            <TableCell className="tableCell">
                                {(user.role === 0) ? "SUPER ADMIN" : (user.role === 1) ? "OFFICE STAFF" : "WAREHOUSE STAFF"}
                            </TableCell>
                            <TableCell className="tableCell">
                                <div className="cellWrapper">
                                    <img src={user.images === null ? images.defaultImage : `http://localhost:5000/uploads/${user.images}`} alt="" className="image" />
                                    {user.name}
                                </div>
                            </TableCell>
                            <TableCell className="tableCell">{user.email}</TableCell>
                            <TableCell>
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    style={{ color: '#8624DB', marginRight: '8px', fontSize: '16px', cursor: 'pointer' }}
                                    onClick={() => handleUpdate(user)}
                                />
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    style={{ color: '#DB190C', marginLeft: '12px', fontSize: '15.5px', cursor: 'pointer' }}
                                    onClick={() => handleDelete(user.uuid)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <UpdateUser open={openUpdate} user={selectedUser} onClose={() => setOpenUpdate(false)} onUpdateUser={onUpdateUser} />
        </TableContainer>
    )
}

export default UsersTable