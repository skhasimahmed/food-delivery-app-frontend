import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const navigate = useNavigate()

    return (
        <div className='footer' id='contact-us'>
            <div className="footer-content">
                <div className='footer-content-left'>
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                    <div className='footer-social-icons'>
                        <img src={assets.facebook_icon} alt="Facebook Icon" />
                        <img src={assets.twitter_icon} alt="Twitter Icon" />
                        <img src={assets.linkedin_icon} alt="LinkedIn Icon" />
                    </div>
                </div>
                <div className='footer-content-center'>
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 99999 00000</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright-text'>Copyright {currentYear} &copy; <span onClick={() => navigate('/')}>Tomato</span> - All Right Reserved.</p>
        </div>
    )
}

export default Footer
