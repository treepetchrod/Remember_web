import React, { useState } from 'react'
import './writepost.css'
import axios from 'axios'
    


export default function Writepost() {
    const [fileUrl, setFileUrl] = useState("https://bxecreative.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg")
    const [title, setTiltle] = useState("")
    const [desc, setDesc] = useState("")


    const uploadImg = (e)=>{
        const imageFile = e.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
            setFileUrl(imageUrl)
    }


    const handlePost = async (e) => {
        e.preventDefault()
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const username = user.username;
            await axios.post("/post/create",{
                username,
                title,
                desc,
            })
            window.location.replace(`/mystory/${username}`)

        }catch(err){
            console.log(err)
        }
    }

    return (
            <form action="" className="writepost" onSubmit={handlePost}>
                <img
                    className="writepostImg"
                    src={fileUrl}
                    alt=""
                />
                <label htmlFor="fileInput">
                    <i className="fas fa-file-image"></i>
                    <span>image file</span>
                </label>
                <input 
                    className="writepostInputFile"
                    type="file"
                    id="fileInput"
                    onChange={uploadImg}
                />
                <input 
                    className="writepostInputTitle" 
                    type="text" 
                    placeholder="Title"
                    onChange={(e)=>setTiltle(e.target.value)}
                />
                <textarea
                    className="writepostTextarea"
                    onChange={(e)=>setDesc(e.target.value)}
                >
                </textarea> 
                <button className="writepostButtonPost" type="submit">POST</button>
            </form>
    )
}
