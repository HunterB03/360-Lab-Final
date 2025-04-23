// CreateListingPage.js (Page)
import React, { useState } from 'react';
import api from '../api';

const CreateListingPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('price', price);
    if (img) formData.append('img', img);

    try {
      const res = await api.post('api/listings/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Listing created!');
    } catch (err) {
      console.error(err);
      alert('Failed to create listing.');
    }
  };

  return (
    <div>
      <h1>Create a New Listing</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Description" required />
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" required />
        <input type="file" onChange={e => setImg(e.target.files[0])} />
        <button type="submit">Post Listing</button>
      </form>
    </div>
  );
};

export default CreateListingPage;
