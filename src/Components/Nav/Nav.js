import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 

//Custom imports
import './Nav.css';

class Nav extends Component {
  render() {
    return (
      <nav className='navbar'>
        <Link to='/dashboard'><button>Home</button></Link>
        <Link to='/form'><button>New Post</button></Link>
        <Link to='/'><button>Logout</button></Link>
      </nav>
    )
  }
}

export default Nav;