import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const CheckoutDetails = () => {
  const { id } = useParams();
  const [checkout, setCheckout] = useState(null);
  const [itemdetails, setItemDetails] = useState([]);

	const getCheckoutItemDetails = () => {
    try {
		api.get(`/api/checkout/items/specific/${id}`).then((res) => res.data).then((data) => {setItemDetails(data); console.log(data)}).catch((err) => alert(err))		
    } catch (error) {
      console.error(error.response.data)
    }
  }
  

  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const res = await api.get(`/api/checkout/details/${id}`);
        setCheckout(res.data);
      } catch (err) {
        console.error("Failed to fetch checkout details", err);
      }
    };

    fetchCheckout();
    getCheckoutItemDetails();
  }, [id]);

  if (!checkout) return <p>Loading...</p>;

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


      <h1>Order #{checkout.id}</h1>
      <p><strong>Shipping Address:</strong> {checkout.shipping_address}</p>
      <p><strong>Amount Paid:</strong> ${checkout.amount_paid}</p>
      <h2>Items</h2>
      <ul>
        {checkout.items.map((i) => {
          
          const quan = itemdetails.find(j => j.id === i.item);
        
          return (
          
          <div className="cart-item-container" key={i.id}>
            <p>{quan.title}</p>
            <p><strong>Quantity:</strong> {i.quantity}</p>
            <p><strong>Price:</strong> ${i.price}</p>
          </div>
          
          
        )}
      )}
      </ul>
    </div>
  );
};

export default CheckoutDetails;
