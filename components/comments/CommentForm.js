// CommentForm.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createComment } from '../../utils/data/commentData';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newComment = {
      post: postId,
      content,
    };
    try {
      const createdComment = await createComment(newComment);
      onCommentAdded(createdComment);
      setContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Comment</button>
    </form>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  onCommentAdded: PropTypes.func.isRequired,
};

export default CommentForm;
