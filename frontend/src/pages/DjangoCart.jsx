import React, { useState, useEffect } from "react";
import "../styles/Cart.css";
import api from "../api"
import { Link } from 'react-router-dom';

function DjCartPage() {

	const [cart, setCart] = useState([]);
	const [cartitems, setCartItems] = useState([])
	const [itemdetails, setItemDetails] = useState([])

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

	const getCartItemDetails = () => {
		api.get("/api/listings/specific").then((res) => res.data).then((data) => {setItemDetails(data); console.log(data)}).catch((err) => alert(err))		
	}
	useEffect(() => {
		getCartItemDetails()
	}, []);

	const removeFromCart = (id) => {
		api.delete(`api/${id}/cart/delete`)
		setCartItems(cartitems.filter(i => i.item !== id))
		setItemDetails(itemdetails.filter(i => i.id !== id))
	};

    const setQuantity = (id, amt) => {
        const theitem = cartitems.findIndex(i => i.item===id)
		if(amt > 0) {
			api.patch(`api/${id}/cart/increase`, {'quantity':amt})
			const updatequant = cartitems.map((x, i) => {
				if(i===theitem) {
					return {
						...x,
						quantity: amt
					} //replaces quantity with new amount to re render page
				}
				else {

					return x
				}
			});
			setCartItems(updatequant)
		}
		return
	}

    const totalQuantity = cartitems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartitems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

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
                {itemdetails.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    itemdetails.map((details) => {
					const quan = cartitems.find(i => i.item === details.id);
					return (
                        <div key={details.id} className="cart-item-container">
                            <img className="cart-item-image" src={details.img} alt={details.title} />
                            <div className="cart-item-details">
                                <p className="cart-item-title">{details.title}</p>
                                <p className="cart-item-price">${details.price}</p>
                                <p className="cart-item-content">{details.content}</p>
                                <p className="cart-item-quantity">Quantity: {quan.quantity}</p>
								<input className="cart-quantity-input" type="text" value={quan.quantity} onKeyDown={(e) => {if(e.key==='.') {e.preventDefault();}}} onChange={(e) => setQuantity(details.id, e.target.value)} />
                                <div className="cart-item-actions">
								<button onClick={() => setQuantity(details.id, (quan.quantity+1))}>+</button>
                                <button onClick={() => setQuantity(details.id, (quan.quantity-1))}>-</button>
                                <button onClick={() => removeFromCart(details.id)}>Remove</button>

								</div>
                            </div>
                        </div>
						  )})
						)}
	</div>
				{itemdetails.length > 0 && (
					<div className="cart-summary">
						<p><strong>Total Quantity:</strong> {totalQuantity}</p>
						<p><strong>Price:</strong> ${totalPrice}</p>
						<Link to="/checkout"><button>Checkout</button></Link>
					</div>
				)}
			</div>

	);
}

export default DjCartPage;
