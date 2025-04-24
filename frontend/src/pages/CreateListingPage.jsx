import React, { useEffect, useState } from 'react';
import api from '../api';
import "../styles/CreateListing.css";

const CreateListingPage = () => {
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await api.get('api/user-info/');
        setUserGroups(res.data.groups);
      } catch (err) {
        console.error('Failed to fetch user info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('price', price);
    if (img) formData.append('img', img);

    try {
      await api.post('api/listings/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Listing created!');
    } catch (err) {
      console.error(err);
      alert('Failed to create listing.');
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!userGroups.includes('Seller')) {
    return <p>You must be a Seller to create listings.</p>;
  }

  return (
    <div>
        <div className="header">
            <ul>
            <li><a href="/">Home</a></li>
            {userGroups.includes('Seller') && <li><a href="/create-listing">Create Listing</a></li>}
            <li><a href="/logout">Log Out</a></li>
            </ul>
          </div>
      <div className="form-container">
      <h1>Create a New Listing</h1>
      <form onSubmit={handleSubmit}>
        <div>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        </div><br />
        <div>
        <input type="text" value={content} onChange={e => setContent(e.target.value)} placeholder="Description" required />
        </div><br />
        <div>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" required />
        </div><br />
        <div>
        <input type="file" onChange={e => setImg(e.target.files[0])} />
        </div><br />
        <button type="submit">Post Listing</button>
      </form>
      </div>
    </div>
  );
};

export default CreateListingPage;
