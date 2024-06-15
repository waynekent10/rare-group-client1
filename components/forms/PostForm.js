import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
import { createPost, getCategories, updatePost } from '../../utils/data/postData';

const initialState = {
  id: 0,
  title: '',
  imageUrl: '',
  content: '',
  publication_date: '',
  category: 0,
  approved: true,
};

const PostForm = ({ postObj, user }) => {
  // const { user } = useAuth();
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);

    if (postObj.id) {
      setFormInput({
        id: postObj.id,
        title: postObj.title,
        imageUrl: postObj.imageUrl,
        content: postObj.content,
        category: postObj.category.id,
        rare_user: user.id,
        approved: postObj.approved,
      });
    }
  }, [postObj, user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postObj.id) {
      const payload = {
        id: formInput.id,
        title: formInput.title,
        imageUrl: formInput.image_url,
        content: formInput.content,
        category: formInput.category,
        publication_date: formInput.publication_date,
        rare_user: user.id,
        approved: formInput.approved,
      };
      console.warn({ payload });
      updatePost(formInput.id, payload)
        .then(() => router.push(`/posts/${postObj.id}`));
    } else {
      const payload = { ...formInput, rareUser: user.id };
      console.warn('Payload:', payload);
      createPost(payload)
        .then(() => router.push('/posts'));
    }
  };
  return (
    <>
      <h1>Post Form</h1>
      <>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" required value={formInput.title} onChange={handleChange} />
            <Form.Label>Image</Form.Label>
            <Form.Control name="imageUrl" required value={formInput.imageUrl} onChange={handleChange} />
            <Form.Label>Content</Form.Label>
            <Form.Control name="content" required value={formInput.content} onChange={handleChange} />
          </Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Select
            aria-label="category"
            name="category"
            onChange={handleChange}
            className="mb-3"
            value={formInput.category}
            required
          >
            <option value="">Select Category</option>
            {categories.map((categoryItem) => (
              <option key={categoryItem.id} value={categoryItem.id}>
                {categoryItem.label}
              </option>
            ))}
          </Form.Select>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    </>
  );
};

PostForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.number,
    rare_user: PropTypes.number,
    publication_date: PropTypes.string,
    approved: PropTypes.bool,
  }),
};

PostForm.defaultProps = {
  postObj: initialState,
};

export default PostForm;
