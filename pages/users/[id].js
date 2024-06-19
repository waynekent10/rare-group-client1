import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import UserCard from '../../components/UserCard';
import { getSingleUser } from '../../utils/data/userData';

export default function User() {
  const [aUser, setaUser] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleUser(id).then((data) => setaUser(data));
    }
  }, [id]);

  if (!aUser) {
    return <p>Loading...</p>;
  }

  return (
    <article className="users">
      <h1>User</h1>
      <Button
        onClick={() => {
          router.push(`/users/update/${id}`);
        }}
      >
        Edit this User
      </Button>

      <section key={`user--${aUser.id}`} className="user">
        <UserCard
          first_name={aUser.first_name || 'Unknown User first name'}
          last_name={aUser.last_name || 'Unknown User last name'}
          bio={aUser.bio || 'unknown bio of this user'}
          profile_image_url={aUser.profile_image_url || 'You need to book a Glamour Shot ASAP'}
          email={aUser.email || 'unknown email'}
          date={aUser.date || 'unknown date'}
          created_on={aUser.created_on || 'unknown datewhen did this begin for you?'}
          active={aUser.active || 'new phone, who dis?'}
          is_staff={aUser.is_staff || 'Do you even go here.'}
          id={id}
        />
      </section>

    </article>
  );
}
