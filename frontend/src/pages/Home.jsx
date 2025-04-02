import { useState, useEffect } from "react"
import api from "../api"
import Listing from "../components/Listing"
import "../styles/Home.css"

function Home() {

    const [listings, setListings] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const[img, setImage] = useState("")


    useEffect(() => {
        getListings()
    }, [])

    const getListings = () => {
        api.get("/api/listings/").then((res) => res.data).then((data) => {setListings(data); console.log(data)}).catch((err) => alert(err))
    }

    return (
        <div>
            <div className="header">
            <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            
            <li><a href="/logout">Log Out</a></li>
            </ul>
            </div>
            <h2>Listings</h2>
            <div className="grid-container">
                {listings.map((listing) => (
                    <Listing listing={listing} key={listing.id} />
                ))}
            </div>
        </div>
    )
}

export default Home