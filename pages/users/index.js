import React, { useEffect, useState } from 'react';
import UserCard from '../../components/UserCard';
import { getUsers } from '../../utils/data/userData';
import { useAuth } from '../../utils/context/authContext';

function User() {
  const [users, setUsers] = useState([]);
  // const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.uid) {
      getUsers(user.uid).then((data) => {
        // console.log('Fetched Users:', data);
        setUsers(data);
      });
    }
  }, [user]);

  return (
    <article className="user">
      <h1>Users</h1>

      {users.map((aUser) => (
        <section key={`user--${aUser.uid}`} className="user">
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
