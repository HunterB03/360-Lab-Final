import React, { useEffect, useState } from 'react';
import api from '../api';
import "../styles/Profile.css"

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [checkouts, setCheckouts] = useState([]);
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

    const getUserCheckouts = async () => {
        try {
          const res = await api.get('/api/checkout/all');  // Fetch checkouts from the new endpoint
          setCheckouts(res.data);  // Update the checkouts state
        } catch (err) {
          console.error("Failed to load checkouts", err);
        }
      };

    getUserInfo();
    getUserCheckouts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="header">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/djangocart">Go To Cart</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/logout">Log Out</a></li>
        </ul>
      </div>
      <div>
        <div className="profile-section">
          <h1>User Profile</h1>
          <p><strong>Name:</strong> {userInfo.firstname} {userInfo.lastname}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Username:</strong> {userInfo.username}</p>
        </div>

        <div className="checkouts-section">
          <h1>My Checkouts</h1>
          <ul>
            {checkouts.length > 0 ? (
              checkouts.map((checkout) => (
                <li key={checkout.id} className="checkout-item">
                  <p><strong>Order ID:</strong> {checkout.id}</p>
                  <p><strong>Shipping Address:</strong> {checkout.shipping_address}</p>
                  <p><strong>Amount Paid:</strong> ${checkout.amount_paid}</p>
                </li>
              ))
            ) : (
              <p>No checkouts found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;