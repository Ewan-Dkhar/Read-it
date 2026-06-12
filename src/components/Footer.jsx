import { Copyright} from 'lucide-react'
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import '../styles/Footer.css'

const Footer = () => {
    const [year, setYear] = useState(0);

    useEffect(() => {
        const date = new Date;
        setYear(date.getFullYear());
    }, [])

  return (
    <div className='footer'>
        <p><Copyright size={18} /> <span>{year} all rights reserved</span></p>
        <ul>
            <Link to='/about' className='hover-link'><li>About</li></Link>
            <Link to='/contact' className='hover-link'><li>Contact</li></Link>
            <Link to='/categories' className='hover-link'><li>Categories</li></Link>
        </ul>
    </div>
  )
}

export default Footer