import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar() {
    const [checkUser, setCheckUser] = useState(false)
    
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"))
        userData && setCheckUser(true)
    },[checkUser])

    const handleLogut = () => {
        localStorage.removeItem("user");
        setCheckUser(false)
        window.location.replace("/")
    }

    return (
        <div className="navbar">
            <Link to="/" className="link logo">
                <div className="navbarLogo"><span className="spanLogo">R</span>emember</div>
            </Link>
            <div className="navbarButton">
                {(!checkUser) ? 
                    (
                    <>
                        <Link to="/login" className="link">
                            <button className="bottonLogin"><b>Login</b></button>
                        </Link>
                        <Link to="/register" className="link">
                            <button className="bottonRegister"><b>Register</b></button>
                        </Link>
                    </>
                    ):(
                    <>
                        <Link to="/write" className="link">
                            <button className="bottonPost"><b>Post</b></button>
                        </Link>   
                        <Link to="/" className="link">
                            <button className="bottonLogout" onClick={handleLogut}><b>Logout</b></button>
                        </Link>
                    </>
                    )
                }
            </div>
        </div>
    )
}
