import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
// #other
import { Link } from 'react-router-dom';
import demo_dp from '../../img/demo-img.jpg';
// Redux
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const [searchText, setSearchText] = useState('');
  const [showProfileLogoMenu, toggleProfileLogoMenu] = useState(false);

  const profileLogoMenuHandler = () => {
    toggleProfileLogoMenu(prevState => !prevState);
  };

  const logoutHandler = () => {
    logout();
    profileLogoMenuHandler();
  };

  return (
    <nav>
      <p className='brand-logo'>
        <Link to='/' className='link-black'>
          Instagram
        </Link>
      </p>
      {isAuthenticated && (
        <Fragment>
          <div className='search-container'>
            <input
              type='text'
              placeholder='Search'
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
          <div className='nav-utils'>
            <div>
              <Link to='/create-post' className='link-black'>
                <i className='fas fa-plus'></i>
              </Link>
            </div>
            <div className='profile-logo' onClick={profileLogoMenuHandler}>
              <img src={demo_dp} alt='Profile Logo' />
            </div>
            {showProfileLogoMenu && (
              <div className='profile-logo-menu'>
                {user && (
                  <Link
                    to={`/${user._id}`}
                    className='link-black'
                    onClick={profileLogoMenuHandler}>
                    <div className='profile-logo-menu-item'>Profile</div>
                  </Link>
                )}
                <div className='profile-logo-menu-item' onClick={profileLogoMenuHandler}>
                  <span>Saved</span>
                </div>
                <div className='profile-logo-menu-item' onClick={profileLogoMenuHandler}>
                  <span>Settings</span>
                </div>
                <div className='profile-logo-menu-item' onClick={logoutHandler}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
