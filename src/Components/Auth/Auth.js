import React, {useState} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

import {updateUser} from '../../ducks/userReducer';


//CSS & assest.
import heloLogo from '../../assest/helo_logo.png';

const Auth = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = () => {
        //make a call to the login endpoint.
        Axios.post('/auth/login', {username, password})
        .then(res => {
            handleSucessfulAuth(res.data.user);
        }).catch( err => {
            console.log('there was an erro in logging in', err);
        })
    }
    const handleRegistration = () => {
        //make a call to the reg endpoint
        Axios.post('/auth/register', {username, password})
        .then( res => {
            handleSucessfulAuth(res.data.user);
        }).catch(err => {
            console.log('error in registering', err );
        })
    }

    const handleSucessfulAuth = (user) => {
        setUsername('');
        setPassword('');
        var {id, username, profile_pic} = user;

        props.updateUser({
            id: id,
            username: username,
            profilePic: profile_pic
        })
        props.history.push('/dashboard');
    }
    
    return (
        <section className='authSection'>
            <div className='login-section'>
                <div className='login-img'> <img src={heloLogo} alt="logo"/> </div>
                <div className='login-title'> Helo </div>
                <div className='login-group login-username-group'>
                    <label htmlFor='username'>
                        Username:
                        <input name='username' value={username} onChange={e => {setUsername(e.target.value)}} className='login-form-input' />
                    </label>
                    
                </div>
                <div className='login-group login-password-group'>
                    <label htmlFor='password'>
                        Password:
                        <input name='password' type='password' value={password} onChange={e => {setPassword(e.target.value)}} className='login-form-input' />
                    </label>
                </div>
                <button onClick={handleLogin} className='btn btn-form btn-login'>Login</button>
                <button onClick={handleRegistration} className='btn btn-form btn-register'>Register</button>

            </div>
        </section>
    )
}

const mapDispatchToProps = {updateUser};

export default connect(null, mapDispatchToProps )(Auth);