import React, { useState, useEffect } from 'react'
import './user-info.scss'
import { images } from '../../constants'
import axios from 'axios'

const UserInfo = () => {
    const [userData, setUserData] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

                const res = await axios.get('http://localhost:5000/me', config)
                setUserData(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className='user-info'>
            <div className="user-info__img">
                <img src={userData.images == null ? images.defaultImage : `http://localhost:5000/uploads/${userData.images}`} alt='user' />
            </div>
            <div className="user-info__name">
                <span>{userData.name}</span>
            </div>
        </div>
    )
}

export default UserInfo