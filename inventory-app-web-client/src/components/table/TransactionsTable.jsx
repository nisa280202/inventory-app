import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Paper } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import UpdateTransaction from '../modal/UpdateTransaction'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const TransactionsTable = ({ searchQuery }) => {
    const [transactions, setTransactions] = useState([])
    const [selectedTransaction, setSelectedTransaction] = useState(null)
    const [openUpdate, setOpenUpdate] = useState(false)
    const role = localStorage.getItem('role')

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

                const res = await axios.get('http://localhost:5000/transactions', config)
                setTransactions(res.data.transaction)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [transactions])

    const transactionSearch = searchQuery
        ? transactions.filter(
            (item) =>
                item.sender && item.sender.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.recipient && item.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.date && item.date.toLowerCase().includes(searchQuery.toLowerCase())
            )
        : transactions

    const dataGridColumns = [
        { field: 'type', headerName: 'Type', width: 200, renderCell: (params) => params.value === 'IN' ? (
            <Button variant="outlined" size="small">IN</Button>
            ) : (
            <Button variant="outlined" color="error" size="small">OUT</Button>
        ) },
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'sender', headerName: 'Sender', width: 200 },
        { field: 'recipient', headerName: 'Recipient', width: 200 }
    ]

    if (role !== '0') {
        dataGridColumns.push({
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <>
                    <Link to={`/transactions/${params.row.uuid}`}>
                        {role == 2 ? (
                            <FontAwesomeIcon
                                icon={faEdit}
                                style={{ color: '#3498db', marginLeft: '15px', fontSize: '16px', cursor: 'pointer' }}
                            />
                        ) : (
                            <FontAwesomeIcon 
                                icon={faInfoCircle} 
                                style={{ color: 'orange', marginRight: '8px', fontSize: '16px', cursor: 'pointer' }} 
                            />
                        )}
                    </Link>
                    {role == 1 ? ( <div>
                        <FontAwesomeIcon
                            icon={faEdit}
                            style={{ color: '#8624DB', marginLeft: '12px', marginRight: '8px', fontSize: '16px', cursor: 'pointer' }}
                            onClick={() => handleUpdate(params.row)}
                        />
                        <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: '#DB190C', marginLeft: '12px', fontSize: '15.5px', cursor: 'pointer' }}
                            onClick={() => handleDelete(params.row.uuid)}
                        />
                    </div>) : null}
                </>
            ),
        })
    }

    const dataGridRows = transactionSearch.map((transaction) => ({
        id: transaction.id,
        type: transaction.type === 0 ? 'IN' : 'OUT',
        date: new Date(transaction.date).toLocaleDateString(),
        sender: transaction.sender,
        recipient: transaction.recipient,
        uuid: transaction.uuid
    }))

    const handleUpdate = (transaction) => {
        setSelectedTransaction(transaction)
        setOpenUpdate(true)
    }

    const onUpdateTransaction = async (transaction) => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            await axios.patch(`http://localhost:5000/transactions/${transaction.uuid}`, transaction, config)

            setTransactions(prevTransactions => prevTransactions.map(t =>
                t.uuid === transaction.uuid ? { ...t, ...transaction } : t
            ))              

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Transaction has been successfully updated.',
                timer: 2000,
                timerProgressBar: true
            })
        } catch (error) {
            console.error('Update Request Error: ', error)

            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'An error occurred while updating the transaction.',
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
                await axios.delete(`http://localhost:5000/transactions/${uuid}`, config)

                Swal.fire('Deleted!', 'Your transaction has been deleted.', 'success')
                setTransactions(prevTransactions =>
                    prevTransactions.filter(transaction => transaction.uuid !== uuid)
                )
            } catch (error) {
                console.error('Delete Request Error:', error)
                Swal.fire('Error!', 'Failed to delete transaction.', 'error')
            }
        }
    }

    return (
        <Paper style={{ height: 450, width: '100%', background: 'white' }}>
            <DataGrid
                rows={dataGridRows}
                columns={dataGridColumns}
                pageSize={5}
                disableSelectionOnClick
            />

            <UpdateTransaction open={openUpdate} transaction={selectedTransaction} onClose={() => setOpenUpdate(false)} onUpdateTransaction={onUpdateTransaction} />
        </Paper>
    )
}

export default TransactionsTable
