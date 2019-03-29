import React, { Component } from 'react';
import './App.css';


//Custom Components
import Nav from './Components/Nav/Nav';
import Dashboard from './Components/Dashboard/Dashboard';
import Form from './Components/Form/Form';
import Post from './Components/Post/Post';
import Auth from './Components/Auth/Auth';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <main className="App">
        {routes}
      </main>
    );
  }
}

export default App;
