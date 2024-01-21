import React, { useState, useEffect } from 'react'
import ProgressBar from '../progress-bar/ProgressBar'
import './min-stock-goods.scss'
import axios from 'axios'

const MinimumStockGoods = () => {
    const [minimumStock, setMinimumStock] = useState([])

    useEffect(() => {
        const fetchMinimumStock = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const response = await axios.get('http://localhost:5000/goods/stats', config)
                setMinimumStock(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchMinimumStock()
    }, [])

    return (
        <ul className='revenue-list'>
            {minimumStock.bottomStockGoods &&
                minimumStock.bottomStockGoods.map((item, index) => (
                    <li className='revenue-list__item' key={index}>
                        <div className="revenue-list__item__title">
                            {item.name}
                            <span className={`${item.stock < 50 ? 'txt-danger' : 'txt-success'}`}>
                                {item.stock}
                            </span>
                        </div>
                        <div>
                            <ProgressBar value={item.stock} />
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default MinimumStockGoods
