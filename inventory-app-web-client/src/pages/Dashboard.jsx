import React, { useState, useEffect } from 'react'
import Box from '../components/box/Box'
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from '../components/dashboard-wrapper/DashboardWrapper'
import SummaryBox from '../components/summary-box/SummaryBox'
import { colors } from '../constants'
import OverallList from '../components/overall-list/OverallList'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts'
import axios from 'axios'
import MinimumStockGoods from '../components/min-stock-goods/MinimumStockGoods'

const Dashboard = () => {
    return (
        <DashboardWrapper>
            <DashboardWrapperMain>
                <div className="row">
                    <div className="col-12 col-md-12">
                        <div className="row">
                            <div className="col-12 col-md-12 col-sm-12 mb">
                                <SummaryBox />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="chart-stock">
                    <div className="col-12">
                        <Box>
                            <HighestStock />
                        </Box>
                    </div>
                </div>
            </DashboardWrapperMain>

            <DashboardWrapperRight>
                <div className="title mb">Overall</div>
                <div className="mb">
                    <OverallList />
                </div>
                <div className="title mb" style={{ marginTop: '45px' }}>Goods with Minimum Stock</div>
                <div className="mb">
                    <MinimumStockGoods />
                </div>
            </DashboardWrapperRight>
        </DashboardWrapper>
    )
}

const HighestStock = () => {
    const [countStock, setCountStock] = useState([])

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const response = await axios.get('http://localhost:5000/goods/stats', config)
                setCountStock(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchStock()
    }, [])

    return (
        <>
            <div className="title mb">
                Top 5 Goods with Highest Stock
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={countStock.topStockGoods}>
                    <defs>
                        <linearGradient id="topBorder" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="30%" style={{ stopColor: colors.purple, stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: colors.orange, stopOpacity: 0 }} />
                        </linearGradient>
                    </defs>
                    <Bar dataKey="stock" fill="url(#topBorder)" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}

export default Dashboard