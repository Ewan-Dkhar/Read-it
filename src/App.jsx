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
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import ManageBooks from './pages/Admin/ManageBooks'
import AddBook from './pages/Admin/AddBook'
import ManageUsers from './pages/Admin/ManageUsers'
import ManageCategories from './pages/Admin/ManageCategories'
import AddCategory from './pages/Admin/AddCategory'
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
        
        {/* User Account Routes */}
        <Route path='/account' element={<AccountLayout />}>
          <Route index element={<Profile />} />
          <Route path='orders' element={<MyOrders />} />
          <Route path='edit-profile' element={<EditProfile />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='books' element={<ManageBooks />} />
          <Route path='books/add' element={<AddBook />} />
          <Route path='books/edit/:id' element={<AddBook />} />
          <Route path='users' element={<ManageUsers />} />
          <Route path='categories' element={<ManageCategories />} />
          <Route path='categories/add' element={<AddCategory />} />
          <Route path='categories/edit/:id' element={<AddCategory />} />
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

