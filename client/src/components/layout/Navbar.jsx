import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';

const Navbar = ({ auth: { isAuthenticated, user } }) => {
    const [searchText, setSearchText] = useState('');

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
                        <div className='profile-logo'>
                            {user && (
                                <Link to={`/${user._id}`} className='link-black'>
                                    ME
                                </Link>
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </nav>
    );
};

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
