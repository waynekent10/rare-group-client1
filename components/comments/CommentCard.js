import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const CommentCard = ({ comment, onDelete }) => {
  const handleDelete = () => {
    onDelete(comment.id);
  };

  return (
    <div className="comment-card">
      <p>
        <strong>{comment.author.username}</strong> <small>{new Date(comment.created_on).toLocaleString()}</small>
      </p>
      <p>{comment.content}</p>
      <Button onClick={handleDelete} className="btn btn-danger">Delete</Button>
    </div>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    content: PropTypes.string.isRequired,
    created_on: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CommentCard;
