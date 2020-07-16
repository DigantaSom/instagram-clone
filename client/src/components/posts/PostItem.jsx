import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DemoPostImg from '../../img/demo-img.jpg';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const PostItem = ({
    post: {
        user: { _id, dp, username },
        caption,
        photo,
        date,
    },
}) => {
    const [comment, setComment] = useState('');

    return (
        <div className='card postItem'>
            <div className='post-top'>
                <div className='post-top-left'>
                    <div className='post-dp-container'>
                        <Link to={`/${_id}`} className='link-black'>
                            {/* below 'username' should be changed to dp */}
                            {username && <img src={DemoPostImg} alt='DP' />}
                        </Link>
                    </div>
                    <p className='post-username'>
                        {username && (
                            <Link to={`/${_id}`} className='link-black'>
                                {username}
                            </Link>
                        )}
                    </p>
                </div>
                <div className='post-top-right'>
                    <span className='options'>
                        <i className='fas fa-ellipsis-h'></i>
                    </span>
                </div>
            </div>
            <div className='post-img'>
                <img src={photo} alt='Post' />
            </div>
            <div className='post-body'>
                <div className='like-comment-buttons'>
                    <i className='fas fa-heart'></i>
                    <i className='fas fa-comment'></i>
                </div>
                {caption && (
                    <p>
                        {username && (
                            <Link to={`/${_id}`} className='body-username link-black'>
                                {username}{' '}
                            </Link>
                        )}
                        {caption}
                    </p>
                )}
                {date && (
                    <p className='post-body-date'>
                        <Moment fromNow>{date}</Moment>
                    </p>
                )}
            </div>
            <div className='add-comment'>
                <input
                    type='text'
                    placeholder='Add a comment...'
                    className='comment-input'
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <button
                    className='btn comment-btn'
                    disabled={comment === '' ? true : false}
                    onClick={() => console.log('comment posted')}>
                    Post
                </button>
            </div>
        </div>
    );
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
};

export default PostItem;
