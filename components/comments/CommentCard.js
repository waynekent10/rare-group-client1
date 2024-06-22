import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';

const CommentCard = ({ comment, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUpdate = () => {
    onUpdate(comment.id, content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDelete(comment.id);
    setShowDeleteModal(false);
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
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
