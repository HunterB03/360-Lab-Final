import { useState, useEffect } from "react"
import api from "../api"
import Listing from "../components/Listing"
import "../styles/Home.css"
import { Link } from "react-router-dom"

import CartPage from "./CartPage";

function Home() {

    const [listings, setListings] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const[img, setImage] = useState("")
	const[price, setPrice] = useState("")

    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")


    useEffect(() => {
        getListings()
    }, [])

    const getListings = () => {
        api.get("/api/listings/").then((res) => res.data).then((data) => {setListings(data); console.log(data)}).catch((err) => alert(err))
    }

    const addToCart = (listing) => {
        const existingItemIndex = cart.findIndex(item => item.id === listing.id);
    
        let updatedCart = [...cart];
    
        if (existingItemIndex !== -1) {
            updatedCart[existingItemIndex].quantity += 1;
        } else {
            updatedCart.push({ ...listing, quantity: 1 });
        }
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
    
    const filteredListings = listings.filter(listing =>
        listing.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    )

    return (
        <div>
            <div className="header">
                
            <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/cart">Go To Cart</a></li>

            <li><a href="/logout">Log Out</a></li>
            </ul>

            </div>
            <h2>Listings</h2>

            <input
                type="text"
                placeholder="Search Listings"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />
            
            <div className="grid-container">
            {filteredListings.map((listing) => (
                    <Listing
                        listing={listing}
                        key={listing.id}
                        addToCart={addToCart}
                    />
                ))}
            </div>
            
        </div>
    )
}

export default Home