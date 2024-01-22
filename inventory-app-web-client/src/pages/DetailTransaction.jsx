import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Unstable_Grid2'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Swal from 'sweetalert2'
import moment from "moment"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const DetailTransaction = () => {
    const { uuid } = useParams()
    const [transaction, setTransaction] = useState([])
    const [detailTransactions, setDetailTransactions] = useState([])
    const [goods, setGoods] = useState([])
    const role = localStorage.getItem('role')
    const [formData, setFormData] = useState({
        goodsId: '',
        transactionId: '',
        stock: ''
    })    

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                };
                const res = await axios.get(`http://localhost:5000/transactions/${uuid}`, config)
                setTransaction(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [uuid]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                };
                const response = await axios.get(`http://localhost:5000/transactions-details/${uuid}`, config);
                setDetailTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transaction details:', error);
            }
        };
    
        fetchData();
    }, [uuid, detailTransactions]);

    useEffect(() => {
        async function fetchDataGoods() {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                };
                const res = await axios.get('http://localhost:5000/goods', config);
                setGoods(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchDataGoods();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        if (name === 'goods') {
            const selectedGood = goods.find((good) => good.id === value);
    
            setFormData({
                ...formData,
                [name]: value,
                goodsId: selectedGood ? selectedGood.id : '',
                stock: selectedGood ? selectedGood.stock : '',
            });            
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = {
            goodsId: formData.goodsId,
            transactionId: transaction.id,
            stock: formData.stock,
        };
    
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            };
            await axios.post('http://localhost:5000/transaction-details', data, config);

            Swal.fire({
                icon: 'success',
                title: 'Add Success!',
                text: 'New detail transaction has been successfully added!',
                timer: 2000,
                timerProgressBar: true,
            });
          // navigate('/transactions')
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Add Failed',
                text: 'Failed to add a new detail transaction. Please try again.',
                timer: 2000,
                timerProgressBar: true,
            });
        }
    };

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
                await axios.delete(`http://localhost:5000/transaction-details/${uuid}`, config)
    
                Swal.fire('Deleted!', 'Your detail transaction has been deleted.', 'success')
                setDetailTransactions(detailTransactions.filter(detailTransaction => detailTransaction.uuid !== uuid))
            } catch (error) {
                console.error('Delete Request Error:', error)
                Swal.fire('Error!', 'Failed to delete detail transaction.', 'error')
            }   
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={6} md={6}>
                    <Card
                        sx={{
                            // maxWidth: 400,
                            marginTop: 3.5,
                            borderRadius: 4,
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <CardContent>
                            {transaction.type == 0 ? (
                                <Typography gutterBottom variant="h5" component="div" sx={{ color: '#1976D2' }}>
                                    Transaction IN
                                </Typography>
                            ) : (
                                <Typography gutterBottom variant="h5" component="div" sx={{ color: '#DB190C' }}>
                                    Transaction OUT
                                </Typography>
                            )}
                            <Typography variant="body2" color="text.secondary">
                                <b>Date:</b> {moment(transaction.date).format("MM/DD/YYYY")}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Sender:</b> {transaction.sender}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Recipient:</b> {transaction.recipient}
                            </Typography>
                        </CardContent>
                    </Card>
                    
                    <Card
                        sx={{
                            marginTop: 2,
                            borderRadius: 4,
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell>Goods</TableCell>
                                    <TableCell>Stock</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {detailTransactions.map((detailTransaction, index) => (
                                <TableRow
                                    key={detailTransaction.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{index+1}</TableCell>
                                    <TableCell>{detailTransaction.good.name}</TableCell>
                                    <TableCell>{detailTransaction.stock}</TableCell>
                                    <TableCell>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            style={{ color: '#DB190C', marginLeft: '12px', fontSize: '15.5px', cursor: 'pointer' }}
                                            onClick={() => handleDelete(detailTransaction.uuid)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>
                
                <Grid xs={6} md={6}>
                    {role == 2 ? (
                    <Card
                        sx={{
                            marginTop: 3.5,
                            borderRadius: 4,
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <CardContent className="title" style={{ marginTop: 5, alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ marginBottom: '30px', textAlign: 'center' }}>Detail Transaction</h3>

                            <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                    <InputLabel id="goods-label">Goods</InputLabel>
                                    <Select
                                        labelId="goods-label"
                                        id="goods"
                                        name="goodsId"
                                        value={formData.goodsId}
                                        label="Goods"
                                        onChange={handleChange}
                                    >
                                    {goods.map((good) => (
                                        <MenuItem key={good.id} value={good.id}>
                                            {good.name}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>

                                <TextField
                                    fullWidth
                                    id="stock"
                                    name="stock"
                                    label="Stock"
                                    type="number"
                                    value={formData.stock}
                                    onChange={handleChange}
                                />

                                <div className="action-buttons">
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Submit
                                    </button>
                                    <Link to="/transactions">
                                        <button className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-md">Cancel</button>
                                    </Link>
                                </div>
                            </form>

                        </CardContent>
                    </Card>
                    ) : null}
                </Grid>
            </Grid>
        </>
    );
};

export default DetailTransaction;