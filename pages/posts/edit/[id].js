import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../utils/data/postData';
import PostForm from '../../../components/forms/PostForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditSinglePost() {
  const [editPost, setEditPost] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  console.warn('editGame', editPost);
  useEffect(() => {
    getSinglePost(id).then(setEditPost);
  }, [id]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => {
          router.push('/posts');
        }}
      >Cancel
      </button>
      <PostForm postObj={editPost} user={user} />
    </div>
  );
}
