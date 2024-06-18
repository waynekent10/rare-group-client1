import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import { getSinglePost } from '../../utils/data/postData';

export default function ViewSinglePost() {
  const [post, setPost] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSinglePost(id).then(setPost);
    }
  }, [id]);

  return (
    <>
      <h1>{post?.title}</h1>
      <div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => {
            router.push(`/posts/edit/${post.id}`);
          }}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => {
            router.push(`/posts/${post.id}`);
          }}
        >
          View
        </button>
        {post.rare_user?.first_name} {post.rare_user?.last_name}
      </div>
      <div>
        <Image src={post?.image_url} alt={post?.imageUrl} className="post-img-detail" />
      </div>
      <div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => {
            router.push(`/comments/${post.id}`);
          }}
        >
          View Comments
        </button>
      </div>
      <div>{post?.content}</div>
    </>
  );
}
