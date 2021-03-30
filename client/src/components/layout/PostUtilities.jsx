import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
// others
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
import { likePost, unlikePost, addComment } from '../../redux/actions/post';

const PostUtilities = ({
  auth,
  post_id,
  post_likes,
  post_user,
  post_caption,
  post_date,
  likePost,
  unlikePost,
  addComment,
}) => {
  const [comment, setComment] = useState('');

  let isPostLiked;

  if (auth && auth.user) {
    if (post_likes.find(like => like.user === auth.user._id)) {
      isPostLiked = true;
    } else {
      isPostLiked = false;
    }
  }

  const likeUnlikePostHandler = post_id => {
    if (isPostLiked) {
      unlikePost(post_id);
    } else {
      likePost(post_id);
    }
  };

  const addCommentHandler = (post_id, comment) => {
    addComment(post_id, comment);
    setComment('');
  };

  return (
    <Fragment>
      <div className='post-body'>
        <div className='like-comment-buttons'>
          <div onClick={() => likeUnlikePostHandler(post_id)}>
            <i className={`fas fa-heart ${isPostLiked && 'postLiked'}`}></i>
          </div>
          <Link to={`/p/${post_id}`}>
            <i className='fas fa-comment'></i>
          </Link>
        </div>
        {post_likes.length > 0 && (
          <p className='num-of-likes'>
            {post_likes.length} {post_likes.length === 1 ? 'like' : 'likes'}
          </p>
        )}
        {post_caption && (
          <p>
            {post_user && (
              <Link to={`/${post_user._id}`} className='body-username link-black'>
                {post_user.username}{' '}
              </Link>
            )}
            {post_caption}
          </p>
        )}
        {post_date && (
          <p className='post-body-date'>
            <Moment fromNow>{post_date}</Moment>
          </p>
        )}
      </div>
      <form className='add-comment' onSubmit={e => e.preventDefault()}>
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
          onClick={() => addCommentHandler(post_id, comment)}>
          Post
        </button>
      </form>
    </Fragment>
  );
};

PostUtilities.propTypes = {
  auth: PropTypes.object.isRequired,
  post_id: PropTypes.string.isRequired,
  post_likes: PropTypes.array.isRequired,
  post_user: PropTypes.object.isRequired,
  post_caption: PropTypes.string.isRequired,
  post_date: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { likePost, unlikePost, addComment })(
  PostUtilities
);
