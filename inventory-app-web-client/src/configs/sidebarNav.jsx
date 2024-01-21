const sidebarNav = [
    {
        link: '/',
        section: 'dashboard',
        icon: <i className='bx bx-home-alt'></i>,
        text: 'Dashboard',
        allowedUserTypes: [0, 1, 2]
    },
    {
        link: '/users',
        section: 'users',
        icon: <i className='bx bx-user'></i>,
        text: 'Users',
        allowedUserTypes: [0]
    },
    {
        link: '/transactions',
        section: 'transactions',
        icon: <i className='bx bx-receipt' ></i>,
        text: 'Transactions',
        allowedUserTypes: [0, 1, 2]
    },
    {
        link: '/category-type-unit',
        section: 'category-type-unit',
        icon: <i className='bx bx-cube'></i>,
        text: 'Category / Type / Unit',
        allowedUserTypes: [0, 1, 2]
    },
    {
        link: '/goods',
        section: 'goods',
        icon: <i className='bx bx-cube'></i>,
        text: 'Goods',
        allowedUserTypes: [0, 1, 2]
    }
]

export default sidebarNav