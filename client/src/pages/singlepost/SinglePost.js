import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./singlepost.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

export default function SinglePost() {
  const [postInfo, setpostInfo] = useState({});

  const [displayEdit, setDisplayEdit] = useState("none");
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");

  const { id } = useParams();
  const { title, desc, username, createdAt, photo } = postInfo;
  const date = new Date(createdAt).toDateString();

  useEffect(() => {
    const getSinglePost = async () => {
      try {
        const res = await axios.get(`/post/singlepost/${id}`);
        setpostInfo(res.data);
        const user = JSON.parse(localStorage.getItem("user"));
        setUpdateTitle(postInfo.title);
        setUpdateDesc(postInfo.desc);
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
  }, [id, postInfo.title, postInfo.desc]);

  const toggleModalDelete = () => {
    setIsOpenDelete(!isOpenDelete);
  };

  const toggleEditMode = () => {
    setUpdateTitle(title);
    setUpdateDesc(desc);
    setEditMode(!editMode);
  };

  const updatePost = async () => {
    await axios.put(`/post/edit/${id}`, {
      title: updateTitle,
      desc: updateDesc,
    });
    window.location.reload();
  };

  const handleDelete = async () => {
    try {
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
            <div className="info Time">{date}</div>
          </div>
        </div>
      ) : (
        <div className="singlePost">
          <div className="singleStory">
            <div className="containerEdit">
              <button style={{ display: displayEdit }} onClick={updatePost}>
                save
              </button>
              <button style={{ display: displayEdit }} onClick={toggleEditMode}>
                close
              </button>
            </div>
            <div className="containerImg">
              <img src={photo} alt="" />
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
