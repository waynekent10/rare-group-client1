import ReactionForm from '../../components/forms/ReactionForm';
import { useAuth } from '../../utils/context/authContext';

const NewReaction = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2> Add a Reaction</h2>
      <ReactionForm user={user} />
    </div>
  );
};

export default NewReaction;
