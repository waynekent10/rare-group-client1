import { useRouter } from 'next/router';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createReaction } from '../../utils/data/reactionData';

const initialState = {
  label: '',
  image_url: '',
};

const ReactionForm = ({ obj = initialState, user }) => {
  const [reaction, setReaction] = useState(obj);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reactionData = {
      label: reaction.label,
      image_url: reaction.image_url,
      userId: user.uid,
    };

    createReaction(reactionData).then(() => router.push('/reactions'));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Label</Form.Label>
        <Form.Control
          name="label"
          required
          value={reaction.label}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image Url</Form.Label>
        <Form.Control
          name="image_url"
          type="url"
          required
          value={reaction.image_url}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

ReactionForm.propTypes = {
  obj: PropTypes.shape({
    label: PropTypes.string,
    image_url: PropTypes.string,
  }),
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

ReactionForm.defaultProps = {
  obj: initialState,
};

export default ReactionForm;
