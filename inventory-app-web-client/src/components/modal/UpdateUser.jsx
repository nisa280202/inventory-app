import React, { useState, useEffect } from 'react'
import validator from 'validator'
import './add-modal.scss'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Input from '@mui/material/Input'
import TextField from '@mui/material/TextField'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const UpdateUser = ({ open, onClose, onUpdateUser, user }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileSizeError, setFileSizeError] = useState(null)
    const [updateUser, setUpdateUser] = useState({
        uuid: '',
        name: '',
        email: '',
        images: '',
        role: ''
    })
    
    useEffect(() => {
        if (user) {
            setUpdateUser((prevUser) => ({
                ...prevUser,
                uuid: user.uuid || '',
                name: user.name || '',
                email: user.email || '',
                images: user.images || '',
                role: user.role || ''
            }))
        }
    }, [user])

    const [emailValid, setEmailValid] = useState(true)
    const [roleValid, setRoleValid] = useState(true)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUpdateUser((prevUser) => ({
        ...prevUser,
        [name]: value
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

            setUpdateUser((prevUser) => ({
                ...prevUser,
                images: imageFile,
            }))
        }
        setSelectedFile(imageFile)
    }    

    const handleUpdateUser = () => {
        if (validator.isEmail(updateUser.email)) {
            setEmailValid(true)
        } else {
            setEmailValid(false)
            return 
        }
    
        const formData = new FormData()
        formData.append('uuid', updateUser.uuid)
        formData.append('name', updateUser.name)
        formData.append('email', updateUser.email)
        formData.append('role', updateUser.role)
        formData.append('images', updateUser.images)
    
        onUpdateUser(formData)
        onClose()
        setUpdateUser({
            name: '',
            email: '',
            images: '',
            role: ''
        })
    }
    
    if (!open) {
        return null
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>x</button>
                <div className="modal-content">
                    <h1 className="text-lg text-gray-400 font-semibold mb-7">Update User</h1>
                    {!emailValid && <div className="invalid-message">Invalid Email Format!</div>}
                    {!roleValid && <div className="invalid-message">Invalid Role!</div>}
                    
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        value={updateUser.name}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2, marginTop: 2 }}
                    />

                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        value={updateUser.email}
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
                            Choose Images
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
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            name="role"
                            value={updateUser.role}
                            label="Role"
                            onChange={handleInputChange}
                        >
                            <MenuItem value="1">Office Staff</MenuItem>
                            <MenuItem value="2">Warehouse Staff</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <div className="action-buttons">
                        <button
                            onClick={handleUpdateUser}
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

export default UpdateUser
