import React, { useState, useEffect } from "react";
import "../styles/Cart.css";

function CartPage() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    const removeFromCart = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const decreaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > 1) {
                item.quantity -= 1;
            }
            return item;
        }).filter(item => item.quantity > 0);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const increaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                item.quantity += 1;
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    


    return (
        <div>
            <div className="header">
                <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/cart">Go To Cart</a></li>
                <li><a href="/checkout">Checkout</a></li>
    
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="/logout">Log Out</a></li>
                </ul>
                </div>

    <h2>Your Cart</h2>
            <div className="cart-container">
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="cart-item-container">
                            <img className="cart-item-image" src={item.img} alt={item.title} />
                            <div className="cart-item-details">
                                <p className="cart-item-title">{item.title}</p>
                                <p className="cart-item-price">${item.price}</p>
                                <p className="cart-item-content">{item.content}</p>
                                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                                <div className="cart-item-actions">
                                    <button onClick={() => increaseQuantity(item.id)}>Increase</button>
                                    <button onClick={() => decreaseQuantity(item.id)}>Decrease</button>
                                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {cart.length > 0 && (
                <div className="cart-summary">
                    <p><strong>Total Quantity:</strong> {totalQuantity}</p>
                    <p><strong>Total Price:</strong> ${totalPrice}</p>
                </div>
            )}
        </div>
    );
}

export default CartPage;
