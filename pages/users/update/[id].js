import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserForm from '../../../components/UserForm';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleUser } from '../../../utils/data/userData';

export default function NewUser() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const { aUser, setAUser } = useState({});

  useEffect(() => {
    getSingleUser(id).then(setAUser);
  }, [id]);

  return (
    <div>
      <h2>Update User</h2>
      <UserForm user={user} id={Number(id)} update={aUser} />
    </div>
  );
}
