import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./singlepost.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import storage from "../../firebase";
import { v4 as uuidv4 } from "uuid";

export default function SinglePost() {

  const [displayEdit, setDisplayEdit] = useState("none");
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");
  const [imageButton, setImageButton] = useState("rgb(243, 236, 137)");
  const [updatePhoto, setUpdatePhoto] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [username, setUsername] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [photo, setPhoto] = useState("");
  const [imageFile, setImageFile] = useState("");


  const { id } = useParams();
  const date = new Date(createdAt).toDateString();
  const updateDate = new Date(updatedAt).toDateString();

  useEffect(() => {
    const getSinglePost = async () => {
      try {
        const res = await axios.get(`/post/singlepost/${id}`);
        // setpostInfo(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setUsername(res.data.username);
        setCreatedAt(res.data.createdAt);
        setUpdatedAt(res.data.updatedAt);
        setPhoto(res.data.photo);

        const user = JSON.parse(localStorage.getItem("user"));

        setUpdateTitle(res.data.title);
        setUpdateDesc(res.data.desc);
        setUpdatePhoto(res.data.photo);

        if (user) {
          if (user.username === res.data.username) {
            setDisplayEdit("inline-block");
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getSinglePost();
  }, [id, title, desc, photo, displayEdit]);

  const toggleModalDelete = () => {
    setIsOpenDelete(!isOpenDelete);
  };

  const toggleEditMode = () => {
    setUpdateTitle(title);
    setUpdateDesc(desc);
    setUpdatePhoto(photo);
    setImageButton("rgb(243, 236, 137)");
    setEditMode(!editMode);
  };

  const preViewImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      setImageFile(image);
      const imageUrl = URL.createObjectURL(image);
      setUpdatePhoto(imageUrl);
      setImageButton("rgb(176, 243, 137)");
    }
  };

  const updatePost = async () => {
    try {
      if (updatePhoto !== photo) {
        const refRememberStr = "RememberIMG";
        const refImage1 = photo.split("RememberIMG");
        const refImage2 = refImage1[2].split("?");
        const refImage3 = refRememberStr + refImage1[1] + refRememberStr;
        const refImage = refImage3 + refImage2[0];
        await storage.ref(`/images/${refImage}`).delete();
        if (imageFile !== "") {
          const surnameFileSplit = imageFile.name.split(".");
          const taqIMGname = "RememberIMG";
          const dashIMGname = "-";
          const nameFile =
            taqIMGname +
            dashIMGname +
            uuidv4() +
            dashIMGname +
            taqIMGname +
            "." +
            surnameFileSplit[1];
          await storage.ref(`/images/${nameFile}`).put(imageFile);
          var updateUrlPhoto = await storage
            .ref("images")
            .child(nameFile)
            .getDownloadURL();
        }
      }
      if (!updateUrlPhoto) {
        updateUrlPhoto = photo;
      }
      await axios.put(`/post/edit/${id}`, {
        title: updateTitle,
        desc: updateDesc,
        photo: updateUrlPhoto,
      });
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  const handleDelete = async () => {
    try {
      if (photo) {
        try {
          const refRememberStr = "RememberIMG";
          const refImage1 = photo.split("RememberIMG");
          const refImage2 = refImage1[2].split("?");
          const refImage3 = refRememberStr + refImage1[1] + refRememberStr;
          const refImage = refImage3 + refImage2[0];
          await storage.ref(`/images/${refImage}`).delete();
        } catch (err) {
          console.log(err);
        }
      }
      await axios.delete(`/post/delete/${id}`);
      setIsOpenDelete(!isOpenDelete);
      window.location.replace(`/mystory/${username}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singlePostPage">
      {editMode === false ? (
        <div className="singlePost">
          <div className="singleStory">
            <div className="containerEdit">
              <button
                style={{ display: displayEdit }}
                onClick={toggleModalDelete}
              >
                Delete
              </button>
              <button style={{ display: displayEdit }} onClick={toggleEditMode}>
                Edit
              </button>
            </div>
            <div className="containerImg">
              <img src={photo} alt="" />
            </div>
            <div className="title"> {title} </div>
            <p className="desc"> {desc} </p>
          </div>
          <div className="singlePostInfo">
            <div className="info Username"> {username} </div>
            <div className="info Time">{`Updated : ${updateDate} , Created : ${date}`}</div>
          </div>
        </div>
      ) : (
        <div className="singlePost">
          <div className="singleStory">
            <div className="containerEdit">
              <button style={{ display: displayEdit }} onClick={updatePost}>
                Update
              </button>
              <button style={{ display: displayEdit }} onClick={toggleEditMode}>
                Close
              </button>
            </div>
            <div className="containerImg">
              <img src={updatePhoto} alt="" />
              <div className="uploadImagePost">
                <label
                  htmlFor="fileInputPost"
                  style={{ backgroundColor: imageButton }}
                >
                  <i className="fas fa-file-image"></i>
                  <span>Image file</span>
                </label>
              </div>
              <input
                className="inputFilePost"
                type="file"
                id="fileInputPost"
                onChange={preViewImage}
              />
            </div>
            <input
              className="inputTitle"
              defaultValue={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
            <textarea
              className="textareaEdit"
              defaultValue={updateDesc}
              onChange={(e) => setUpdateDesc(e.target.value)}
            />
          </div>
          <div className="singlePostInfo">
            <div className="info Username"> {username} </div>
            <div className="info Time">{date}</div>
          </div>
        </div>
      )}

      <Sidebar />
      <Modal
        isOpen={isOpenDelete}
        onRequestClose={toggleModalDelete}
        contentLabel="My dialog"
        className="modal"
      >
        <div className="confirmDelete">
          <div style={{ fontSize: "20px" }}>Are you confirm ?</div>
          <div className="buttonConfirm">
            <button onClick={handleDelete}>Yes</button>
            <button onClick={toggleModalDelete}>No</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
