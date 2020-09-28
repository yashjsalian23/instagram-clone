import React, { Component } from 'react';

import Post from './components/posts/Post';

import './App.css';

class App extends Component {

  state = {
    posts: [
      {
        username:"yashjsalian",
        caption: "Hi caption works",
        image: "https://www.perfectdogbreeds.com/wp-content/uploads/2020/05/Small-Golden-Retriever.jpg"
      },
      {
        username:"yashjsalian",
        caption: "Hi caption works",
        image: "https://thehappypuppysite.com/wp-content/uploads/2018/07/how-long-do-golden-retrievers-live-KH-long.jpg"
      }
    ]
  }

  render() {

    return (
      <div className="app">
        <div className="app-header">
          <img classname="app-header-image"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram" />
        </div>
        
        {
          this.state.posts.map(post => (
            <Post username={post.username}
              caption={post.caption}
              image={post.image} />
          ))
        }
      </div>
    );
  }
}

export default App;
