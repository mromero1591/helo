import React, {Component} from 'react';

class Auth extends Component {
    render() {
        return (
            <section className='authSection'>
                <div className='login-section'>
                    <div className='login-img'> smile </div>
                    <div className='login-title'> Helo </div>
                    <div className='login-form'>
                        <div className='login-group'>
                            <label>Username:</label>
                            <input className='login-form-input' />
                        </div>
                        <div className='login-group'>
                            <label>Password:</label>
                            <input className='login-form-input' />
                        </div>
                    </div>
                    <button>Login</button>
                    <button>Register</button>
                </div>
            </section>
        )
    }
}

export default Auth;