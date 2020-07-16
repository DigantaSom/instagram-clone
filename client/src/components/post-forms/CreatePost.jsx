import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import axios from 'axios';
// Redux
import { connect } from 'react-redux';
import { createPost } from '../../redux/actions/post';

const CreatePost = ({ createPost, history }) => {
    const [caption, setCaption] = useState('');
    const [file, setFile] = useState(''); // filepath will be stored here

    const fileSelectHandler = e => {
        setFile(e.target.files[0]);
    };

    const onSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        // caption, photo is from const file = req.files.photo , in routes/api/posts.js
        formData.append('caption', caption);
        formData.append('photo', file);

        createPost(formData, history);
    };

    return (
        <form className='create-post-form card' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
                <input type='file' onChange={e => fileSelectHandler(e)} required />
            </div>
            <div className='form-group'>
                <input
                    type='text'
                    placeholder='Caption'
                    value={caption}
                    onChange={e => setCaption(e.target.value)}
                />
            </div>
            <div className='form-group'>
                <button type='submit' className='btn btn-primary'>
                    Post
                </button>
            </div>
        </form>
    );
};

CreatePost.propTypes = {
    createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost })(withRouter(CreatePost));
