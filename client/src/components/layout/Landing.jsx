import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { getPostsOfMeAndWhomImFollowing } from '../../redux/actions/post';
// components
import Posts from '../posts/Posts';

const Landing = ({ getPostsOfMeAndWhomImFollowing }) => {
  useEffect(() => {
    getPostsOfMeAndWhomImFollowing();
  }, [getPostsOfMeAndWhomImFollowing]);

  return (
    <Fragment>
      <Posts />
    </Fragment>
  );
};

Landing.propTypes = {
  getPostsOfMeAndWhomImFollowing: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({});

export default connect(null, { getPostsOfMeAndWhomImFollowing })(Landing);
