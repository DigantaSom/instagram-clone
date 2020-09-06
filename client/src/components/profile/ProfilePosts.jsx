import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfilePosts = ({ posts }) => {
  return (
    <div className='userpost-container'>
      {posts.map(post => (
        <Link key={post._id} to={`/p/${post._id}`}>
          <div className='userpost-img-container'>
            <img src={post.photo} alt='Post' />
          </div>
        </Link>
      ))}
    </div>
  );
};

ProfilePosts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default ProfilePosts;
