import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'

const UpdateCategory = ({ open, onClose, onUpdateCategory, category }) => {
    const [nameError, setNameError] = useState('')
    const [updateCategory, setUpdateCategory] = useState({ 
        uuid: '',
        name: '' 
    })

    useEffect(() => {
        if (category) {
            setUpdateCategory((prevCategory) => ({
                ...prevCategory,
                uuid: category.uuid || '',
                name: category.name || ''
            }))
        }
    }, [category])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUpdateCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }))
        setNameError('')
    }
    
    const handleUpdateCategory = async () => {
        if (updateCategory.name.trim() === '') {
            setNameError('Category name cannot be empty')
            return
        }
    
        try {
            await onUpdateCategory(updateCategory)
            onClose()
            setUpdateCategory({
                name: '',
            })
        } catch (error) {
            const errorMessage = error.response.data.message || 'Failed to update Category'
            setUpdateError(errorMessage)
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
                    <h1 className="text-lg text-gray-400 font-semibold mb-7">Update Category</h1>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Category Name"
                        type="text"
                        value={updateCategory.name}
                        onChange={handleInputChange}
                        error={Boolean(nameError)}
                        helperText={nameError}
                        sx={{ marginBottom: 2, marginTop: 3 }}
                    />
                    <div className="action-buttons">
                        <button
                            onClick={handleUpdateCategory}
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

export default UpdateCategory
