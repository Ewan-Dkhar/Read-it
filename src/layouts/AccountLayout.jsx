import React from 'react'
import { Link, Outlet, Navigate } from 'react-router-dom'
import '../styles/AccountLayout.css'
import { useAuth } from '../context/AuthContext'

const AccountLayout = () => {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return (
    <div className='flex gap-2' style={{minHeight: '70vh', padding: '0px'}}>
        <div className="side-nav" style={{width: '250px', background: '#ffffff', borderRadius: '0px', padding: '20px'}}>
            <ul style={{listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <Link to='' style={{textDecoration: 'none', color: '#333'}}>
                  <li style={{padding: '10px', background: 'white', borderRadius: '0px', fontWeight: 'bold'}}>Profile</li>
                </Link>
                <Link to='orders' style={{textDecoration: 'none', color: '#333'}}>
                   <li style={{padding: '10px', background: 'white', borderRadius: '0px', fontWeight: 'bold'}}>My Orders</li>
                </Link>
                <button 
                  onClick={logout} 
                  style={{marginTop: '20px', padding: '10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'}}
                >
                  Logout
                </button>
            </ul>
        </div>
        <div style={{flex: 1}}>
           <Outlet />
        </div>
    </div>
  )
}

export default AccountLayout