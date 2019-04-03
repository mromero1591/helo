import React, {Component} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

//CUSTOM IMORT
import {updateUsername, updatePassword, updateCurrentUser, clearLoginInfo} from '../../ducks/userReducer';
import {getCookieValue} from '../../cokkies';
//CSS & assest.
import heloLogo from '../../assest/helo_logo.png';

import './Auth.css';
class Auth extends Component {

    componentDidMount() {
        //if a user is logged in then redirect to the dashboard.
        const id = getCookieValue("userid");
        if(id) {
            this.props.history.push('/dashboard');
        }
    }

    handleRegistration = () => {
        //get the username and password from state
        const {username, password} = this.props;

        //call the servers endpoint to register.
        Axios.post('/auth/register', {username,password})
        .then(res => {
            //set the new user in state
            const {id,username,profile_pic} = res.data;

            //clear the login info and set it on cookies, to persist
            this.props.clearLoginInfo();
            document.cookie = `userid=${id}`; 
            document.cookie = `username=${username}`; 
            document.cookie = `profile_pic=${profile_pic}`;
            
            //update redux to keep track of the current user.
            this.props.updateCurrentUser({id,username,profile_pic});

            //push to dashbord.
            this.props.history.push('/dashboard');
        })
    }

    handleLogin = () => {
        const {username, password} = this.props;

        //call the servers endpoint to login.
        Axios.post('/auth/login', {username, password})
        .then(res => {

            //get the id username and profile picture from the axios call.
            const {id, username, profile_pic} = res.data;

            //clear the login info and set it on cookies, to persist
            this.props.clearLoginInfo();
            document.cookie = `userid=${id}`; 
            document.cookie = `username=${username}`; 
            document.cookie = `profile_pic=${profile_pic}`;

            //update redux to keep track of the current user.
            this.props.updateCurrentUser({id,username,profile_pic});

            //push to dashbord.
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
        username: state.user.username,
        password: state.user.password
    }
}

const mapDispatchToProps = {updateUsername,updatePassword,updateCurrentUser, clearLoginInfo};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);