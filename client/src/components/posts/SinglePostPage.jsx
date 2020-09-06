import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
// components
import PostUtilities from '../layout/PostUtilities';
import Comments from './Comments';
import PopupOptions from '../layout/PopupOptions';
// others
import { Link } from 'react-router-dom';
import demo_dp from '../../img/demo-img.jpg';
import Loader from '../layout/Loader';
// redux
import { connect } from 'react-redux';
import { getPostByPostId } from '../../redux/actions/post';
import { followUser } from '../../redux/actions/user';

const SinglePostPage = ({
  getPostByPostId,
  match: {
    params: { post_id },
  },
  post,
  auth,
  followUser,
}) => {
  const [showOptionsMenu, toggleOptionsMenu] = useState(false);

  useEffect(() => {
    getPostByPostId(post_id);
  }, [getPostByPostId, post_id]);

  const optionsMenuHandler = () => {
    toggleOptionsMenu(prevState => !prevState);
  };

  return post === null ? (
    <Loader />
  ) : (
    <div className='single-post-container'>
      {/* options menu */}
      {showOptionsMenu && (
        <PopupOptions
          post_id={post._id}
          post_user={post.user}
          onCancelMenu={optionsMenuHandler}
        />
      )}
      {/* reusing 'post-img' className from PostItem.jsx */}
      {/* Single Post Image (Left) */}
      <div className='post-img'>
        <img src={post.photo} alt='Post' />
      </div>

      {/* Single Post Details (Right) */}
      <div className='single-post-details'>
        {/* Single Post (Right-Top) Info */}
        <div className='single-post-info'>
          <img src={demo_dp} alt='DP' />
          <Link to={`/${post.user._id}`} className='link-black'>
            <p>{post.user.username}</p>
          </Link>
          {auth && auth.user && auth.user._id !== post.user._id && (
            <Fragment>
              <p>.</p>
              <p>
                {auth.user.following.some(f => f === post.user._id) ? (
                  'Following'
                ) : (
                  <button
                    className='btn btn-primary'
                    onClick={() => followUser(post.user._id)}>
                    Follow
                  </button>
                )}
              </p>
            </Fragment>
          )}
          <div className='options' onClick={optionsMenuHandler}>
            <i className='fas fa-ellipsis-v'></i>
          </div>
        </div>

        {/* Single Post (Right-Middle) Comment section */}
        <Comments post_id={post._id} comments={post.comments} />

        {/* Single Post (Right-Bottom) Utilities */}
        <PostUtilities
          post_id={post._id}
          post_likes={post.likes}
          post_user={post.user}
          post_caption={post.caption}
          post_date={post.date}
        />
      </div>
    </div>
  );
};

SinglePostPage.propTypes = {
  getPostByPostId: PropTypes.func.isRequired,
  post: PropTypes.object,
  auth: PropTypes.object.isRequired,
  followUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  post: state.post.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPostByPostId,
  followUser,
})(SinglePostPage);
