import { clientCredentials } from '../client';

const getPosts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSinglePost = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createPost = (post) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updatePost = (id, post) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
    .then(resolve)
    .catch(reject);
});

const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories`)
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSinglePost = (post) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${post}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getPosts,
  getSinglePost,
  createPost,
  updatePost,
  getCategories,
  deleteSinglePost,
};
