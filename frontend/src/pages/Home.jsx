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

    const [searchTerm, setSearchTerm] = useState("")
    const [userGroups, setUserGroups] = useState([]);
    const [loadingUserInfo, setLoadingUserInfo] = useState(true);
    const [userInfo, setUserInfo] = useState(null);

    const [cart, setCart] = useState([])
    const [cartitems, setCartItems] = useState([])

    useEffect(() => {
        getListings()
        getUserInfo()
    }, [])

    const getListings = () => {
        api.get("/api/listings/").then((res) => res.data).then((data) => {setListings(data); console.log(data)}).catch((err) => alert(err))
    }

    const getUserInfo = async () => {
        try {
            const res = await api.get('/api/user-info/');
            setUserInfo(res.data)
            setUserGroups(res.data.groups);
        } catch (err) {
            console.error("Failed to load user info:", err);
        } finally {
            setLoadingUserInfo(false);
        }
    };

   /* const addToCart = (listing) => {
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
    */
    useEffect(() => {
        api.get("/api/cart/").then((res) => res.data).then((data) => {setCart(data); console.log(data)}).catch((err) => alert(err))
        api.get("/api/cart/items/").then((res) => res.data).then((data) => {setCartItems(data); console.log(data)}).catch((err) => alert(err))
    }, []);

    const addToCart = async (listing) => {
    const existingItemIndex = cartitems.findIndex(i => i.item === listing.id);
    let newCart = [...cartitems]
    if(existingItemIndex !== -1) {
        //newCart[existingItemIndex].quantity += 1;
        const theitem = cartitems.findIndex(i => i.item===listing.id)
        const thequant = cartitems[existingItemIndex].quantity

			api.patch(`/api/${listing.id}/cart/increase`, {'quantity':cartitems[existingItemIndex].quantity+1})
			const updatequant = cartitems.map((x, i) => {
				if(i===theitem) {
					return {
						...x,
						quantity: cartitems[existingItemIndex].quantity+1
					} //replaces quantity with new amount to re render page
				}
				else {
					return x
				}
			});
			setCartItems(updatequant)
		
    } else {
        //newCart.push({ ...listing, quantity:1 });
        const newitem = {
            cart: cart[0].id,
            item: listing.id,
            quantity: 1,
            price: listing.price
        }
        newCart.push(newitem)
        api.post('/api/cart/add', newitem)
        setCartItems(newCart);
    }
    

   }

    const filteredListings = listings.filter(listing =>
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.price.toString().includes(searchTerm)
    )

    return (
        <div>
            <div className="header">
                
            <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/djangocart">Go To Cart</a></li>
            {userInfo?.is_superuser && <li><a href="/admin-dashboard">Admin Dashboard</a></li>}
            {userGroups.includes('Seller') && <li><a href="/create-listing">Create Listing</a></li>}
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