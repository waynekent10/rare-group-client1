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
        className="btn-add-post"
        onClick={() => {
          router.push('/posts/new');
        }}
      >
        Add Post
      </button>
      <article className="posts">
        {posts.length === 0 ? (
          <p className="no-posts">No posts available.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Category</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts
                .sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date))
                .map((post) => (
                  <tr key={`post--${post.id}`} className="post">
                    <td>{post?.title}</td>
                    <td>{post?.rare_user?.first_name}</td>
                    <td>{post?.category.label}</td>
                    <td>
                      <button
                        type="button"
                        className="btn-edit"
                        onClick={() => {
                          router.push(`/posts/edit/${post.id}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-view"
                        onClick={() => {
                          router.push(`/posts/${post.id}`);
                        }}
                      >
                        View
                      </button>
                    </td>
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
