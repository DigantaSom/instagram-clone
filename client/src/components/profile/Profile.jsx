import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// components
import Loader from '../layout/Loader';
import no_dp from '../../img/no_dp.jpg';
import ProfilePosts from './ProfilePosts';
// Redux
import { connect } from 'react-redux';
import { getPostsOfUser } from '../../redux/actions/post';
import { getUserInfo, addOrUpdateBio } from '../../redux/actions/user';

const Profile = ({
  getUserInfo,
  getPostsOfUser,
  match,
  user: { _id, name, username, followers, following, bio },
  post: { loading, userPosts },
  auth,
  addOrUpdateBio,
  history,
}) => {
  const [bioText, setBioText] = useState('');
  const [showAddBioPopup, toggleAddBioPopup] = useState(false);

  useEffect(() => {
    getUserInfo(match.params.user_id);
  }, [getUserInfo, match.params.user_id]);

  useEffect(() => {
    getPostsOfUser(match.params.user_id);
  }, [getPostsOfUser, match.params.user_id]);

  // console.log(publicUserInfo);

  const handleSubmitBio = () => {
    addOrUpdateBio({ bioText }, match.params.id, history); // edit = false
    setBioText('');
    toggleAddBioPopup(false);
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
                  <i class='fas fa-cog'></i>
                </button>
              </Fragment>
            ) : (
              // check whether following or not and do stuffs acc. to that.
              <div className='follow-section'>
                {auth.isAuthenticated && auth.user.following.find(f => f === _id) ? (
                  <button className='btn following-btn'>Following</button>
                ) : (
                  <button className='btn follow-btn'>Follow</button>
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
            {bio ? (
              <p>{bio}</p>
            ) : (
              auth.isAuthenticated &&
              auth.user._id === _id && (
                <div style={{ marginTop: '0.5rem' }}>
                  <button
                    className='btn btn-primary'
                    onClick={() => toggleAddBioPopup(!showAddBioPopup)}>
                    Add a Bio
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      {/* Add Bio Pop-up */}
      {showAddBioPopup && (
        <div className='add-bio-popup'>
          <div className='add-bio-input'>
            <textarea
              type='text'
              placeholder='Write something...'
              value={bioText}
              onChange={e => setBioText(e.target.value)}></textarea>
          </div>
          <div className='add-bio-btn-container'>
            <button type='submit' className='btn btn-primary' onClick={handleSubmitBio}>
              Add Bio
            </button>
          </div>
        </div>
      )}
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
  addOrUpdateBio: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserInfo, getPostsOfUser, addOrUpdateBio })(
  withRouter(Profile)
);
