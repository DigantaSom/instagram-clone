import React, { useState } from 'react';
import PropTypes from 'prop-types';
// others
import demo_dp from '../../img/demo-img.jpg';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
// redux
import { connect } from 'react-redux';
import { deleteComment, likeOrUnlikeComment } from '../../redux/actions/post';

const CommentItem = ({ auth, deleteComment, likeOrUnlikeComment, post_id, comment }) => {
  const [showOptionsMenu, toggleOptionsMenu] = useState(false);

  const optionsMenuHandler = () => {
    toggleOptionsMenu(prevState => !prevState);
  };

  let isCommentLiked;

  if (auth && auth.user) {
    if (comment.comment_likes.find(like => like.user === auth.user._id)) {
      isCommentLiked = true;
    } else {
      isCommentLiked = false;
    }
  }

  const likeUnlikeCommentHandler = (post_id, comment_id) => {
    if (isCommentLiked) {
      likeOrUnlikeComment(post_id, comment_id, 'unlike');
    } else {
      likeOrUnlikeComment(post_id, comment_id, 'like');
    }
  };

  return (
    <div className='single-post-comment-item'>
      {/* options menu */}
      {showOptionsMenu && (
        <div className='post-options-menu'>
          {auth.user._id === comment.user ? (
            <div
              className='post-options-menu-item red-text'
              onClick={() => deleteComment(post_id, comment._id)}>
              Delete
            </div>
          ) : (
            <div className='post-options-menu-item red-text'>Report</div>
          )}
          <div className='post-options-menu-item' onClick={optionsMenuHandler}>
            Cancel
          </div>
        </div>
        // <PopupOptions
        //   post_id={post_id}
        //   onCancelMenu={optionsMenuHandler}
        //   fromComments
        //   comment={comment}
        // />
      )}
      <div className='single-post-comment-item-inner'>
        <div className='single-post-dp-comment'>
          <div className='comment-dp'>
            <img src={comment.dp || demo_dp} alt='DP' />
          </div>
          <div className='comment-text'>
            <p>
              <Link to={`/${comment.user}`} className='link-black'>
                <b>{comment.username}</b>
              </Link>
              {'      '}
              {comment.text}
            </p>
          </div>
        </div>
        <div className='comment-like'>
          <div className='options' onClick={optionsMenuHandler}>
            <i className='fas fa-ellipsis-h'></i>
          </div>
          <div onClick={() => likeUnlikeCommentHandler(post_id, comment._id)}>
            <i
              className={`fas fa-heart small-like-btn ${
                isCommentLiked && 'commentLiked'
              }`}></i>
          </div>
        </div>
      </div>
      <div className='comment-others'>
        <Moment fromNow>{comment.date}</Moment>
        <p>Reply</p>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  likeOrUnlikeComment: PropTypes.func.isRequired,
  post_id: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment, likeOrUnlikeComment })(
  CommentItem
);
