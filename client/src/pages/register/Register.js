import React from 'react'
import './register.css'
import { useState } from 'react'
import axios from 'axios'

export default function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/register",{
                username,
                email,
                password,
            })
            res.data && window.location.replace("/login")
        } catch(err) {
            
        }
    }
    return (
        <div className="registerPage">
            <span>Register</span>
            <form className="registerPageForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                <label>Email</label>
                <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
