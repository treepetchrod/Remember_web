import React from 'react'
import './login.css'
import { useState } from 'react'
import axios from "axios"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const res = await axios.post("/auth/login",{
                username,
                password,
            })
            res.data && window.location.replace("/")
            localStorage.setItem("user",JSON.stringify(res.data))
        } catch(err) {
            console.log(err)
            setError(true)
        }
    }

    return (
        <div className="loginPage">
            <span>Login</span>
            <form className="loginPageForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                <label>Password</label>
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
            {error && (<div>Can not login!!!</div>)}
        </div>
    )
}
