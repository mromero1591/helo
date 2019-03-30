import React, {Component} from 'react';
import heloLogo from '../../assest/helo_logo.png';

import './Auth.css';

class Auth extends Component {
    render() {
        return (
            <section className='authSection'>
                <div className='login-section'>
                    <div className='login-img'> <img src={heloLogo} alt="logo"/> </div>
                    <div className='login-title'> Helo </div>
                    <div className='login-username-group'>
                        <label>Username:</label>
                        <input className='login-form-input' />
                    </div>
                    <div className='login-password-group'>
                        <label>Password:</label>
                        <input className='login-form-input' />
                    </div>
                    <button className='btn btn-form btn-login'>Login</button>
                    <button className='btn btn-form btn-register'>Register</button>

                </div>
            </section>
        )
    }
}

export default Auth;