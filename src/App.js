import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

import Post from './components/posts/Post';
import {db} from './config/firebase';

import './App.css';
import { Button } from '@material-ui/core';

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
  const [isOpen, setIsOpen] = useState(false); 
  const [modalStyle] = React.useState(getModalStyle);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({id: doc.id, post: doc.data()})));
    })
  }, []);

  

  return (
    <div className="app">
      <Modal 
        open={isOpen}
        onClose={() => setIsOpen(false)} >
        <div style={modalStyle} className={classes.paper}>Modal instagram</div>
      </Modal>

      

      <div className="app-header">
        <img classname="app-header-image"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram" />
        <Button onClick={() => setIsOpen(true)}>Sign up</Button>
      </div>

      {
        posts.map(({id, post}) => (
          <Post key={id}
            username={post.username}
            caption={post.caption}
            image={post.image} />
        ))
      }
    </div>
  );
}

export default App;
