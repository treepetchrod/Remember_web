import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Sidebar() {
  const [display, setDisplay] = useState("none");
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [photoProfile, setPhotoProfile] = useState("https://firebasestorage.googleapis.com/v0/b/remember-web-nu.appspot.com/o/ImagesUser%2F24-248253_user-profile-default-image-png-clipart-png-download.png?alt=media&token=02e97499-96a0-4c2e-b6dc-8161c0820373");
  const [editButton, setEditButton] = useState("inline-block");
  const [saveButton, setSaveButton] = useState("none")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setDisplay("flex");
    }

    const getUserInfo = async () => {
      try {
        const res = await axios.post("/auth/userinfo", {
          username: user.username,
        });
        if(res.data.photoProfile !== "") {
          setPhotoProfile(res.data.photoProfile)
        }
        setId(res.data._id);
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (err) {}
    };
    getUserInfo();
  }, [username, email, id]);


  const toggleEditButton = () => {
    setEditButton("none")
    setSaveButton("inline-block")
  };

  const toggleSaveButton = () => {
    setEditButton("inline-block")
    setSaveButton("none")
  };



  return (
    <div className="sidebar" style={{ display: `${display}` }}>
      <div className="sidebarProfile">
        <img
          className="sidebarProfileImage"
          src={photoProfile}
          alt=""
        />
        <div className="sidebarProfileUsername">
          <div className="username">{username}</div>
          <div className="username">{email}</div>
        </div>
        <div className="sidebarProfileButton">
          <Link to={`/mystory/${username}`} className="link">
            <button className="buttonMystory">My Story</button>
          </Link>
          <Link to="/" className="link">
            <button className="buttonEdit" onClick={toggleEditButton} style={{display:editButton}}>Edit Profile</button>
            <button className="buttonEdit" onClick={toggleSaveButton} style={{display:saveButton}}>Save</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
