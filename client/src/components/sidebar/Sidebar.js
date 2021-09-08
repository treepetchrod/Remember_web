import React from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Sidebar() {
    const [display, setDisplay] = useState("none")
    const [username, setUsername] = useState(null)
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))

        if (user) {
            setDisplay("flex")
            setUsername(user.username);
        }
    },[])

    return (
        <div className="sidebar" style={{display:`${display}`}}>
            <div className="sidebarProfile">
                <img
                    className="sidebarProfileImage" 
                    src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="" 
                />
                <div className="sidebarProfileUsername">
                    <div className="username">Treepetch</div>
                </div>
                <div className="sidebarProfileButton">
                    <Link to={`/mystory/${username}`} className="link">
                        <button className="buttonMystory">My Story</button>
                    </Link>
                    <Link to="/" className="link">
                        <button className="buttonEdit">Edit Profile</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
