import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import './App.css';


//Custom Components
import Nav from './Components/Nav/Nav';
import routes from './routes';

class App extends Component {
  render() {
    const NavBar = withRouter(props => {
      return (
        props.location.pathname !== '/' ? <Nav /> : <div></div>
      )
    })
    return (
      <main className="App">
        <NavBar />
        {routes} 
      </main>
    );
  }
}

export default App;
