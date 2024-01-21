import React, { useState, useEffect } from 'react'
import './overall-list.scss'
import axios from 'axios'

const icons = [
    <i className='bx bx-receipt'></i>,
    <i className='bx bx-user'></i>
]

const OverallList = () => {
    const [totalSenderRecipient, setTotalSenderRecipient] = useState([])

    useEffect(() => {
        const fetchTotalSenderRecipient = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const response = await axios.get('http://localhost:5000/transactions', config)
                setTotalSenderRecipient(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchTotalSenderRecipient()
    }, [])

    return (
        <ul className='overall-list'>
            <li className='overall-list__item'>
                <div className="overall-list__item__icon">
                    {icons[1]}
                </div>
                <div className="overall-list__item__info">
                    <div className="title">
                        {totalSenderRecipient.uniqueRecipientsCount}
                    </div>
                    <span>Customers</span>
                </div>
            </li>

            <li className='overall-list__item'>
                <div className="overall-list__item__icon">
                    {icons[0]}
                </div>
                <div className="overall-list__item__info">
                    <div className="title">
                        {totalSenderRecipient.uniqueSendersCount}
                    </div>
                    <span>Suppliers</span>
                </div>
            </li>
        </ul>
    )
}

export default OverallList