import React from "react"

function Listing({listing}) {
    return <div className="listing-container">
        <p className="listing-title">{listing.title}</p>
        <p className="listing-content">{listing.content}</p>
        <p className="listing-date">{}</p>

        <img className="listing-image" src={listing.img} height="100" width="100" alt={listing.title} />


    </div>
}

export default Listing