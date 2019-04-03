import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 
import {connect} from 'react-redux';


//Custom imports
import './Nav.css';
import homeLogo from '../../assest/home_logo.png';
import newLogo from '../../assest/new_logo.png';
import shutDownLogo from '../../assest/shut_down.png';
import {clearUserInfo} from '../../ducks/userReducer';

class Nav extends Component {
  
  handleLogout = () => { 
    this.props.clearUserInfo();
    console.log(this.props);

  }

  render() {
    return (
      <nav className='navbar'>
        <img className='profile-pic' src={this.props.user.profilePic} />
        <div className='profile-name'>{this.props.user.username}</div>
        <Link to='/dashboard' className='btn-link btn-home'>
          <img src={homeLogo} alt='home logo'/>
        </Link>
        <Link to='form' className='btn-link btn-newpost'>
          <img src={newLogo} alt='new post logo'/>
        </Link>
        <Link to='/' className='btn-link btn-logout'>
          <img  src={shutDownLogo} alt='log out log0' onClick={this.handleLogout}/>
        </Link>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.currentUser
  }
}

const mapDispatchToProps = {clearUserInfo};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);