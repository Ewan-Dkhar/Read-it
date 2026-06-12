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
        <nav className='navbar-wrapper'>
            <div className='navbar-container'>
                <Link to='/' className='logo-link'>
                    <h2 className='logo'>Read-It</h2>
                </Link>

                <div className="search-bar">
                    <Search size={18} className="search-icon" />
                    <input type="text" name='search' placeholder='Search titles, authors, genres...' />
                </div>

                <ul className="nav-links">
                    <Link to='/shop' className='hover-link'><li>Shop</li></Link>
                    <Link to='/categories' className='hover-link'><li>Categories</li></Link>
                    
                    {isAuthenticated ? (
                        <>
                            <Link to='/account' className='icon-link' title="Account">
                                <li><UserRound size={20} /></li>
                            </Link>
                            <Link to='/cart' className='icon-link' title="Cart">
                                <li><ShoppingBasket size={20} /></li>
                            </Link>
                        </>
                    ) : (
                        <div className="auth-buttons">
                            <Link to='/login' className='login-btn'>
                                Sign In
                            </Link>
                            <Link to='/register' className='register-btn'>
                                Sign Up
                            </Link>
                        </div>
                    )}
                </ul>

                <div className="nav-icons-mobile">
                    <Search size={20}/>
                    <Menu size={20} onClick={handleShowMenu}/>
                </div>
            </div>

            {showMenu && <SideMenu setShowMenu={setShowMenu} />}
        </nav>
    )
}

export default Navbar