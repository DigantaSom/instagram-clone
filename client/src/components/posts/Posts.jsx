import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { clearUserPosts } from '../../redux/actions/post';
// components
import PostItem from './PostItem';
import Loader from '../layout/Loader';

const Posts = ({ clearUserPosts, post: { loading, posts } }) => {
    // to clear a specific user's posts from state, after visiting their profile and coming to homepage.
    useEffect(() => {
        clearUserPosts();
    }, [clearUserPosts]);

    return loading ? (
        <Loader />
    ) : (
        <Fragment>
            {posts.length > 0 ? (
                <div className='posts'>
                    {posts.map(post => (
                        <PostItem key={post._id} post={post} />
                    ))}
                </div>
            ) : (
                <h3>No posts found</h3>
                // <Loader />
            )}
        </Fragment>
    );
};

Posts.propTypes = {
    clearUserPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    post: state.post,
});

export default connect(mapStateToProps, { clearUserPosts })(Posts);
