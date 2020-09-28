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
        
        <Post username="yashjsalian" 
          caption="Redundant alt attribute. Screen-readers already announce `img` tags as an image. You don't need to use the words `image`, `photo,` or `picture` (or any specified custom words) in the alt prop"
          image="https://www.freecodecamp.org/static/wide-image-f3e20fc9bd28e3cc95519402baf76826.png" />
        <Post username="yashjsalian" 
          caption="Redundant alt attribute. Screen-readers already announce `img` tags as an image. You don't need to use the words `image`, `photo,` or `picture` (or any specified custom words) in the alt prop"
          image="https://www.freecodecamp.org/static/wide-image-f3e20fc9bd28e3cc95519402baf76826.png" />
        <Post username="yashjsalian" 
          caption="Redundant alt attribute. Screen-readers already announce `img` tags as an image. You don't need to use the words `image`, `photo,` or `picture` (or any specified custom words) in the alt prop"
          image="https://www.freecodecamp.org/static/wide-image-f3e20fc9bd28e3cc95519402baf76826.png" />
      </div>
    );
  }
}

export default App;
