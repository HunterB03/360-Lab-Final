import React, { useState, useEffect } from "react";
import api from "../api"
import "../styles/Checkout.css";
import "../styles/Form.css"

function CheckoutPage() {
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState("")
    const [cardnumber, setCardnumber] = useState("")

    const handleSubmit = async (e) => {
        localStorage.setCart([])
        navigate("/")
        }


    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div>
            <div className="header">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/cart">Go To Cart</a></li>
                    <li><a href="/logout">Log Out</a></li>
                </ul>
            </div>

            <h2>Checkout</h2>

            <div className="checkout-container">
                {cart.length === 0 ? (
                    <p>Your cart is empty. Please add items to the cart before checking out.</p>
                ) : (
                    <>
                        <div className="cart-summary">
                            <h3>Order Summary</h3>
                            {cart.map((item) => (
                                <div key={item.id} className="cart-item-summary">
                                    <p>{item.title} x {item.quantity}</p>
                                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                            <p><strong>Total Quantity:</strong> {totalQuantity}</p>
                            <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>


        <form onSubmit={handleSubmit} className="form-container">

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
        <button className="form-button" type="submit">Place Order</button>

    </form>



                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CheckoutPage;
