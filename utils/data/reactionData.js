import { clientCredentials } from '../client';

const getReactions = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reactions`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleReaction = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reactions/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createReaction = (reaction) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reaction),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteReaction = (reaction) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reactions/${reaction}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export {
  getReactions,
  getSingleReaction,
  createReaction,
  deleteReaction,

};
