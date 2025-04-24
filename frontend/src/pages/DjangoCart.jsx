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
        //const updatedCart = cart.filter(item => item.id !== id);
        //setCart(updatedCart);
        //localStorage.setItem('cart', JSON.stringify(updatedCart));
		'do some stuff'
    };

    const increaseQuantity = (id, amt) => {
        const theitem = cartitems.find(i => i.item === id)

//		api.patch('api/${id}/cart/increase',{'quantity':});
		return
	}
//            if (item.id === id && item.quantity > 1) {
//                item.quantity -= 1;
//            }
//            return item;
//        }).filter(item => item.quantity > 0);
//        setCart(updatedCart);
//        localStorage.setItem('cart', JSON.stringify(updatedCart));

    const setQuantity = (id) => {
        const updatedCart = cart.map(i => {
            if (i.item === id) {
                ''
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

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
					console.log(quan)
					return (
                        <div key={details.id} className="cart-item-container">
                            <img className="cart-item-image" src={details.img} alt={details.title} />
                            <div className="cart-item-details">
                                <p className="cart-item-title">{details.title}</p>
                                <p className="cart-item-price">{details.price}</p>
                                <p className="cart-item-content">{details.content}</p>
                                <p className="cart-item-quantity">Quantity: {quan.quantity}</p>
                                <div className="cart-item-actions">
								<button onClick={() => increaseQuantity(details.id, 1)}>+</button>
                                <button onClick={() => increaseQuantity(details.id, -1)}>-</button>
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
						<p><strong>Total Price:</strong> ${totalPrice}</p>
						<Link to="/checkout"><button>Checkout</button></Link>
					</div>
				)}
			</div>

	);
}

export default DjCartPage;
