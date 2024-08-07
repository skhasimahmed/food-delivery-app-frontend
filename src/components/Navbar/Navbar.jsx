import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {
    const { getTotalCartAmount } = useContext(StoreContext)
    const [menu, setMenu] = useState('home')

    return (
        <div className='navbar'>
            <Link to='/'>
                <img src={assets.logo} alt="Logo" />
            </Link>

            <ul className='navbar-menu'>
                <Link to='/' onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>Menu</a>
                <a href='#mobile-app-download' onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>Mobile App</a>
                <a href='#contact-us' onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>Contact Us</a>
            </ul>

            <div className='navbar-right'>
                <img src={assets.search_icon} alt="Search Icon" title='Search' />
                <div className='navbar-basket-icon'>
                    <Link to='/cart'>
                        <img src={assets.basket_icon} alt="Basket Icon" title='Cart' />
                    </Link>

                    {
                        getTotalCartAmount() > 0 ? <div className='dot'></div> : null
                    }
                </div>
                <button onClick={() => setShowLogin(true)}>Sign In</button>
            </div>
        </div>
    )
}

export default Navbar
