import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'

const AddUnit = ({ open, onClose, onAddUnit }) => {
    const [newUnit, setNewUnit] = useState({ name: '' })
    const [nameError, setNameError] = useState('')

    useEffect(() => {
        setNameError('')
    }, [newUnit.name])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewUnit((prevUnit) => ({
            ...prevUnit,
            [name]: value
        }))
        setNameError('')
    }

    const handleAddUnit = async () => {
        if (newUnit.name.trim() === '') {
            setNameError('Unit name cannot be empty')
            return
        }

        try {
            await onAddUnit(newUnit)
            onClose()
            setNewUnit({
                name: ''
            })
        } catch (error) {
            setNameError(error.response.data.message || 'Failed to add unit')
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
                    <h1 className="text-lg text-gray-400 font-semibold mb-7">Add New Unit</h1>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Unit Name"
                        type="text"
                        value={newUnit.name}
                        onChange={handleInputChange}
                        error={Boolean(nameError)}
                        helperText={nameError}
                        sx={{ marginBottom: 2, marginTop: 3 }}
                    />
                    <div className="action-buttons">
                        <button
                            onClick={handleAddUnit}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2"
                        >
                            Add Unit
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

export default AddUnit
