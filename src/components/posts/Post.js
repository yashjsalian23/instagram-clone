import React from 'react';

import Avatar from '@material-ui/core/Avatar'

import './Post.css';

const Post = ({username, caption, image}) => {
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
            </div>
        </React.Fragment>
    );
};

export default Post;