import React from "react";
import "./post.css";
import { Link } from "react-router-dom";

export default function Post(props) {
  const { _id, title, desc, username, photo, createdAt } = props.Posts;

  const date = new Date(createdAt).toDateString();

  return (
    <div className="post">
      <div>
        <Link to={`/singlepost/${_id}`} className="link">
          <img className="postImg" src={photo} alt="" />
        </Link>
        <Link to={`/singlepost/${_id}`} className="link">
          <div className="postTitle">{title}</div>
        </Link>
        <p className="postDesc">{desc}</p>
      </div>
      <div className="postInfo">
        <div className="postInfoUsername">{username}</div>
        <div className="postInfoTime">{date}</div>
      </div>
    </div>
  );
}
