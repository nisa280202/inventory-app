import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'

const AddCategory = ({ open, onClose, onAddCategory }) => {
    const [newCategory, setNewCategory] = useState({ name: '' })
    const [nameError, setNameError] = useState('')

    useEffect(() => {
        setNameError('')
    }, [newCategory.name])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value
        }))
        setNameError('')
    }

    const handleAddCategory = async () => {
        if (newCategory.name.trim() === '') {
            setNameError('Category name cannot be empty')
            return
        }

        try {
            await onAddCategory(newCategory)
            onClose()
            setNewCategory({
                name: ''
            })
        } catch (error) {
            setNameError(error.response.data.message || 'Failed to add Category')
        }
    }

    if (!open) {
        return null
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>x</button>
                <div className="modal-content">
                    <h1 className="text-lg text-gray-400 font-semibold mb-7">Add New Category</h1>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Category Name"
                        type="text"
                        value={newCategory.name}
                        onChange={handleInputChange}
                        error={Boolean(nameError)}
                        helperText={nameError}
                        sx={{ marginBottom: 2, marginTop: 3 }}
                    />
                    <div className="action-buttons">
                        <button
                            onClick={handleAddCategory}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2"
                        >
                            Add Category
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

export default AddCategory
