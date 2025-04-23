import React, { useState, useEffect } from "react";
import "../styles/Cart.css";
import api from "../api"
import { Link } from 'react-router-dom';

function DjCartPage() {

	const [cart, setCart] = useState([]);
	const [cartitems, setCartItems] = useState([])

	useEffect(() => {
        getCart()
	}, []);

    const getCart = () => {
        api.get("/api/cart/").then((res) => res.data).then((data) => {setCart(data); console.log(data)}).catch((err) => alert(err))
    }

	const curr = cart.map((item) => (item.id))
	useEffect(() => {
		getCartItems()
	}, []);

	const getCartItems = () => {
		api.get("/api/cart/items/").then((res) => res.data).then((data) => {setCartItems(data); console.log(data)}).catch((err) => alert(err))
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

	<h2>Your Cart</h2>

			<div className="cart-container">
				{cartitems.map((item) => (<p>{item.item}</p>))}
			</div>
				<div className="cart-summary">
					<p><strong>Total Quantity:</strong> quantity </p>
					<p><strong>Total Price:</strong> $price </p>
					<Link to="/checkout"><button>Checkout</button></Link>
				</div>
		</div>
	);
}

export default DjCartPage;
