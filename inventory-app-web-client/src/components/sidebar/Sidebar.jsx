import React, { useState, useEffect } from 'react'
import './sidebar.scss'
import { Link, useLocation } from 'react-router-dom'
import { images } from '../../constants'
import sidebarNav from '../../configs/sidebarNav'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const location = useLocation()
    const navigate = useNavigate()
    const role = parseInt(localStorage.getItem('role'), 10)

    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNav.findIndex((item) => item.section === curPath);
        const role = localStorage.getItem('role')
    
        if (role == 0) {
            setActiveIndex(curPath.length === 0 ? 0 : activeItem)
        } else {
            setActiveIndex(curPath.length === 0 ? 0 : activeItem - 1)
        }
    }, [location, sidebarNav]);  

    const closeSidebar = () => {
        document.querySelector('.main__content').style.transform = 'scale(1) translateX(0)'
        setTimeout(() => {
            document.body.classList.remove('sidebar-open')
            document.querySelector('.main__content').style = ''
        }, 500);
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/login')
    }

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <img src={images.logo} alt='logo' />
                <div className="sidebar-close" onClick={closeSidebar}>
                    <i className='bx bx-x'></i>
                </div>
            </div>

            <div className="sidebar__menu">
                {
                    sidebarNav
                        .filter((nav) => nav.allowedUserTypes.includes(role))
                        .map((nav, index) => (
                            <Link 
                                to={nav.link} 
                                key={`nav-${index}`} 
                                className={`sidebar__menu__item ${activeIndex === index && 'active'}`}
                                onClick={closeSidebar}
                            >
                                <div className="sidebar__menu__item__icon">
                                    {nav.icon}
                                </div>
                                <div className="sidebar__menu__item__txt">
                                    {nav.text}
                                </div>
                            </Link>
                    ))
                }

                <div className="sidebar__menu__item">
                    <div className="sidebar__menu__item__icon">
                        <i className='bx bx-log-out'></i>
                    </div>
                    <div className="sidebar__menu__item__txt" onClick={() => handleLogout()}>
                        Logout
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar