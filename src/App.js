import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//Custom Components
import Nav from './Components/Nav/Nav';
import Dashboard from './Components/Dashboard/Dashboard';
import Form from './Components/Form/Form';
import Post from './Components/Post/Post';
import Auth from './Components/Auth/Auth';

class App extends Component {
  render() {
    return (
      <main className="App">
        <Nav />
        <Dashboard />
        <Post />
        <Form />
        <Auth />
      </main>
    );
  }
}

export default App;
