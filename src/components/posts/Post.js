import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase';

import { db } from '../../config/firebase';

import './Post.css';

const Post = ({postId, username, caption, image, user}) => {

    const [comments, setComments ] = useState([]);
    const [comment, setComment ] = useState("");

    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db
            .collection('posts')
            .doc(postId)
            .collection("comments")
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map(doc => doc.data()));
            })
        }

        return () => {
            unsubscribe();
        }
    }, [postId]);

    const postComment = event => {
        event.preventDefault();

        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setComment('');
    }

    return (
        <React.Fragment>
            <div className="post">
                <div className="post-header">
                    <Avatar className="post-avatar" 
                        alt={username}
                        src="/static/1.png"
                         />
                    <h3>{username}</h3>
                </div>

                <img className="post-image"
                    src={image}
                    alt="body" />

                <p className="post-caption"><strong>{username}</strong>: {caption}</p>

                <div className="post-commentlist">
                    {
                        comments.map(comment => 
                            (<p key={comment.id} style={{marginBottom:10}}>
                                <strong>{comment.username}</strong>: {comment.text}
                            </p>)
                        )
                    }
                </div>

                {user && (<form className="post-comment-form">
                    <input className="post-comment-input"
                        type="text"
                        value={comment}
                        placeholder="Add a comment"
                        onChange={(event) => setComment(event.target.value)} 
                    />

                    <button className="post-comment-btn"
                       disabled={!comment}
                       type="submit"
                       onClick={postComment} >
                        Submit
                    </button>
                </form>)}
            </div>
        </React.Fragment>
    );
};

export default Post;