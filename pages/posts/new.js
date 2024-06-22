import { useRouter } from 'next/router';
import PostForm from '../../components/forms/PostForm';
import { useAuth } from '../../utils/context/authContext';

const NewPost = () => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <div>
      <button
        type="button"
        className="btn-add-post"
        onClick={() => {
          router.push('/posts');
        }}
      >Cancel
      </button>
      <PostForm user={user} />
    </div>
  );
};

export default NewPost;
