import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
// import { useRouter } from 'next/router';
import { getPosts } from '../utils/data/postData';
import { useAuth } from '../utils/context/authContext';

function Posts() {
  // const router = useRouter();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(user.uid).then((data) => setPosts(data));
  }, [user]);
  console.warn('posts', posts);
  const listPosts = () => {
    getPosts(user.uid).then((data) => setPosts(data));
  };

  useEffect(() => {
    listPosts();
  }, [user]);

  return (
    <article className="posts">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={`post--${post.id}`} className="post">
                <td>{post?.title}</td>
                <td>{post?.rare_user.first_name}</td>
                <td>{post?.category.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </article>
  );
}
export default Posts;
