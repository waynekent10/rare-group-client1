/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';

export default function UserCard({
  first_name,
  last_name,
  bio,
  profile_image_url,
  email,
  created_on,
  active,
  is_staff,
  id,
}) {
  const router = useRouter();
  const { user, userLoading } = useAuth();

  console.log('from userCard: ***  ', 'first_name:', first_name, 'last_name:', last_name, 'bio:', bio, 'profile image url:', profile_image_url,
    'email:', email, 'created_on:', created_on, 'active:', active, 'is_staff:', is_staff, 'id:', id);

  const deleteThisUser = () => {
    if (window.confirm(`Delete ${first_name}`)) {
      // deleteUser(id); //need to write frontend func
      window.location.reload();
      router.push('/users');
    }
  };

  return (
    <Card className="text-center" style={{ width: '300px', margin: '10px' }}>
      <Card.Header>{first_name} {last_name}</Card.Header>
      <Card.Body>
        <Card.Title>{bio}</Card.Title>
        <Card.Img src={user.fbUser.photoURL} />
        <Card.Text>{email}</Card.Text>`
        <Card.Text>User joined{created_on}</Card.Text>
        <Card.Text>User is active {active}</Card.Text>
        <Card.Text>{first_name}is admin:{is_staff}</Card.Text>
        <Link href={`/users/${id}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`update/${id}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisUser} className="m-2">
          DELETE
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Sup</Card.Footer>
    </Card>
  );
}
UserCard.propTypes = {
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  profile_image_url: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  created_on: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  is_staff: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};
