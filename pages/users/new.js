import UserForm from '../../components/UserForm';
import { useAuth } from '../../utils/context/authContext';

const NewUser = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Register New User</h2>
      <UserForm user={user} />
    </div>
  );
};

export default NewUser;
