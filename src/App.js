import React, { useState, useEffect } from 'react';

import Post from './components/posts/Post';
import {db} from './config/firebase';

import './App.css';

const App = () =>   {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()));
    })
  }, []);
    
  

  

    return (
      <div className="app">
        <div className="app-header">
          <img classname="app-header-image"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram" />
        </div>

        {
          posts.map(post => (
            <Post username={post.username}
              caption={post.caption}
              image={post.image} />
          ))
        }
      </div>
    );
  }

export default App;
