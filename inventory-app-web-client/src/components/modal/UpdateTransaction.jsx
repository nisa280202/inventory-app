import React, { useState, useEffect } from 'react'
import validator from 'validator'
import './add-modal.scss'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import { format } from 'date-fns'

const UpdateTransaction = ({ open, onClose, onUpdateTransaction, transaction }) => {
    const [selectedType, setSelectedType] = useState(0)

    const [updateTransaction, setUpdateTransaction] = useState({
        uuid: '',
        type: '',
        date: '',
        sender: '',
        recipient: '',
        status: ''
    })

    useEffect(() => {
        if (transaction) {
            const formattedDate = transaction.date ? format(new Date(transaction.date), 'yyyy-MM-dd') : ''
    
            setUpdateTransaction((prevTransaction) => ({
                ...prevTransaction,
                uuid: transaction.uuid || '',
                type: transaction.type || '',
                date: formattedDate,
                sender: transaction.sender || '',
                recipient: transaction.recipient || '',
                status: transaction.status
            }))
        }
    }, [transaction])
    
    const [dateValid, setDateValid] = useState(true)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUpdateTransaction((prevTransaction) => ({
        ...prevTransaction,
        [name]: value
        }))
    }

    const handleTypeChange = (event) => {
        setSelectedType(parseInt(event.target.value, 10))
        setUpdateTransaction((prevTransaction) => ({
            ...prevTransaction,
            type: parseInt(event.target.value, 10)
        }))
    }

    const handleUpdateTransaction = () => {
        const isValidDate = validator.isDate(updateTransaction.date)

        if (isValidDate) {
            setDateValid(true)

            const formattedDate = format(new Date(updateTransaction.date), 'yyyy-MM-dd')

            onUpdateTransaction({
                ...updateTransaction,
                date: formattedDate,
            })

            onClose()
            setUpdateTransaction({
                type: selectedType,
                date: '',
                sender: '',
                recipient: '',
                status: 0
            })
        } else {
            setDateValid(false)
        }
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
                    <h1 className="text-xl text-gray-800 font-semibold mb-5">Update Transaction</h1>
                    {!dateValid && <div className="invalid-message">Invalid Date Format!</div>}
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            id="type"
                            onChange={handleTypeChange}
                            value={updateTransaction.type || 0}
                            sx={{ marginBottom: 2 }}
                        >
                            <FormControlLabel value="0" control={<Radio />} label="IN" />
                            <FormControlLabel value="1" control={<Radio />} label="OUT" />
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        fullWidth
                        id="date"
                        name="date"
                        label="Date"
                        type="date"
                        value={updateTransaction.date}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ marginBottom: 2 }}
                    />

                    <TextField
                        fullWidth
                        id="sender"
                        name="sender"
                        label="Sender"
                        type="text"
                        value={updateTransaction.sender}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2 }}
                    />

                    <TextField
                        fullWidth
                        id="recipient"
                        name="recipient"
                        label="Recipient"
                        type="text"
                        value={updateTransaction.recipient}
                        onChange={handleInputChange}
                    />
                    
                    <div className="action-buttons">
                        <button
                            onClick={handleUpdateTransaction}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2"
                        >
                            Update
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

export default UpdateTransaction