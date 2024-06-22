/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deactivateUser, activateUser } from '../utils/data/userData';
import { useAuth } from '../utils/context/authContext';

export default function UserCard({
  first_name,
  last_name,
  email,
  created_on,
  active,
  id,
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [count, setCount] = useState(null);

  const deactivateThisUser = () => {
    if (window.confirm(`Deactivate ${first_name} ${id}`)) {
      deactivateUser(id);
      window.location.reload();
      router.push('/users');
    }
  };

  const activateThisUser = () => {
    if (window.confirm(`Activate ${first_name} ${id}`)) {
      activateUser(id);
      window.location.reload();
      router.push('/users');
    }
  };

  const updateThisUser = () => {
    if (router.route.includes('[id]')) {
      router.push(`update/${id}`);
    } else {
      router.push(`users/update/${id}`);
    }
  };

  const articleCount = () => {
    setTimeout(() => {
      setCount(1); // Replace with actual logic to fetch article count
    }, 1000); // Simulated delay
  };

  const buttonText = count !== null ? `Article Count: ${count}` : 'Article Count:';

  return (
    <div className="user-card">
      <div className="user-card__image-container">
        <Card.Img src={user.fbUser.photoURL} alt={`${first_name} ${last_name}`} width={150} height={150} className="user-card__image" />
      </div>
      <div className="user-card__info-container">
        <h2>{`${first_name} ${last_name}`}</h2>
        <h2>{email}</h2>
        <h2>{`Created on: ${created_on}`}</h2>
        <h2>{`Active: ${active ? 'Yes' : 'No'}`}</h2>
        <button type="button" className="btnCount btn-outline-primary" onClick={articleCount}>
          {buttonText}
        </button>
        <Button variant="info" onClick={updateThisUser} className="m-2">
          EDIT
        </Button>
        <Button
          variant={active === 1 ? 'danger' : 'success'}
          onClick={active === 1 ? deactivateThisUser : activateThisUser}
        >
          {active === 1 ? 'Deactivate' : 'Activate'}
        </Button>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  created_on: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
