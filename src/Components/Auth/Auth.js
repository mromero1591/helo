import React, {Component} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

//CUSTOM IMORT
import {updateUsername, updatePassword,updateCurrentUser, clearLoginInfo} from '../../ducks/reducer';
//CSS & assest.
import heloLogo from '../../assest/helo_logo.png';

import './Auth.css';
class Auth extends Component {

    handleRegistration = () => {
        //get the username and password from state
        const {username, password} = this.props;

        //call the servers endpoint to register.
        Axios.post('/auth/register', {username,password})
        .then(res => {
            //set the new user in state
            const {username,profile_pic} = res.data;

            this.props.clearLoginInfo();
            this.props.updateCurrentUser({username,profile_pic});
            this.props.history.push('/dashboard');
        })
    }

    handleLogin = () => {
        const {username, password} = this.props;

        //call the servers endpoint to login
        Axios.post('/auth/login', {username, password})
        .then(res => {
            const {username, profile_pic} = res.data;    
            console.log(res.data);        
            this.props.clearLoginInfo();
            this.props.updateCurrentUser({username,profile_pic});
            this.props.history.push('/dashboard');
        }).catch(err => {
            if(err.response.status === 401) {
                this.props.clearLoginInfo();
                console.log('wrong user name and password')
            }
        })
    }

    render() {
        const {username, password, updateUsername,updatePassword} = this.props;
        return (
            <section className='authSection'>
                <div className='login-section'>
                    <div className='login-img'> <img src={heloLogo} alt="logo"/> </div>
                    <div className='login-title'> Helo </div>
                    <div className='login-username-group'>
                        <label>Username:</label>
                        <input value={username} onChange={e => {updateUsername(e.target.value)}} className='login-form-input' />
                    </div>
                    <div className='login-password-group'>
                        <label>Password:</label>
                        <input type='password' value={password} onChange={e => {updatePassword(e.target.value)}} className='login-form-input' />
                    </div>
                    <button onClick={this.handleLogin} className='btn btn-form btn-login'>Login</button>
                    <button onClick={this.handleRegistration} className='btn btn-form btn-register'>Register</button>

                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        id: state.id,
        username: state.username,
        password: state.password
    }
}

const mapDispatchToProps = {updateUsername,updatePassword,updateCurrentUser, clearLoginInfo};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);