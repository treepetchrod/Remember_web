import axios from 'axios'
import React from 'react'
import Post from '../post/Post'
import "./myposts.css"
import { useEffect, useState } from 'react'

export default function Myposts() {
    const [myPosts, setMyposts] = useState([])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        const getMyposts = async ()=> {
            try {
                const res = await axios.get(`/post/myposts/${user.username}`)
                setMyposts(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getMyposts();

    },[])

    return (
        <div className="myposts">
            {myPosts.map((p) => 
                (<Post key={p._id} Posts={p}/>)
            )}        
        </div>
    )
}
