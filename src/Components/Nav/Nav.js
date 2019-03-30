import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 

//Custom imports
import './Nav.css';
import homeLogo from '../../assest/home_logo.png';
import newLogo from '../../assest/new_logo.png';
import shutDownLogo from '../../assest/shut_down.png';

class Nav extends Component {
  render() {
    return (
      <nav className='navbar'>
        <Link className='btn-link btn-home' to='/dashboard'><img src={homeLogo} /></Link>
        <Link className='btn-link btn-newpost' to='/form'><img src={newLogo}/></Link>
        <Link to='/' className='btn-link btn-logout'><img src={shutDownLogo}/></Link>
      </nav>
    )
  }
}

export default Nav;