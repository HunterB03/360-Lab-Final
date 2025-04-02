import { useState, useEffect } from "react"
import api from "../api"
import Listing from "../components/Listing"
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

    return <div>
        <div>
            <h2>Listings</h2>
            {listings.map((listing) => (<Listing listing={listing} key={listing.id} /> ))}
        </div>
    </div>
}

export default Home