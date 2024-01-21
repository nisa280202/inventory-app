import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import images from '../../constants/images'
import UpdateGoods from '../modal/UpdateGoods'
import { TablePagination } from '@mui/material'
import DetailGoods from '../modal/DetailGoods'

const GoodsTable = ({ searchQuery }) => {
    const [originalGoods, setOriginalGoods] = useState([])
    const [selectedGoods, setSelectedGoods] = useState(null)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [openDetail, setOpenDetail] = useState(false)
    const [types, setTypes] = useState([])
    const [categories, setCategories] = useState([])
    const [page, setPage] = useState(0)
    const [rowPerPage, setRowPerPage] = useState(5)
    const role = localStorage.getItem('role')

    const handleUpdate = (goods) => {
        setSelectedGoods(goods)
        setOpenUpdate(true)
        console.log(goods)
    }

    const handleDetail = (goods) => {
        setSelectedGoods(goods)
        setOpenDetail(true)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

                const response = await axios.get('http://localhost:5000/goods', config)
                setOriginalGoods(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [originalGoods])

    const goods = searchQuery
        ? originalGoods.filter(
            (item) =>
                item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        : originalGoods

    const onUpdateGoods = async (updatedGoods) => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

            await axios.patch(`http://localhost:5000/goods/${updatedGoods.uuid}`, updatedGoods, config)

            setOriginalGoods((prevGoods) =>
                prevGoods.map((item) =>
                    item.uuid === updatedGoods.uuid ? { ...item, ...updatedGoods } : item
                )
            )

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Goods has been successfully updated.',
                timer: 2000,
                timerProgressBar: true
            })
        } catch (error) {
            console.error('Update Request Error: ', error)

            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'An error occurred while updating the goods.',
                timer: 2000,
                timerProgressBar: true
            })
        }
    }

    const handleDelete = async (uuid) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        })

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

                await axios.delete(`http://localhost:5000/goods/${uuid}`, config)

                Swal.fire('Deleted!', 'Your goods has been deleted.', 'success')

                setOriginalGoods((prevGoods) => prevGoods.filter((item) => item.uuid !== uuid))
            } catch (error) {
                console.error('Delete Request Error:', error)
                Swal.fire('Error!', 'Failed to delete goods.', 'error')
            }
        }
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowPerPage = (event) => {
        setRowPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell" align="center">Images</TableCell>
                        <TableCell className="tableCell">Name</TableCell>
                        <TableCell className="tableCell">Type</TableCell>
                        <TableCell className="tableCell">Category</TableCell>
                        <TableCell className="tableCell">Stock</TableCell>
                        {role == 1 || role == 2 ? <TableCell className="tableCell">Actions</TableCell> : null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowPerPage > 0 ? goods.slice(
                        page * rowPerPage,
                        page * rowPerPage + rowPerPage
                    ) : goods).map((goods) => (
                        <TableRow key={goods.uuid}>
                            <TableCell className="tableCell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img
                                    src={goods.images ? `http://localhost:5000/uploads/${goods.images}` : images.defaultGoods}
                                    alt="Goods"
                                    style={{ float: 'left', width: '80px', objectFit: 'contain' }}
                                />
                            </TableCell>
                            <TableCell className="tableCell">{goods.name}</TableCell>
                            <TableCell className="tableCell">{goods.type.name}</TableCell>
                            <TableCell className="tableCell">{goods.category.name}</TableCell>
                            <TableCell className="tableCell">{goods.stock}</TableCell>
                            {role == 1 || role == 2 ? (
                                <TableCell>
                                    <FontAwesomeIcon 
                                        icon={faInfoCircle} 
                                        style={{ color: 'orange', marginRight: '8px', fontSize: '16px', cursor: 'pointer' }} 
                                        onClick={() => handleDetail(goods)}
                                    />
                                    <FontAwesomeIcon 
                                        icon={faEdit} 
                                        style={{ color: '#8624DB', marginLeft: '12px', marginRight: '8px', fontSize: '16px', cursor: 'pointer' }}
                                        onClick={() => handleUpdate(goods)}
                                    />
                                    {role == 1 ? (
                                        <FontAwesomeIcon 
                                            icon={faTrash} 
                                            style={{ color: '#DB190C', marginLeft: '12px', fontSize: '15.5px', cursor: 'pointer' }} 
                                            onClick={() => handleDelete(goods.uuid)}
                                        />
                                    ) : null}
                                </TableCell>
                            ) : null}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination 
                style={{ backgroundColor: "#F5F5F5" }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={goods.length}
                rowsPerPage={rowPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowPerPage}
            />

            <UpdateGoods
                open={openUpdate}
                onClose={() => setOpenUpdate(false)}
                onUpdateGoods={onUpdateGoods}
                goods={selectedGoods}
                types={types}
                categories={categories}
            />

            <DetailGoods goods={selectedGoods} open={openDetail} onClose={() => setOpenDetail(false)} />

        </TableContainer>
    )
}

export default GoodsTable