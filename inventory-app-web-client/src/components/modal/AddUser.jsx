import React, { useState } from 'react'
import validator from 'validator'
import './add-modal.scss'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Input from '@mui/material/Input'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const AddUser = ({ open, onClose, onAddUser }) => {
    const role = localStorage.getItem('role')
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileSizeError, setFileSizeError] = useState(null)
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        confPassword: '',
        images: null,
        role: ''
    })

    const [emailValid, setEmailValid] = useState(true)
    const [passwordValid, setPasswordValid] = useState(true)
    const [roleValid, setRoleValid] = useState(true)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewUser((prevUser) => ({
        ...prevUser,
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

            setNewUser((prevUser) => ({
                ...prevUser,
                picture: imageFile,
            }))
        }
        setSelectedFile(imageFile)
    }    

    const handleAddUser = () => {
        if (validator.isEmail(newUser.email)) {
            setEmailValid(true)
        } else {
            setEmailValid(false)
        }

        if (newUser.password.trim().length >= 6) {
            setPasswordValid(true)
        } else {
            setPasswordValid(false)
        }

        if (['1', '2'].includes(newUser.role)) {
            setRoleValid(true)
        } else {
            setRoleValid(false)
        }

        const formData = new FormData()
        formData.append('name', newUser.name)
        formData.append('email', newUser.email)
        formData.append('role', newUser.role)
        formData.append('password', newUser.password)
        formData.append('confPassword', newUser.confPassword)
        formData.append('images', newUser.images)

        if (
            validator.isEmail(newUser.email) &&
            newUser.password.trim().length >= 6 &&
            ['1', '2'].includes(newUser.role)
        ) {
            onAddUser(formData)
            onClose()
            setNewUser({
                name: '',
                email: '',
                password: '',
                confPassword: '',
                images: null,
                role: '',
            })
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
                    <h1 className="text-lg text-gray-400 font-semibold mb-7">Create New User</h1>
                    {!emailValid && <div className="invalid-message">Invalid Email Format!</div>}
                    {!passwordValid && (
                        <div className="invalid-message">Password should be at least 6 characters long.</div>
                    )}
                    {!roleValid && <div className="invalid-message">Invalid Role!</div>}

                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        value={newUser.name}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2, marginTop: 2 }}
                    />

                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2 }}
                    />

                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={newUser.password}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2 }}
                    />

                    <TextField
                        fullWidth
                        id="confPassword"
                        name="confPassword"
                        label="Confirm Password"
                        type="password"
                        value={newUser.confPassword}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2 }}
                    />

                    <div className="input-picture">
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
                            Choose Picture
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

                    <FormControl fullWidth sx={{ marginTop: 2 }}>
                        <InputLabel id="type-label">Role</InputLabel>
                        <Select
                            labelId="type-label"
                            id="role"
                            name="role"
                            value={newUser.role}
                            label="Role"
                            onChange={handleInputChange}
                        >
                            <MenuItem value="1">Office Staff</MenuItem>
                            <MenuItem value="2">Warehouse Staff</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <div className="action-buttons">
                        <button
                            onClick={handleAddUser}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2"
                        >
                            Add User
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

export default AddUser
