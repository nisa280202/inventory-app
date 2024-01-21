import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Swal from 'sweetalert2'
import UpdateType from '../modal/UpdateType'

const TypesTable = () => {
    const [types, setTypes] = useState([])
    const [selectedType, setSelectedType] = useState(null)
    const [openUpdate, setOpenUpdate] = useState(false)
    const role = localStorage.getItem('role')

    const handleUpdate = (type) => {
        setSelectedType(type)
        setOpenUpdate(true)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

                const response = await axios.get('http://localhost:5000/types', config)
                setTypes(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [types])

    const onUpdateType = async (type) => {
        try {
            if (!type.uuid) {
                console.error('UUID is undefined or empty.')
                return
            }
    
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.patch(`http://localhost:5000/types/${type.uuid}`, type, config)
    
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Type has been successfully updated.',
                timer: 2000,
                timerProgressBar: true
            })
        } catch (error) {
            console.error('Update Request Error: ', error)
    
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'An error occurred while updating the type.',
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
                const token = localStorage.getItem('token')
                    const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.delete(`http://localhost:5000/types/${uuid}`, config)

                Swal.fire('Deleted!', 'Your type has been deleted.', 'success')
                setTypes(types.filter(type => type.uuid !== uuid))
            } catch (error) {
                console.error('Delete Request Error:', error)
                Swal.fire('Error!', 'Failed to delete type.', 'error')
            }
        }
    }

    return (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Type Name</TableCell>
                        {role == 1 ? <TableCell>Actions</TableCell> : null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {types.map((type, index) => (
                        <TableRow
                        key={type.uuid}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell>{type.name}</TableCell>
                            {role == 1 ? ( 
                                <TableCell>
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        style={{ color: '#8624DB', marginRight: '8px', fontSize: '16px', cursor: 'pointer' }}
                                        onClick={() => handleUpdate(type)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        style={{ color: '#DB190C', marginLeft: '12px', fontSize: '15.5px', cursor: 'pointer' }}
                                        onClick={() => handleDelete(type.uuid)}
                                    />
                                </TableCell>
                            ) : null }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <UpdateType open={openUpdate} type={selectedType} onClose={() => setOpenUpdate(false)} onUpdateType={onUpdateType} />
        </TableContainer>
    )
}

export default TypesTable