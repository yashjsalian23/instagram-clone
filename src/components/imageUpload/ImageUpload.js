import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import firebase from 'firebase';

import { db, storage } from '../../config/firebase';
import './ImageUpload.css';

const ImageUpload = ({username}) => {

    const [ caption, setCaption ] = useState("");
    const [ image, setImage ] = useState(null);
    const [ progress, setProgress ] = useState(0);

    const handleChange = (event) => {
        if(event.target.files[0]){
            setImage(event.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message)
            }, 
            () => {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    db.collection('posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption:caption,
                        image: url,
                        username: username
                    })
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                
                })
            }
        )
    }

    return (
        <React.Fragment>
            <progress value={progress} max="100" />
            <input className="imageupload-input"
                type="text"
                placeholder="Enter caption"
                value={caption}
                onChange={event => setCaption(event.target.value)} />

            <input
                type="file"
                onChange={handleChange} />

            <Button onClick={handleUpload}>
                Upload
            </Button>
        </React.Fragment>
    );
};

export default ImageUpload;