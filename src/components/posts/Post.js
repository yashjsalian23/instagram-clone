import React from 'react';

import Avatar from '@material-ui/core/Avatar'

import './Post.css';

const Post = () => {
    return (
        <React.Fragment>
            <div className="post">
                <div className="post-header">
                    <Avatar className="post-avatar" 
                        alt="YashSalian"
                        src="/static/1.png"
                         />
                    <h3>Username</h3>
                </div>

                <img className="post-image"
                    src="https://www.freecodecamp.org/static/wide-image-f3e20fc9bd28e3cc95519402baf76826.png"
                    alt="body" />

                <p className="post-caption"><strong>yashjsalian</strong>: Redundant alt attribute. Screen-readers already announce `img` tags as an image. You don't need to use the words `image`, `photo,` or `picture` (or any specified custom words) in the alt prop</p>
            </div>
        </React.Fragment>
    );
};

export default Post;