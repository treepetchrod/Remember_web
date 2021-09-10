import React, { useState, useEffect } from "react";
import "./writepost.css";
import axios from "axios";
import storage from "../../firebase";

export default function Writepost() {
  const [fileUrl, setFileUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/remember-web-nu.appspot.com/o/images%2Fcloud-upload-a30f385a928e44e199a62210d578375a.jpeg?alt=media&token=a14c2923-a562-49c3-8b2a-9fe546afddc3"
  );
  const [imageFile, setImageFile] = useState("");
  const [title, setTiltle] = useState("");
  const [desc, setDesc] = useState("");
  const [imageButton, setImageButton] = useState("rgb(243, 236, 137)");
  const [postDisable, setPostDisable] = useState(true);

  const preViewImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      setImageFile(image);
      const imageUrl = URL.createObjectURL(image);
      setFileUrl(imageUrl);
      setImageButton("rgb(176, 243, 137)");
      console.log(image);
    }
  };

  useEffect(() => {
    if (imageFile !== "" && title !=="" && desc !=="") {
      setPostDisable(false)
    }else{
      setPostDisable(true);
    }
  }, [imageFile, title, desc]);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const username = user.username;

      if (imageFile !== "") {
        await storage.ref(`/images/${imageFile.name}`).put(imageFile);

        var url = await storage
          .ref("images")
          .child(imageFile.name)
          .getDownloadURL();
      } else {
        url =
          "https://firebasestorage.googleapis.com/v0/b/remember-web-nu.appspot.com/o/images%2Fcloud-upload-a30f385a928e44e199a62210d578375a.jpeg?alt=media&token=a14c2923-a562-49c3-8b2a-9fe546afddc3";
      }

      await axios.post("/post/create", {
        username,
        title,
        desc,
        photo: url,
      });
      window.location.replace(`/mystory/${username}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form action="" className="writepost" onSubmit={handlePost}>
      <img className="writepostImg" src={fileUrl} alt="" />
      <div className="uploadImage">
        <label htmlFor="fileInput" style={{ backgroundColor: imageButton }}>
          <i className="fas fa-file-image"></i>
          <span>Image file</span>
        </label>
      </div>
      <input
        className="writepostInputFile"
        type="file"
        id="fileInput"
        onChange={preViewImage}
      />
      <input
        className="writepostInputTitle"
        type="text"
        placeholder="Title"
        onChange={(e) => setTiltle(e.target.value)}
      />
      <textarea
        className="writepostTextarea"
        onChange={(e) => setDesc(e.target.value)}
      ></textarea>
      <button
        className="writepostButtonPost"
        type="submit"
        disabled={postDisable}
      >
        POST
      </button>
    </form>
  );
}
