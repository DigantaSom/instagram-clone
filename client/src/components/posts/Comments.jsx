import React from 'react';
import PropTypes from 'prop-types';
// components
import CommentItem from './CommentItem';

const Comments = ({ post_id, comments }) => {
  return (
    <div className='single-post-comments'>
      {comments.map(comment => (
        <CommentItem key={comment._id} post_id={post_id} comment={comment} />
      ))}
    </div>
  );
};

Comments.propTypes = {
  post_id: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default Comments;
