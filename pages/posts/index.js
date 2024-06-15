import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPosts } from '../../utils/data/postData';
import { useAuth } from '../../utils/context/authContext';

function Posts() {
  const router = useRouter();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  const listPosts = useCallback(() => {
    getPosts(user.uid)
      .then((data) => {
        setPosts(data);
      });
  }, [user]);

  useEffect(() => {
    listPosts();
  }, [user, listPosts]);

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => {
          router.push('/posts/new');
        }}
      >Add Post
      </button>
      <article className="posts">
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>
              {posts
                .sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date))
                .map((post) => (
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
    </>
  );
}
export default Posts;
