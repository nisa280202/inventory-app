import React, { useState } from 'react'
import axios from 'axios'
import './login.scss'
import { images } from '../../constants'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:5000/login", {
                email,
                password,
        })

        const token = response.data.token;
        const role = response.data.user.role;

        localStorage.setItem("token", token)
        localStorage.setItem("role", role)

        navigate("/")

        Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You have successfully logged in.',
            timer: 2000,
            timerProgressBar: true
        })
        } catch (error) {
            console.error("Error during login:", error)
            Swal.fire({
                icon: 'error',
                title: 'Login Failed!',
                text: 'Invalid username or password. Please try again.',
                timer: 2000,
                timerProgressBar: true
            })
        }
    }
    
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className='login'>
            <div className='container'>
                <div className="header">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>

                <div className="inputs">
                    <div className="input">
                        <img src={images.email} alt="" className="img-icon" />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </div>
                    <div className="input">
                        <img src={images.password} alt="" className="img-icon" />
                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        <span className="password-toggle" onClick={toggleShowPassword}>
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} style={{ marginRight: '50px', color: '#D0D4CA' }} />
                        </span>
                    </div>
                </div>

                <div className="submit-container">
                    <div className="submit" onClick={handleLogin}>Login</div>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    )
}

export default Login
