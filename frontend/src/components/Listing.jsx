import React from "react"
import "../styles/Listing.css"

function Listing({listing, addToCart}) {
    return <div className="listing-container">
        <p className="listing-title">{listing.title}</p>
		<p className="listing-price">{listing.price}</p>
        <p className="listing-content">{listing.content}</p>
        <p className="listing-date">{}</p>
        <img className="listing-image" src={listing.img} alt={listing.title} />
        <button onClick={() => addToCart(listing)}>Add to Cart</button>
    </div>
}

export default Listing