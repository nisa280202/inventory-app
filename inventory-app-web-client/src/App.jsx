import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MainLayout from './layout/MainLayout'
import Login from './pages/login/Login'
import Transactions from './pages/Transactions'
import Users from './pages/Users'
import Goods from './pages/Goods'
import DetailTransaction from './pages/DetailTransaction'
import CategoryTypeUnit from './pages/CategoryTypeUnit'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <MainLayout /> }>
          <Route index element={ <Dashboard /> } />
          <Route path='users' element={ <Users /> } />
          <Route path='transactions' element={ <Transactions /> } />
          <Route path='transactions/:uuid' element={ <DetailTransaction /> } />
          <Route path='goods' element={ <Goods /> } />
          <Route path='category-type-unit' element={ <CategoryTypeUnit /> } />
        </Route>
        <Route path='/login' element={ <Login /> }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
