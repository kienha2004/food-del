import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route} from 'react-router-dom'
import Add from './pages/Add/Add'
import Orders from './pages/Orders/Orders'
import List from './pages/List/List'
import AddPromotion from './pages/Promotions/AddPromotion'
import ListPromotion from './pages/Promotions/ListPromotion'
import AddDriver from './pages/Drivers/AddDriver'
import ListDrivers from './pages/Drivers/ListDrivers'
import Transactions from './pages/Transactions/Transactions'
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'
const App = () => {
   const url = "http://localhost:4000"
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path ="/add" element={<Add url={url}/>}/>
          <Route path ="/list" element={<List url={url}/>}/>
          <Route path ="/orders" element={<Orders url={url}/>}/>
          <Route path ="/add-promotion" element={<AddPromotion url={url}/>}/>
          <Route path ="/list-promotion" element={<ListPromotion url={url}/>}/>
          <Route path ="/add-driver" element={<AddDriver url={url}/>}/>
          <Route path ="/list-drivers" element={<ListDrivers url={url}/>}/>
          <Route path ="/transactions" element={<Transactions url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
