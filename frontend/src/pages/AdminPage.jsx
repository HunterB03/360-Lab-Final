import React, { useEffect, useState} from 'react';
import api from '../api';

const AdminDashboard = () => {
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
    
      if (!userInfo?.is_superuser) {
        return <p>You must be an admin to access this page.</p>;
      }
    
      return (
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome, {userInfo.username}! You are a superuser.</p>
          {/* Add admin features here later */}
        </div>
      );
    };
    
    export default AdminDashboard;   