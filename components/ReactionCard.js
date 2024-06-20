/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteReaction } from '../utils/data/reactionData';

export default function ReactionCard({
  label,
  image_url,
  id,
}) {
  const router = useRouter();

  const deleteThisReaction = () => {
    if (window.confirm(`Delete ${label}`)) {
      deleteReaction(id);
      window.location.reload();
      router.push('/reactions');
    }
  };
  return (
    <>
      <Card className="text-center" style={{ width: '18rem', margin: '10px' }}>
        <Card.Header>{label}</Card.Header>
        <Card.Body>
          <Card.Img variant="top" src={image_url} />
          <Card.Title>{label}</Card.Title>

        </Card.Body>
        <Button onClick={deleteThisReaction}>
          Delete
        </Button>
      </Card>
    </>
  );
}

ReactionCard.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
};
