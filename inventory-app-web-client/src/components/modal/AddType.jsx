import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'

const AddType = ({ open, onClose, onAddType }) => {
    const [newType, setNewType] = useState({ name: '' })
    const [nameError, setNameError] = useState('')

    useEffect(() => {
        setNameError('')
    }, [newType.name])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewType((prevType) => ({
            ...prevType,
            [name]: value
        }))
        setNameError('')
    }

    const handleAddType = async () => {
        if (newType.name.trim() === '') {
            setNameError('Type name cannot be empty')
            return
        }

        try {
            await onAddType(newType)
            onClose()
            setNewType({
                name: ''
            })
        } catch (error) {
            setNameError(error.response.data.message || 'Failed to add type')
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
                    <h1 className="text-lg text-gray-400 font-semibold mb-7">Add New Type</h1>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Type Name"
                        type="text"
                        value={newType.name}
                        onChange={handleInputChange}
                        error={Boolean(nameError)}
                        helperText={nameError}
                        sx={{ marginBottom: 2, marginTop: 3 }}
                    />
                    <div className="action-buttons">
                        <button
                            onClick={handleAddType}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2"
                        >
                            Add Type
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

export default AddType
