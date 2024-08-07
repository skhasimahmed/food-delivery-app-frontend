import React, { useState } from 'react'
import './SignInSignUpPopup.css'
import { assets } from '../../assets/assets'

const SignInSignUpPopup = ({ setShowLogin }) => {
    const [currentState, setCurrentState] = useState('Sign In')
    return (
        <div className='sign-in-sign-up-popup'>
            <form className='sign-in-sign-up-popup-container'>
                <div className='sign-in-sign-up-popup-title'>
                    <h2>{currentState}</h2>
                    <img src={assets.cross_icon} alt="Cross Icon" onClick={() => setShowLogin(false)} />
                </div>
                <div className="sign-in-sign-up-popup-inputs">
                    {
                        currentState === 'Sign Up' ? <input type="text" placeholder='Your name' required /> : null
                    }

                    <input type="email" placeholder='Your email' required />
                    <input type="password" placeholder='Password' required />
                </div>
                <button>
                    {
                        currentState === 'Sign Up' ? 'Create Account' : 'Sign In'
                    }
                </button>
                <div className="sign-in-sign-up-popup-terms-condition">
                    <input type="checkbox" required />
                    <p>
                        By continuing, I agree to the terms of use & privacy policy.
                    </p>
                </div>

                {
                    currentState === 'Sign Up' ? <p onClick={() => setCurrentState('Sign In')}>Already have an account? <span>Login here</span></p> : <p onClick={() => setCurrentState('Sign Up')}>Do not have an account? <span>Register here</span></p>
                }
            </form>
        </div>
    )
}

export default SignInSignUpPopup
