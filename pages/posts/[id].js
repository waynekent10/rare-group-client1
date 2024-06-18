import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import { getSinglePost } from '../../utils/data/postData';
// import { useAuth } from '../../utils/context/authContext';

export default function ViewSinglePost() {
  const [editPost, setEditPost] = useState({});
  const router = useRouter();
  const { id } = router.query;
  // const { user } = useAuth();
  console.warn('editGame', editPost);
  useEffect(() => {
    getSinglePost(id).then(setEditPost);
  }, [id]);

  return (

    <>
      <h1>{editPost?.title}</h1>
      <div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => {
            router.push(`/posts/edit/${editPost.id}`);
          }}
        >Edit
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => {
            router.push(`/posts/${editPost.id}`);
          }}
        >View
        </button>
        {editPost?.rare_user.first_name} {editPost?.rare_user.last_name}
      </div>
      <div>
        <Image src={editPost?.image_url} alt={editPost?.imageUrl} className="post-img-detail" />
      </div>
      <div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => {
            router.push('/posts');
          }}
        >View Comments
        </button>
      </div>
      <div>{editPost?.content}</div>
    </>
  );
}
