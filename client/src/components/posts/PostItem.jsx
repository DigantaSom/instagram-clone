import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
// others
import DemoPostImg from '../../img/demo-img.jpg';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
import { unfollowUser } from '../../redux/actions/user';
import { deletePost, likePost, unlikePost } from '../../redux/actions/post';

const PostItem = ({
  post: { _id, user, caption, photo, date, likes },
  auth,
  unfollowUser,
  deletePost,
  likePost,
  unlikePost,
}) => {
  const [comment, setComment] = useState('');
  const [showOptionsMenu, toggleOptionsMenu] = useState(false);
  // const [isPostLiked, setIsPostLiked] = useState(false);

  let isPostLiked;

  if (likes.find(like => like.user === auth.user._id)) {
    isPostLiked = true;
  } else {
    isPostLiked = false;
  }

  const optionsMenuHandler = () => {
    toggleOptionsMenu(prevState => !prevState);
  };

  const likeUnlikePostHandler = post_id => {
    if (isPostLiked) {
      unlikePost(post_id);
    } else {
      likePost(post_id);
    }
  };

  return (
    <Fragment>
      <div className='card postItem' onDoubleClick={() => likeUnlikePostHandler(_id)}>
        {/* post top */}
        <div className='post-top'>
          <div className='post-top-left'>
            <div className='post-dp-container'>
              <Link to={`/${user._id}`} className='link-black'>
                {/* below 'user.username' should be changed to 'user.dp' */}
                {user.username && <img src={DemoPostImg} alt='DP' />}
              </Link>
            </div>
            <p className='post-username'>
              {user && (
                <Link to={`/${user._id}`} className='link-black'>
                  {user.username}
                </Link>
              )}
            </p>
          </div>
          <div className='post-top-right'>
            <div className='options' onClick={optionsMenuHandler}>
              <i className='fas fa-ellipsis-h'></i>
            </div>
          </div>
        </div>
        {/* options menu */}
        {showOptionsMenu && (
          <div className='post-options-menu'>
            {/* if authorized to delete */}
            {auth.user._id === user._id ? (
              <div
                className='post-options-menu-item red-text'
                onClick={() => deletePost(_id)}>
                Delete
              </div>
            ) : (
              // if following the user who posted this
              auth.user.following.some(f => f === user._id) && (
                <div
                  className='post-options-menu-item red-text'
                  onClick={() => unfollowUser(user._id)}>
                  Unfollow
                </div>
              )
            )}
            <div className='post-options-menu-item'>Go to post</div>
            <div className='post-options-menu-item'>Share</div>
            <div className='post-options-menu-item'>Copy Link</div>
            <div className='post-options-menu-item' onClick={optionsMenuHandler}>
              Cancel
            </div>
          </div>
        )}

        {/* post image */}
        <div className='post-img'>
          <img src={photo} alt='Post' />
        </div>
        <div className='post-body'>
          <div className='like-comment-buttons'>
            <div onClick={() => likeUnlikePostHandler(_id)}>
              <i className={`fas fa-heart ${isPostLiked && 'postLiked'}`}></i>
            </div>
            <div>
              <i className='fas fa-comment'></i>
            </div>
          </div>
          {likes.length > 0 && (
            <p className='num-of-likes'>
              {likes.length} {likes.length === 1 ? 'like' : 'likes'}
            </p>
          )}
          {caption && (
            <p>
              {user && (
                <Link to={`/${user._id}`} className='body-username link-black'>
                  {user.username}{' '}
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
    </Fragment>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  unfollowUser,
  deletePost,
  likePost,
  unlikePost,
})(PostItem);
