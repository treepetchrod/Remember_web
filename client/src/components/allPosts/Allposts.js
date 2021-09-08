import React from 'react'
import Post from '../post/Post'
import './allPosts.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Allposts() {
    const [allPosts, setAllposts] = useState([])
    const [flexValue, setFlexValue] = useState("12")

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))

        if (user) {
            setFlexValue("10")
        } else {
            setFlexValue("12")
        }

        const getAllposts = async () => {
            try{
                const res = await axios.get("/post/getposts")
                setAllposts(res.data)       
            }catch(err){
                console.log(err)
            }
        }
        getAllposts();
    },[])

    
    return (
        <div className="allPosts" style={{flex:{flexValue}}}>
            {allPosts.map((p) => 
                (<Post key={p._id} Posts={p}/>)
            )}            
        </div>
    )
}
