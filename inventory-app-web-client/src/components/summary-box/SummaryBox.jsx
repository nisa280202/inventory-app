import React, { useState, useEffect } from 'react'
import './summary-box.scss'
import Box from '../box/Box'
import { data } from '../../constants'
import axios from 'axios'
import { FaBox, FaMoneyBillWave, FaUsers, FaTools } from 'react-icons/fa'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register (
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const SummaryBox = () => {
    const [countGoods, setCountGoods] = useState([])
    const [countTransaction, setCountTransaction] = useState([])
    const [countUser, setCountUser] = useState([])
    const [countCategory, setCountCategory] = useState([])

    useEffect(() => {
        const fetchGoods = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const response = await axios.get('http://localhost:5000/goods/stats', config)
                setCountGoods(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchGoods()
    }, [])

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const response = await axios.get('http://localhost:5000/transactions', config)
                setCountTransaction(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchTransaction()
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const response = await axios.get('http://localhost:5000/users', config)
                setCountUser(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchUser()
    }, [])

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const response = await axios.get('http://localhost:5000/categories', config)
                setCountCategory(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchCategory()
    }, [])

    return (
        <div className='box-container'>
            <div className="row">
                <Box>
                    <div className='summary-box'>
                        <div className="summary-box__icon">
                            <FaBox size={50} />
                        </div>
                        <div className="summary-box__info">
                            <div className="summary-box__info__title">
                                <div>{data.summary[0].title}</div>
                                <span>{data.summary[0].subtitle}</span>
                            </div>

                            <div className="summary-box__info__value">
                                {countGoods.totalGoods}
                            </div>
                        </div>
                    </div>
                </Box>

                <Box>
                    <div className='summary-box'>
                        <div className="summary-box__icon">
                            <FaMoneyBillWave size={50} />
                        </div>
                        <div className="summary-box__info">
                            <div className="summary-box__info__title">
                                <div>{data.summary[1].title}</div>
                                <span>{data.summary[1].subtitle}</span>
                            </div>

                            <div className="summary-box__info__value">
                                {countTransaction.totalTransactions}
                            </div>
                        </div>
                    </div>
                </Box>
            </div>
            
            <div className="row">
                <Box>
                    <div className='summary-box'>
                        <div className="summary-box__icon">
                            <FaUsers size={50} />
                        </div>
                        <div className="summary-box__info">
                            <div className="summary-box__info__title">
                                <div>{data.summary[2].title}</div>
                                <span>{data.summary[2].subtitle}</span>
                            </div>

                            <div className="summary-box__info__value">
                                {countUser.totalUsers}
                            </div>
                        </div>
                    </div>
                </Box>

                <Box>
                    <div className='summary-box'>
                        <div className="summary-box__icon">
                            <FaTools size={50} />
                        </div>
                        <div className="summary-box__info">
                            <div className="summary-box__info__title">
                                <div>{data.summary[3].title}</div>
                                <span>{data.summary[3].subtitle}</span>
                            </div>

                            <div className="summary-box__info__value">
                                {countCategory.totalCategories}
                            </div>
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    )
}

export default SummaryBox