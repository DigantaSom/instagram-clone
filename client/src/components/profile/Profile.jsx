import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
// components
import Loader from '../layout/Loader';
import no_dp from '../../img/no_dp.jpg';
import ProfilePosts from './ProfilePosts';
// Redux
import { connect } from 'react-redux';
import { getPostsOfUser } from '../../redux/actions/post';
import { loadUser } from '../../redux/actions/auth';
import { getUserInfo, followUser, unfollowUser } from '../../redux/actions/user';

const Profile = ({
  getUserInfo,
  getPostsOfUser,
  match,
  user: { _id, name, username, followers, following, bio },
  post: { loading, userPosts },
  auth,
  loadUser,
  followUser,
  unfollowUser,
}) => {
  useEffect(() => {
    getUserInfo(match.params.user_id);
  }, [getUserInfo, match.params.user_id]);

  useEffect(() => {
    getPostsOfUser(match.params.user_id);
  }, [getPostsOfUser, match.params.user_id]);

  // console.log(publicUserInfo);

  const followUserHandler = followId => {
    followUser(followId);
  };

  const unfollowUserHandler = unfollowId => {
    unfollowUser(unfollowId);
  };

  return loading ? (
    <Loader />
  ) : (
    <Fragment>
      <div className='profile-top'>
        <div className='profile-dp-container'>
          <img src={no_dp} alt='DP' />
        </div>
        <div className='profile-info-col'>
          <div className='profile-info-row'>
            <div>
              <h2 className='profile-username'>{username}</h2>
            </div>
            {auth.isAuthenticated && auth.user._id === _id ? (
              <Fragment>
                <button className='btn edit-profile-btn'>Edit Profile</button>
                <button className='settings-btn'>
                  <i className='fas fa-cog'></i>
                </button>
              </Fragment>
            ) : (
              // check whether following or not and do stuffs acc. to that.
              <div className='follow-section'>
                {auth.isAuthenticated && auth.user.following.find(f => f === _id) ? (
                  <button
                    className='btn following-btn'
                    onClick={() => unfollowUserHandler(_id)}>
                    Following
                  </button>
                ) : (
                  <Fragment>
                    <button
                      className='btn follow-btn'
                      onClick={() => followUserHandler(_id)}>
                      {following &&
                      auth &&
                      auth.user &&
                      following.some(f => f === auth.user._id)
                        ? 'Follow Back'
                        : 'Follow'}
                    </button>
                  </Fragment>
                )}
                <div className='profile-options-btn'>
                  <i className='fas fa-ellipsis-h'></i>
                </div>
              </div>
            )}
          </div>
          <div className='profile-info-row'>
            <p>
              <b>{userPosts.length}</b> posts
            </p>
            {followers && (
              <p>
                <b>{followers.length}</b>
                {followers.length === 1 ? '  follower' : '  followers'}
              </p>
            )}
            <p>
              {following && <b>{following.length}</b>}
              {'  '}following
            </p>
          </div>
          <div className='profile-info-desc'>
            <h3>{name}</h3>
            {bio && <p>{bio}</p>}
          </div>
        </div>
      </div>
      <div className='divider'></div>
      <ProfilePosts posts={userPosts} />
    </Fragment>
  );
};

Profile.propTypes = {
  getUserInfo: PropTypes.func.isRequired,
  getPostsOfUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getUserInfo,
  getPostsOfUser,
  loadUser,
  followUser,
  unfollowUser,
})(Profile);
