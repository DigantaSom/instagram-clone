import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
// components others
import DemoPostImg from '../../img/demo-img.jpg';
import { Link } from 'react-router-dom';
import PostUtilities from '../layout/PostUtilities';
import PopupOptions from '../layout/PopupOptions';
// redux
import { connect } from 'react-redux';

const PostItem = ({ post: { _id, user, caption, photo, date, likes } }) => {
  const [showOptionsMenu, toggleOptionsMenu] = useState(false);

  const optionsMenuHandler = () => {
    toggleOptionsMenu(prevState => !prevState);
  };

  return (
    <Fragment>
      {/* <div className='card postItem' onDoubleClick={() => likeUnlikePostHandler(_id)}> */}
      <div className='card postItem'>
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
          <PopupOptions
            post_id={_id}
            post_user={user}
            onCancelMenu={optionsMenuHandler}
            fromPostItem
          />
        )}

        {/* post image */}
        <div className='post-img'>
          <img src={photo} alt='Post' />
        </div>

        <PostUtilities
          post_id={_id}
          post_likes={likes}
          post_user={user}
          post_caption={caption}
          post_date={date}
        />
      </div>
    </Fragment>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PostItem);
