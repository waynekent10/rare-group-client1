import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, FormLabel } from 'react-bootstrap';
import {
  createUser, getSingleUser, updateUser,
} from '../utils/data/userData';

const initialState = {
  first_name: '',
  last_name: '',
  bio: '',
  profile_image_url: '',
  email: '',
  created_on: '',
  active: '',
  is_staff: '',
};

export default function UserForm({ user, id }) {
  const [currentUser, setCurrentUser] = useState(initialState);
  const router = useRouter();
  // const { user, userLoading } = useAuth();

  useEffect(() => {
    if (user) {
      getSingleUser(id).then((data) => {
        setCurrentUser({
          first_name: data.first_name,
          last_name: data.last_name,
          bio: data.bio,
          profile_image_url: data.profile_image_url,
          email: data.email,
          created_on: data.created_on,
          active: data.active,
          is_staff: data.is_staff,
        });
      });
    }
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const aUser = {
      first_name: currentUser.first_name,
      last_name: currentUser.last_name,
      bio: currentUser.bio,
      profile_image_url: currentUser.profile_image_url,
      email: currentUser.email,
      created_on: currentUser.created_on,
      active: currentUser.active,
      is_staff: currentUser.is_staff,
      uid: user.uid,
    };

    if (!id) {
      createUser(aUser)
        .then(() => router.push('/users'))
        .catch((error) => {
          console.error('Error creating this user: ', error);
        });
    } else {
      updateUser(aUser, id)
        .then(() => router.push(`/users/${id}`))
        .catch((error) => {
          console.error('Error updating this event: ', error);
        });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">

          <FormLabel>User Form for registering or updating your first name</FormLabel>
          <FloatingLabel controlId="floatingInput1" label="first_name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="First Name"
              name="first_name"
              required
              value={currentUser.first_name}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FormLabel>User Form for registering or updating your last name</FormLabel>
          <FloatingLabel controlId="floatingInput1" label="last_name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="last_name"
              required
              value={currentUser.last_name}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FormLabel>User Form for registering or updating your User Bio</FormLabel>
          <FloatingLabel controlId="floatingInput1" label="bio" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Bio"
              name="bio"
              required
              value={currentUser.bio}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FormLabel>User Form for registering or updating your User profile_image_url</FormLabel>
          <Form.Control
            type="text"
            placeholder="Profile Image Url"
            name="profile_image_url"
            required
            value={currentUser.profile_image_url}
            onChange={handleChange}
          />

          <FormLabel>User Form for registering or updating your User email</FormLabel>
          <FloatingLabel controlId="floatingInput1" label="email" className="mb-3">
            <Form.Control
              type="text"
              placeholder="email"
              name="email"
              required
              value={currentUser.email}
              onChange={handleChange}
            />
          </FloatingLabel>

        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
  //
}
UserForm.propTypes = {
  id: PropTypes.number,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

UserForm.defaultProps = {
  id: null,
};
