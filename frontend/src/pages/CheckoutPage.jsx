import React, { useState, useEffect } from "react";
import api from "../api"
import "../styles/Checkout.css";
import "../styles/Form.css"
import { Link } from 'react-router-dom';

function CheckoutPage() {
    const [cart, setCart] = useState([]);
    const [cartitems, setCartItems] = useState([]);
    const [address, setAddress] = useState("");
    const [cardnumber, setCardnumber] = useState("");
    const [itemdetails, setItemDetails] = useState([]);
    const [amtpaid, setAmtPaid] = useState();
    const [latestch, setLatestCh] = useState([]);

    useEffect(() => {
        api.get("/api/cart/").then((res) => res.data).then((data) => {setCart(data); console.log(data)}).catch((err) => alert(err))
        api.get("/api/cart/items/").then((res) => res.data).then((data) => {setCartItems(data); console.log(data)}).catch((err) => alert(err))
        api.get("/api/listings/specific").then((res) => res.data).then((data) => {setItemDetails(data); console.log(data)}).catch((err) => alert(err))		

    }, []);

    const totalQuantity = cartitems.reduce((acc, cartitems) => acc + cartitems.quantity, 0);
    const totalPrice = cartitems.reduce((acc, cartitems) => acc + cartitems.price * cartitems.quantity, 0);
    

    function handleSubmit() {

        //make a checkout, and then do checkout items
        //then redirect user
        //checkout id is confnum?
        setAmtPaid((totalPrice*1.06))

        async function posty() {
        try {
            await api.post('/api/checkout/', 
                {
                    "shipping_address": address,
                    "card_number": cardnumber,
                    "amount_paid": parseFloat((totalPrice*1.06).toFixed(2))
                }
            )
        } catch (error) {
            console.error(error.response.data)
        }
        }
        posty()
 /*       function getch() {
            api.get('/api/checkout/processing').then((res) => res.data).then((data) => {
                setLatestCh(data);
                console.log(data)}).catch((err) => alert(err))
        }
*/
        //latestch[0].id has id of current checkout process
        
        cartitems.map((i) => {
            console.log(i)
            try {
            api.post(`/api/checkout/item/`, {
                "item": i.item,
                "quantity": i.quantity,
                "price": i.price
            })
        } catch (error) {
            console.error(error.response.data)
        }
        })
    }

    return (
        <div>
            <div className="header">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/djangocart">Go To Cart</a></li>
                    <li><a href="/logout">Log Out</a></li>
                </ul>
            </div>

            <h2>Checkout</h2>
            <div className="checkout-container">
            <h3>Order Summary</h3>
            
                {cartitems.length === 0 ? (
                    <p>Your cart is empty. Please add items to the cart before checking out.</p>
                ) : (
                    
                    itemdetails.map((details) => {
					const quan = cartitems.find(i => i.item === details.id);
                    
					return (
                        <div key = {details.id} className="cart-summary">

                        <div className="cart-item-container">
                                <p>{details.title} ---
                                ${details.price} ---
                               Quantity: {quan.quantity}</p>
                        </div>
                        </div>
						  )})
                        )}
                        <p>Total Quantity: {totalQuantity}</p>
                        <p>Price: ${totalPrice}</p>
                        <p>Taxes: ${(totalPrice*0.06).toFixed(2)}</p>
                        <p>Total Price: ${(totalPrice*1.06).toFixed(2)}</p>
                        <>
                          <form className="form-container">

                          <input
                              className="form-input"
                              type="text"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="Address"
                          />
                  
                          <input
                              className="form-input"
                              type="text"
                              value={cardnumber}
                              onChange={(e) => setCardnumber(e.target.value)}
                              placeholder="Card Number"
                          />

                          
                  
                        </form>
                        <button onClick={handleSubmit} className="form-button">Place Order</button>
                        </>
                </div>
                </div>
)}     
                        

                

export default CheckoutPage;
