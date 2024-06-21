import React, { useEffect, useState } from 'react';
import UserTable from '../../components/UserTable';
import { getUsers } from '../../utils/data/userData';
import { useAuth } from '../../utils/context/authContext';

function User() {
  const [users, setUsers] = useState([]);
  // const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.uid) {
      getUsers(user.uid).then((data) => {
        console.log('Fetched Users:', data);
        setUsers(data);
      });
    }
  }, [user]);

  return (
    <article className="user">
      <UserTable users={users} />
    </article>
  );
}

export default User;
