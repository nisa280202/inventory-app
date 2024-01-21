import React, { useState } from 'react'
import validator from 'validator'
import './add-modal.scss'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import moment from 'moment'

const AddTransactionModal = ({ open, onClose, onAddTransaction }) => {
    const [selectedType, setSelectedType] = useState(0)

    const [newTransaction, setNewTransaction] = useState({
        type: selectedType,
        date: '',
        sender: '',
        recipient: '',
        status: 0,
    })

    const [dateValid, setDateValid] = useState(true)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewTransaction((prevTransaction) => ({
        ...prevTransaction,
        [name]: value,
        }))
    }

    const handleTypeChange = (event) => {
        setSelectedType(parseInt(event.target.value, 10))
        setNewTransaction((prevTransaction) => ({
            ...prevTransaction,
            type: parseInt(event.target.value, 10),
        }))
    }

    const handleAddTransactionClick = () => {
        const formattedDate = moment(newTransaction.date).format('YYYY-MM-DD')
    
        if (validator.isDate(formattedDate)) {
            setDateValid(true)
            onAddTransaction({
                ...newTransaction,
                date: formattedDate,
            })
            onClose()
            setNewTransaction({
                type: selectedType,
                date: '',
                sender: '',
                recipient: '',
                status: 0,
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
                    <h1 className="text-xl text-gray-800 font-semibold mb-5" style={{ marginBottom: '10px' }}>Add New Transaction</h1>
                    {!dateValid && <div className="invalid-message">Invalid Date Format!</div>}
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            id="type"
                            onChange={handleTypeChange}
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
                        value={newTransaction.date}
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
                        value={newTransaction.sender}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2 }}
                    />
                    
                    <TextField
                        fullWidth
                        id="recipient"
                        name="recipient"
                        label="Recipient"
                        type="text"
                        value={newTransaction.recipient}
                        onChange={handleInputChange}
                    />
                    
                    <div className="action-buttons">
                        <button
                            onClick={handleAddTransactionClick}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2"
                        >
                            Add Transaction
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

export default AddTransactionModal