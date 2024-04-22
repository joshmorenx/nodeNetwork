import React from "react"
import PermissionManager from "../routes/PermissionManager";

export default function ContentContainer({ token, allAccess }) {
    return (
        <div className="content-container">
            <div className='feed-container' id='feed-container'><p>Feed</p></div>
            {allAccess ? (<div className='permission-container hidden' id='permission-container'><PermissionManager token={token} /></div>) : (<p></p>)}
            <div className='pages-container hidden' id='pages-container'><p>Pages</p></div>      
        </div>
    )
}