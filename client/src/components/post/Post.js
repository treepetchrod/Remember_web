import React from 'react'
import './post.css'
import { Link } from 'react-router-dom'

export default function Post(props) {
const {_id, title, desc, username , createdAt} = props.Posts;

const date = new Date(createdAt).toDateString()

    return (
        <div className="post">
            <div>
                <Link to={`/singlepost/${_id}`} className="link">
                    <img 
                        className="postImg"
                        src="https://images.unsplash.com/photo-1575351881847-b3bf188d9d0a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80" 
                        alt="" 
                    />
                </Link>
                <Link to={`/singlepost/${_id}`} className="link">
                    <div className="postTitle">
                        {title}
                    </div>
                </Link>
                <p className="postDesc">
                    {desc}
                </p>
            </div>
            <div className="postInfo">
                <div className="postInfoUsername">{username}</div>
                <div className="postInfoTime">{date}</div>
            </div>
        </div>
    )
}
