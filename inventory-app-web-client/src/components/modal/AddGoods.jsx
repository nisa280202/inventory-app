import React, { useState, useEffect } from 'react'
import './add-modal.scss'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import axios from 'axios'

const AddGoods = ({ open, onClose, onAddGoods }) => {
    const [types, setTypes] = useState([])
    const [units, setUnits] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileSizeError, setFileSizeError] = useState(null)
    const [newGoods, setNewGoods] = useState({
        typeId: '',
        name: '',
        categoryId: '',
        unitId: '',
        price: '',
        images: null,
        stock: ''
    })

    useEffect(() => {
        async function fetchDataTypes() {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const type = await axios.get('http://localhost:5000/types', config)
                setTypes(type.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchDataTypes()
    }, [])

    useEffect(() => {
        async function fetchDataUnits() {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const unit = await axios.get('http://localhost:5000/units', config)
                setUnits(unit.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchDataUnits()
    }, [])

    useEffect(() => {
        async function fetchDataCategories() {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const category = await axios.get('http://localhost:5000/categories', config)
                setCategories(category.data.category)
            } catch (error) {
                console.log(error)
            }
        }

        fetchDataCategories()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewGoods((prevGoods) => ({
            ...prevGoods,
            [name]: value,
        }))
    }
    
    const handleImageChange = (e) => {
        const imageFile = e.target.files[0]
        if (imageFile) {
            if (!/^image\/(jpeg|jpg|png|gif|webp)$/i.test(imageFile.type)) {
                setFileSizeError('Invalid file type. Please choose a valid image file.')
                return
            }

            const fileSizeInMB = imageFile.size / (1024 * 1024)

            if (fileSizeInMB > 1) {
                setFileSizeError('File size exceeds the limit (1 MB)')
                return
            }

            setFileSizeError(null)

            setNewGoods((prevGoods) => ({
                ...prevGoods,
                images: imageFile,
            }))
        }
        setSelectedFile(imageFile)
    }

    const handleAddGoodsClick = () => {
        const formData = new FormData()
        formData.append('typeId', newGoods.typeId)
        formData.append('name', newGoods.name)
        formData.append('categoryId', newGoods.categoryId)
        formData.append('unitId', newGoods.unitId)
        formData.append('price', newGoods.price)
        formData.append('images', newGoods.images)
        formData.append('stock', newGoods.stock)

        onAddGoods(formData)
        onClose()
        setNewGoods({
            typeId: '',
            name: '',
            categoryId: '',
            unitId: '',
            price: '',
            images: null,
            stock: ''
        })
    }

    if (!open) {
        return null
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>
                    x
                </button>
                <div className="modal-content">
                    <h1 className="text-xl text-gray-800 font-semibold mb-5">Add New Goods</h1>
                    <FormControl fullWidth sx={{ marginBottom: 2, marginTop: 2 }}>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            id="typeId"
                            name="typeId"
                            value={newGoods.typeId}
                            label="Type"
                            onChange={handleInputChange}
                        >
                            {types.map((type) => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        value={newGoods.name}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2 }}
                    />

                    <div className="input-images">
                        <Button
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            component="label"
                            htmlFor="images"
                            style={{
                                backgroundColor: '#2196F3',
                                color: 'white',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                textAlign: 'center',
                            }}
                        >
                            Choose images
                            <Input
                                type="file"
                                id="images"
                                name="images"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                        </Button>
                        {selectedFile && (
                            <p style={{ marginTop: '10px', marginBottom: '-5px', textAlign: 'center' }}>
                                Selected File: {selectedFile.name}
                            </p>
                        )}
                        {fileSizeError && (
                            <p style={{ marginTop: '10px', marginBottom: '-5px', color: 'red', textAlign: 'center' }}>
                                {fileSizeError}
                            </p>
                        )}
                    </div>

                    <FormControl fullWidth sx={{ marginBottom: 2, marginTop: 2 }}>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="categoryId"
                            name="categoryId"
                            value={newGoods.categoryId}
                            label="Category"
                            onChange={handleInputChange}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel id="unit-label">Unit</InputLabel>
                        <Select
                            labelId="unit-label"
                            id="unitId"
                            name="unitId"
                            value={newGoods.unitId}
                            label="Unit"
                            onChange={handleInputChange}
                        >
                            {units.map((unit) => (
                                <MenuItem key={unit.id} value={unit.id}>
                                    {unit.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        id="price"
                        name="price"
                        label="Price"
                        type="text"
                        value={newGoods.price}
                        onChange={handleInputChange}
                    />

                    <div className="action-buttons">
                        <button
                            onClick={handleAddGoodsClick}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2"
                        >
                            Add Goods
                        </button>
                        <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-md">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddGoods