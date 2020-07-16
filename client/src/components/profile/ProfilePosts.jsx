import React from 'react';
import PropTypes from 'prop-types';

const ProfilePosts = ({ posts }) => {
    return (
        <div className='userpost-container'>
            {posts.map(post => (
                <div key={post._id} className='userpost-img-container'>
                    <img src={post.photo} alt='Post' />
                </div>
            ))}
        </div>
    );
};

ProfilePosts.propTypes = {
    posts: PropTypes.array.isRequired,
};

export default ProfilePosts;
