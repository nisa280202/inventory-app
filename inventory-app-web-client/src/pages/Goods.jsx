import React, { useState } from 'react'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import GoodsTable from '../components/table/GoodsTable'
import AddGoods from '../components/modal/AddGoods'
import axios from 'axios'
import Swal from 'sweetalert2'
import SearchIcon from '@mui/icons-material/Search'

const Goods = () => {
    const [openAdd, setOpenAdd] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const role = localStorage.getItem('role')

    const handleAdd = async (goods) => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            await axios.post('http://localhost:5000/goods', goods, config)

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Goods added successfully.',
                timer: 2000,
                timerProgressBar: true
            })
        } catch (error) {
            console.error('Axios Request Error:', error)

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to add goods.',
                timer: 2000,
                timerProgressBar: true
            })
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <div style={{ position: 'relative', justifyContent: 'flex-end' }}>
                    <input
                        type="text"
                        placeholder="Search goods..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '250px',
                            padding: '10px',
                            paddingLeft: '40px',
                            borderRadius: '5px',
                            marginRight: '10px',
                            border: '1px solid #ccc',
                        }}
                    />
                    <SearchIcon
                        style={{
                            position: 'absolute',
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                        }}
                    />
                </div>
                {role == 1 ? (
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<AddIcon />}
                        style={{ backgroundColor: "#FF9066", color: "#FFF" }}
                        onClick={() => setOpenAdd(true)}
                    >
                        Goods
                    </Button>
                ) : null}
            </div>

            <GoodsTable searchQuery={searchQuery} />

            <AddGoods open={openAdd} onAddGoods={handleAdd} onClose={() => setOpenAdd(false)} />
        </>
    )
}

export default Goods