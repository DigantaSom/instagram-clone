import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
import { deletePost } from '../../redux/actions/post';
import { unfollowUser } from '../../redux/actions/user';

export const PopupOptions = ({
  auth,
  deletePost,
  unfollowUser,
  post_id,
  post_user,
  onCancelMenu,
  fromPostItem,
}) => {
  return (
    <div className='post-options-menu'>
      {/* if authorized to delete */}
      {auth.user._id === post_user._id ? (
        <div
          className='post-options-menu-item red-text'
          onClick={() => deletePost(post_id)}>
          Delete
        </div>
      ) : (
        // if following the user who posted this

        auth.user.following.some(f => f === post_user._id) && (
          <div
            className='post-options-menu-item red-text'
            onClick={() => unfollowUser(post_user._id)}>
            Unfollow
          </div>
        )
      )}
      {fromPostItem && (
        <div className='post-options-menu-item'>
          <Link to={`/p/${post_id}`} className='link-black' style={{ display: 'block' }}>
            Go to post
          </Link>
        </div>
      )}

      <Fragment>
        <div className='post-options-menu-item'>Share</div>
        <div className='post-options-menu-item'>Copy Link</div>
      </Fragment>

      <div className='post-options-menu-item red-text'>Report</div>
      <div className='post-options-menu-item' onClick={onCancelMenu}>
        Cancel
      </div>
    </div>
  );
};

PopupOptions.propTypes = {
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  // props passed from parent component(s)
  post_id: PropTypes.string.isRequired,
  post_user: PropTypes.object,
  onCancelMenu: PropTypes.func.isRequired,
  fromPostItem: PropTypes.bool,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, unfollowUser })(PopupOptions);
