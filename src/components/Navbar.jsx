import React, { useState } from 'react'
import { Menu, Search, ShoppingBasket, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import SideMenu from './SideMenu'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false)
    const { isAuthenticated } = useAuth()

    const handleShowMenu = () => {
        setShowMenu(true)
    }
  return (
    <div className='navbar'>
        <Link to='/' className='rm-pad'><h2 className='logo'>Read-It</h2></Link>
        <div className="search-bar">
            <input type="text" name='search' placeholder='search' />
            <Search />
        </div>
        <ul style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <Link to='/shop' className='hover-link'><li>Shop</li></Link>
            <Link to='/categories' className='hover-link'><li>Categories</li></Link>
            
            {isAuthenticated ? (
                <>
                    <Link to='/account' className='hover-link'>
                        <li style={{display: 'flex', alignItems: 'center'}}>
                            <UserRound />
                        </li>
                    </Link>
                    <Link to='/cart' className='hover-link'>
                        <li style={{display: 'flex', alignItems: 'center'}}>
                            <ShoppingBasket />
                        </li>
                    </Link>
                </>
            ) : (
                <>
                    <Link to='/login' className='hover-link'>
                        <li style={{fontWeight: 'bold'}}>Sign In</li>
                    </Link>
                    <Link to='/register' style={{textDecoration: 'none'}}>
                        <li style={{background: '#2563eb', color: 'white', padding: '8px 15px', borderRadius: '5px', fontWeight: 'bold'}}>
                            Sign Up
                        </li>
                    </Link>
                </>
            )}
        </ul>
        <div className="nav-icons">
            <Search size={18}/>
            <Menu size={18} onClick={handleShowMenu}/>
        </div>

        {showMenu && <SideMenu setShowMenu={setShowMenu} />}
        
    </div>
  )
}

export default Navbar