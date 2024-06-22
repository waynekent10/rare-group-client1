import { clientCredentials } from '../client';

const getComments = (postId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments?post_id=${postId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteComment = (commentId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${commentId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const createComment = (comment) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateComment = (commentId, content) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getComments, deleteComment, createComment, updateComment,
};
