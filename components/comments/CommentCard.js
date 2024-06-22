import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

const CommentCard = ({ comment, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  const handleUpdate = () => {
    onUpdate(comment.id, content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(comment.id);
  };

  return (
    <div className="comment-card">
      <p>
        <strong>{comment.username}</strong>{' '}
        <small>{new Date(comment.created_on).toLocaleString()}</small>
      </p>
      {isEditing ? (
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </Form.Group>
      ) : (
        <>
          <p>{comment.content}</p>
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </>
      )}
    </div>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created_on: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CommentCard;
