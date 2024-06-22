import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const createUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${uid}`, {
    method: 'GET',
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Extract the necessary fields from the user object
      const user = {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        bio: data.bio,
        active: data.active,
        profile_image_url: data.profile_image_url,
        email: data.email,
        created_on: data.created_on,
        is_staff: data.is_staff,
        uid: data.uid,
      };
      resolve(user);
    })
    .catch(reject);
});

const getUsers = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users`, {
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Extract the necessary fields from nested objects
      const users = data.map((user) => ({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        bio: user.bio,
        active: user.active,
        profile_image_url: user.profile_image_url,
        email: user.email,
        created_on: user.created_on,
        is_staff: user.is_staff,
        uid: user.uid,
      }));
      resolve(users);
    })
    .catch(reject);
});

const updateUser = (payload, uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${uid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(() => resolve())
    .catch(reject);
});

const activateUser = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ active: 1 }),
  })
    .then((response) => {
      if (response.ok) {
        resolve();
      } else {
        reject(new Error(`Error: ${response.statusText}`));
      }
    })
    .catch((error) => reject(new Error(error)));
});

const deactivateUser = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ active: 0 }),
  })
    .then((response) => {
      if (response.ok) {
        resolve();
      } else {
        reject(new Error(`Error: ${response.statusText}`));
      }
    })
    .catch((error) => reject(new Error(error)));
});

// eslint-disable-next-line import/prefer-default-export
export {
  createUser, getSingleUser, getUsers, updateUser, activateUser, deactivateUser,
};
