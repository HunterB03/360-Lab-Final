import React, { useEffect, useState } from 'react';
import api from '../api';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await api.get('/api/user-info/');
        setUserInfo(res.data);
      } catch (err) {
        console.error("Failed to load user info", err);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="header">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/logout">Log Out</a></li>
        </ul>
      </div>

      <h1>User Profile</h1>
      <p><strong>Name:</strong> {userInfo.firstname} {userInfo.lastname}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <p><strong>Username:</strong> {userInfo.username}</p>
    </div>
  );
};

export default Profile;
