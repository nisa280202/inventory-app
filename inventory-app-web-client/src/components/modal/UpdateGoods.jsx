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

const UpdateGoods = ({ open, onClose, onUpdateGoods, goods, types, categories, units }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileSizeError, setFileSizeError] = useState(null)
    const role = localStorage.getItem('role')
    const [updateGoods, setUpdateGoods] = useState({
        uuid: '',
        typeId: '',
        name: '',
        categoryId: '',
        unitId: '',
        price: '',
        images: '',
        stock: ''
    })

    useEffect(() => {
        if (goods) {
            setUpdateGoods((prevGoods) => ({
                ...prevGoods,
                uuid: goods.uuid || '',
                typeId: goods.type.id || '',
                typeName: goods.type.name || '',
                name: goods.name || '',
                categoryId: goods.category.id || '',
                categoryName: goods.category.name || '',
                unitId: goods.unit.id || '',
                unitName: goods.unit.name || '',
                price: goods.price || '',
                images: goods.images || '',
                stock: goods.stock || '',
            }))
        }
    }, [goods])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUpdateGoods((prevGoods) => ({
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

            setUpdateGoods((prevGoods) => ({
                ...prevGoods,
                images: imageFile,
            }))
        }
        setSelectedFile(imageFile)
    }

    const handleUpdateGoods = () => {
        const formData = new FormData()
        formData.append('uuid', updateGoods.uuid)
        formData.append('typeId', updateGoods.typeId)
        formData.append('name', updateGoods.name)
        formData.append('categoryId', updateGoods.categoryId)
        formData.append('unitId', updateGoods.unitId)
        formData.append('price', updateGoods.price)
        formData.append('images', updateGoods.images)
        formData.append('stock', updateGoods.stock)
        
        onUpdateGoods(formData)
        onClose()
        setUpdateGoods({
            typeId: '',
            name: '',
            categoryId: '',
            unitId: '',
            price: '',
            images: '',
            stock: '',
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
                    <h1 className="text-xl text-gray-800 font-semibold mb-5">Update Goods</h1>
                    <div>
                        <FormControl fullWidth sx={{ marginBottom: 2, marginTop: 2 }}>
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                                labelId="type-label"
                                id="typeId"
                                name="typeId"
                                value={updateGoods.typeId}
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
                            value={updateGoods.name}
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
                                value={updateGoods.categoryId}
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
                                value={updateGoods.unitId}
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
                            value={updateGoods.price}
                            onChange={handleInputChange}
                            sx={{ marginBottom: 2 }}
                        />

                        <TextField
                            fullWidth
                            id="stock"
                            name="stock"
                            label="Stock"
                            type="text"
                            value={updateGoods?.stock}
                            onChange={handleInputChange}
                        />
                    </div>
                
                    <div className="action-buttons">
                        <button
                            onClick={handleUpdateGoods}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2"
                        >
                            Update
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateGoods