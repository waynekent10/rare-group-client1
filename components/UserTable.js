/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';

const UserTable = ({ users }) => {
  const router = useRouter();

  const updateThisUser = (id) => {
    if (router.route.includes('[id]')) {
      router.push(`/update/${id}`);
    } else {
      router.push(`/users/update/${id}`);
    }
  };

  return (
    <div className="user-table">
      <h1 className="text-center mb-4">Users</h1>
      <table className="table">
        <tbody>
          {users.map((aUser) => (
            <tr key={`user--${aUser.id}`}>
              <td>{`${aUser.first_name} ${aUser.last_name}`}</td>
              <td>{aUser.active === 1 ? 'Active' : 'Inactive'}</td>
              <td>{`${aUser.created_on}`}</td>
              <td>
                <Link href={`/users/${aUser.id}`} passHref>
                  <Button variant="primary" className="m-2">VIEW</Button>
                </Link>
                <Button variant="info" onClick={() => updateThisUser(aUser.id)} className="m-2">
                  EDIT
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

UserTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    uid: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    active: PropTypes.number.isRequired,
    created_on: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default UserTable;
