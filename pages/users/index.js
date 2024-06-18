// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import UserCard from '../../components/UserCard';
import { getUsers } from '../../utils/data/userData';
import { useAuth } from '../../utils/context/authContext';

function User() {
  const [users, setusers] = useState([]);
  // const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getUsers(user.ucreated_on).then((data) => setusers(data));
    // console.log(user);
  }, [user]);

  return (
    <article className="user">
      <h1>Users</h1>

      {users.map((aUser) => (
        <section key={`user--${aUser.created_on}`} className="user">
          <UserCard
            first_name={aUser.first_name}
            last_name={aUser.last_name}
            bio={aUser.bio}
            profile_image_url={aUser.profile_image_url}
            email={aUser.email}
            created_on={aUser.created_on}
            active={aUser.active}
            is_staff={aUser.is_staff}
            id={user.id}
          />
        </section>
      ))}
    </article>
  );
}

export default User;
