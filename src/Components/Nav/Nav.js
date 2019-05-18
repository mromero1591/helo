import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 
import {connect} from 'react-redux';

import {updateUser} from '../../ducks/userReducer';
//Custom imports
import './Nav.css';
import homeLogo from '../../assest/home_logo.png';
import newLogo from '../../assest/new_logo.png';
import shutDownLogo from '../../assest/shut_down.png';
import Axios from 'axios';

class Nav extends Component {

  logout = () => {
    Axios.get('/auth/logout');
  }

  componentDidMount() {
    Axios.get('/api/user').then(res => {
      console.log(res.data);
      var {id, username, profile_pic} = res.data;
      this.props.updateUser({
        id: id,
        username: username,
        profilePic: profile_pic
      })
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <nav className='navbar'>
        <img className='profile-pic' alt='profile pic' src={this.props.profilePic} />
        <div className='profile-name'>{this.props.username}</div>
        <Link to='/dashboard' className='btn-link btn-home'>
          <img src={homeLogo} alt='home logo'/>
        </Link>
        <Link to='form' className='btn-link btn-newpost'>
          <img src={newLogo} alt='new post logo'/>
        </Link>
        <Link onClick={this.logout} to='/' className='btn-link btn-logout'>
          <img  src={shutDownLogo} alt='log out log0'/>
        </Link>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.user.username,
    profilePic: state.user.profilePic,
    id: state.user.id
  }
}
const mapDispatchToProps = {updateUser};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);