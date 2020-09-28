import React, { Component } from 'react';

import Post from './components/posts/Post';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <img classname="app-header-image"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram" />
        </div>
        <Post />
      </div>
    );
  }
}

export default App;
