import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { getPosts } from '../../redux/actions/post';
// components
import Posts from '../posts/Posts';

const Landing = ({ getPosts }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <Fragment>
            <Posts />
        </Fragment>
    );
};

Landing.propTypes = {
    getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { getPosts })(Landing);
