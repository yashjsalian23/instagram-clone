import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import InstagramEmbed from 'react-instagram-embed';

import Post from './components/posts/Post';
import { db, auth } from './config/firebase';
import ImageUpload from './components/imageUpload/ImageUpload';

import './App.css';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const App = () =>   {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [isSignupOpen, setIsSignupOpen] = useState(false); 
  const [isSigninOpen, setIsSigninOpen] = useState(false); 
  const [modalStyle] = useState(getModalStyle);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if(authUser){
        setUser(authUser);
        console.log(authUser);

        if(!authUser.displayName){
          return authUser.updateProfile({
            displayName: username
          });
        }

      } else {
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, username])

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({id: doc.id, post: doc.data()})));
    })
  }, []);

  const signup = event => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .catch(err => alert(err.message));

    setIsSignupOpen(false);
  }
  
  const signin = event => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch(err => alert(err.message));

    setIsSigninOpen(false);
  }

  return (
    <div className="app">
      <Modal 
        open={isSignupOpen}
        onClose={() => setIsSignupOpen(false)} >
        <div style={modalStyle} className={classes.paper}>
          <center >
            <img className="app-header-image"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
              alt="instagram" />

            <form id="app-signup-form" onSubmit={signup} >
              <input 
                className="app-input"
                type="text"
                placeholder="username"
                value={username}
                onChange={event => setUsername(event.target.value)}
                 /> 

              <input 
                className="app-input"
                type="email"
                placeholder="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                 /> 

              <input 
                className="app-input"
                type="password"
                placeholder="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                 /> 

                <Button type="submit">Submit</Button>
            </form>
          </center>
        </div>
      </Modal>

      <Modal 
        open={isSigninOpen}
        onClose={() => setIsSigninOpen(false)} >
        <div style={modalStyle} className={classes.paper}>
          <center >
            <img className="app-header-image"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
              alt="instagram" />

            <form id="app-signup-form" onSubmit={signin} >
              <input 
                className="app-input"
                type="email"
                placeholder="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                 /> 

              <input 
                className="app-input"
                type="password"
                placeholder="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                 /> 

                <Button type="submit">Submit</Button>
            </form>
          </center>
        </div>
      </Modal>

      <div className="app-header">
        <img className="app-header-image"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
        alt="instagram" />
        {
          !user ? (
            <div>
              <Button onClick={() => setIsSignupOpen(true)}>Sign up</Button>
              <Button onClick={() => setIsSigninOpen(true)}>Sign in</Button>
            </div>
          ) : (
            <Button onClick={() => auth.signOut()}>Logout</Button>
          )
        }
        
      </div>

      <div className="app-posts">
        <div className="app-posts-left">
          {
            posts.map(({id, post}) => (
              <Post key={id}
                postId={id}
                username={post.username}
                caption={post.caption}
                image={post.image} />
            ))
          }
        </div>
        <div className="app-posts-right">
          <InstagramEmbed
            url='https://instagr.am/p/Zw9o4/'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>

      </div>

      {
        user? (
          <ImageUpload username={user.displayName} />
        ) : (
          <h1 style={{textAlign:"center"}}>You need to Login to upload</h1>
        )
      }
    </div>
  );
}

export default App;
