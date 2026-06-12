import { Copyright } from 'lucide-react'
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import '../styles/Footer.css'

const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());

    return (
        <footer className='footer-wrapper'>
            <div className='footer-container'>
                <div className='footer-copyright'>
                    <Copyright size={16} /> 
                    <span>{year} Read-It. All rights reserved.</span>
                </div>
                
                <ul className='footer-nav'>
                    <Link to='/about' className='footer-link'><li>About</li></Link>
                    <Link to='/contact' className='footer-link'><li>Contact</li></Link>
                    <Link to='/categories' className='footer-link'><li>Categories</li></Link>
                </ul>
            </div>
        </footer>
    )
}

export default Footer