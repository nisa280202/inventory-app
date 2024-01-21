import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'

const UpdateUnit = ({ open, onClose, onUpdateUnit, unit }) => {
    const [nameError, setNameError] = useState('')
    const [updateUnit, setUpdateUnit] = useState({ 
        uuid: '',
        name: '' 
    })

    useEffect(() => {
        if (unit) {
            setUpdateUnit((prevUnit) => ({
                ...prevUnit,
                uuid: unit.uuid || '',
                name: unit.name || ''
            }))
        }
    }, [unit])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUpdateUnit((prevUnit) => ({
            ...prevUnit,
            [name]: value,
        }))
        setNameError('')
    }
    
    const handleUpdateUnit = async () => {
        if (updateUnit.name.trim() === '') {
            setNameError('Unit name cannot be empty')
            return
        }
    
        try {
            await onUpdateUnit(updateUnit)
            onClose()
            setUpdateUnit({
                name: '',
            })
        } catch (error) {
            const errorMessage = error.response.data.message || 'Failed to update unit'
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
                    <h1 className="text-lg text-gray-400 font-semibold mb-7">Update Unit</h1>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Unit Name"
                        type="text"
                        value={updateUnit.name}
                        onChange={handleInputChange}
                        error={Boolean(nameError)}
                        helperText={nameError}
                        sx={{ marginBottom: 2, marginTop: 3 }}
                    />
                    <div className="action-buttons">
                        <button
                            onClick={handleUpdateUnit}
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

export default UpdateUnit
