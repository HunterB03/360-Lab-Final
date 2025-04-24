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

<div className="header">
                
                <ul>
                <li><a href="/">Home</a></li>
                {userInfo?.is_superuser && <li><a href="/admin-dashboard">Admin Dashboard</a></li>}
                {userInfo?.is_superuser && <li><a href="http://127.0.0.1:8000/admin/" target="_blank" rel="noopener noreferrer">Django Admin</a></li>}
                <li><a href="/logout">Log Out</a></li>
                </ul>
    
                </div>


          <h1>Admin Dashboard</h1>
          <p>Welcome, {userInfo.username}! You are an admin.</p>
          
          <button><a href="http://127.0.0.1:8000/admin/" target="_blank" rel="noopener noreferrer"style={{color: 'white', textDecoration: 'none'}} >Django Admin</a></button>

        </div>
      );
    };
    
    export default AdminDashboard;   