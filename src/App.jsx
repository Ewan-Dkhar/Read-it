import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Contact from './pages/Contact'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Categories from './pages/Categories'
import Profile from './pages/Profile/Profile'
import EditProfile from './pages/Profile/EditProfile'
import './styles/App.css'
import Footer from './components/Footer'
import AccountLayout from './layouts/AccountLayout'
import MyOrders from './pages/MyOrders'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return (
    <>
    <div className="container">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/account' element={<AccountLayout />}>
          <Route index element={<Profile />} />
          <Route path='orders' element={<MyOrders />} />
          <Route path='edit-profile' element={<EditProfile />} />
        </Route>
        <Route path='/checkout/:id' element={<Checkout />}/>
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer />
    </div>
    </>
  )
}

export default App

